import { Controller, Get, Post, Body, Delete, Param, UsePipes, ValidationPipe, HttpCode, Put, Query } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'
import { User } from './decorator/user.decorator'
import { User as UserModel } from '@prisma/client'
import { UpdateUserDto } from './dto/update-user.dto'
import { idValidationPipe } from 'src/pipes/id.validation.pipe'
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
	async findOne(@Body() data: UserDto) {
		return this.userService.findOne(data)
	}

	@Auth()
	@Get('profile')
	async getProfile(@User('id') id) {
		return this.userService.findById(id)
	}

	@UsePipes(new ValidationPipe())
	@Post('profiles')
	@HttpCode(200)
	@Auth()
	async updateProfile(@Body() dto: UpdateUserDto, @User('id') id){
		return this.userService.updateProfile(id, dto)
	}


	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async updateUser(@Param('id', idValidationPipe) id, @Body() dto: UpdateUserDto){
		return this.userService.updateProfile(id, dto)
	}

	@Get('count')
	@Auth('admin')
	async getCountUser() {
		return this.userService.getCount()
	}

	@Get(':id')
	@Auth('admin')
	async getUser(@Param('id') id:number) {
		return this.userService.findById(+id)
	}

	@Get()
	@Auth('admin')
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.userService.getAll(searchTerm)
	}


	@Put('profile/favorite')
	async toggleFavorite(@Body('movieId') movieId: number, @Body('userId') userId: number){
		return this.userService.toggleFavorite(movieId, userId)
	}

	@Get('profile/getfavorite/:id')
	async getFavorite(@Param('id') id: number){
		return this.userService.getFavorite(+id)
	}
}
