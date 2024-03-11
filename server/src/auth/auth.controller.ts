import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('login')
	async login(@Body() data: AuthDto) {
		return this.authService.login(data)
	}

	@HttpCode(200)
	@Post('reg')
	async reg(@Body() data: AuthDto) {
		return this.authService.reg(data)
	}

	@HttpCode(200)
	@Post('val')
	async validateUser(@Body() data: AuthDto) {
		return this.authService.validateUser(data)
	}
}
