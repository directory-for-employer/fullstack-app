import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserService } from 'src/user/user.service'
import { PrismaService } from 'src/prisma.service'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { UserModule } from 'src/user/user.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt/jwt.strategy'

@Module({
	imports: [
		UserModule,
		PassportModule,
		JwtModule.registerAsync({
			global: true,
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.get<string>('JWT_SECURE')
			}),
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		PrismaService,
		ConfigService,
		JwtService,
		JwtStrategy
	]
})
export class AuthModule {}
