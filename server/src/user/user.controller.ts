import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'
import { User } from './decorator/user.decorator'
import { User as UserModel } from '@prisma/client'
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async create(@Body() UserDto: UserDto) {
		return this.userService.create(UserDto)
	}

	@Delete(':id')
	async deleteUser(@Param('id') id: number) {
		return this.userService.deleteUser(+id)
	}

	@Get('/find')
	async findOne(@Body() data) {
		return this.userService.findOne(data)
	}

	@Auth()
	@Get('profile')
	getProfile(@User('id') id) {
		return this.userService.findById(id)
	}
}
