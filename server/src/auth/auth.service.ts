import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import { User } from '@prisma/client'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	async issueTokenPair(userId: number) {
		const data = { id: userId }

		const refreshToken = await this.jwtService.signAsync(data, {
			secret: this.configService.get<string>('JWT_SECURE'),
			expiresIn: '15d'
		})

		const accessToken = await this.jwtService.signAsync(data, {
			secret: this.configService.get<string>('JWT_SECURE'),
			expiresIn: '1h'
		})

		return { refreshToken, accessToken }
	}

	async login(data: AuthDto) {
		const user = await this.userService.findOne(data)
		if (user === null)
			throw new NotFoundException('User not found. Please register')

		const isValidPassword = await bcrypt.compare(data.password, user.password)
		if (!isValidPassword)
			throw new UnauthorizedException('The password is not valid')

		const tokens = await this.issueTokenPair(user.id)
		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async reg(data: AuthDto) {
		const user = await this.userService.findOne(data)
		if (user) {
			throw new BadRequestException('User is already in th system')
		}

		const saltRounds = 10
		const saltPass = await bcrypt.hash(data.password, saltRounds)
		const compareData = {
			email: data.email,
			password: saltPass,
			name: data.name,
			isAdmin: data.isAdmin
		}

		const CreateUser = await this.userService.create(compareData)
		const tokens = await this.issueTokenPair(user.id)

		return { user: this.returnUserFields(CreateUser), ...tokens }
	}

	async getNewTokens({ refreshToken }: RefreshTokenDto) {
		if (!refreshToken) throw new UnauthorizedException('Please sign in!')

		const result = await this.jwtService.verifyAsync(refreshToken, {
			secret: this.configService.get<string>('JWT_SECURE')
		})

		if (!result) throw new UnauthorizedException('Invalid token or expired!')

		const user = await this.userService.findById(+result._id)
		const tokens = await this.issueTokenPair(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	async validateUser(data: AuthDto) {
		const user = await this.userService.findOne(data)
		if (!user) throw new UnauthorizedException('User not found')

		const isValidPassword = await bcrypt.compare(data.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Invalid password')
		return user
	}

	returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			isAdmin: user.isAdmin
		}
	}
}
