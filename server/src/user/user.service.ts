import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { PrismaService } from 'src/prisma.service'
import { User as UserModel } from '@prisma/client'
import { UpdateUserDto } from './dto/update-user.dto'
import { genSalt, hash } from 'bcrypt'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: UserDto) {
		if (!data) throw new BadRequestException('Invalid Data')

		const result = await this.prisma.user.create({
			data,
		})
		return result
	}

	async deleteUser(id: number) {
		if (!id) throw new BadRequestException('Invalid Data')

		const result = await this.prisma.user.delete({ where: { id } })

		return result
	}

	async findOne(data: UserDto) {
		if (!data) throw new BadRequestException('Invalid Data')

		const result = await this.prisma.user.findUnique({
			where: {
				email: data.email,
			},
		})

		return result
	}

	async findById(id: number) {
		if (!id) throw new BadRequestException('Invalid Data')

		const result = await this.prisma.user.findUnique({
			where: {
				id,
			},
		})
		if (!result) throw new NotFoundException('User not found')
		return result
	}

	async updateProfile(id: number, dto:UpdateUserDto){
		const user = await this.findById(id)
		const isSameUser = await this.findOne({email: dto.email, password: dto.password})
		if(isSameUser && id !== isSameUser.id) throw new NotFoundException('Email busy')

		if(dto.password){
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		if(dto.isAdmin || dto.isAdmin === false){
			user.isAdmin = dto.isAdmin
		}

		const data = await this.prisma.user.update({
			where: {id: id},
			data: {
				email: user.email,
				password: user.password,
				isAdmin: user.isAdmin
			}, 
		})
		return data
	}

	async getCount() {
		return this.prisma.user.count()
	}
	async getAll() {
		return null
	}

}
