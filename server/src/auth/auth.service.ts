import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { AuthDto } from './dto/auth.dto'
import { UserService } from 'src/user/user.service'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) {}

	async login(data: AuthDto) {
		const user = await this.userService.findOne(data)
		const isValidPassword = await bcrypt.compare(data.password, user.password)
		if (!isValidPassword) {
			throw new UnauthorizedException()
		}
		const { password, ...result } = user
		const payload = { id: user.id }
		return {
			access_token: await this.jwtService.signAsync(payload, {
				secret: this.configService.get<string>('JWT_SECURE'),
			}),
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
			isAdmin: data.isAdmin,
		}
		const newUser = await this.userService.create(compareData)
		return newUser
	}

	async validateUser(data: AuthDto) {
		const user = await this.userService.findOne(data)
		if (!user) throw new UnauthorizedException('User not found')

		const isValidPassword = await bcrypt.compare(data.password, user.password)
		if (user && isValidPassword) {
			const { password, ...result } = user
			return result
		}
		return null
	}
}
