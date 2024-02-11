import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaService } from 'src/prisma.service'
import { PrismaClient, User } from '@prisma/client'
import { AuthDto } from '../dto/auth.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly prisma: PrismaService,
		private readonly configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECURE'),
		})
	}

	async validate({ id }: Pick<User, 'id'>) {
		return await this.prisma.user.findUnique({
			where: { id },
		})
	}
}
