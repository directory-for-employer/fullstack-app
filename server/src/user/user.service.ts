import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { PrismaService } from 'src/prisma.service'
import { User as UserModel } from '@prisma/client'

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
}
