import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { UserDto } from './dto/user.dto'
import { PrismaService } from 'src/prisma.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { genSalt, hash } from 'bcrypt'
import { User as UserModel } from '@prisma/client'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async create(data: UserDto) {
		if (!data) throw new BadRequestException('Invalid Data')

		return this.prisma.user.create({
			data
		})
	}

	async deleteUser(id: number) {
		if (!id) throw new BadRequestException('Invalid Data')

		return this.prisma.user.delete({ where: { id } })
	}

	async findOne(data: UserDto) {
		if (!data) throw new BadRequestException('Invalid Data')

		return this.prisma.user.findUnique({
			where: {
				email: data.email
			}
		})
	}

	async findById(id: number) {
		if (!id) throw new BadRequestException('Invalid Data')

		const result = await this.prisma.user.findFirst({
			where: {
				id
			}
		})
		if (!result) throw new NotFoundException('User not found')
		return result
	}

	async updateProfile(id: number, dto: UpdateUserDto) {
		const user = await this.findById(id)
		const isSameUser = await this.findOne({
			email: user.email,
			password: user.password
		})

		if (isSameUser && id !== isSameUser.id)
			throw new NotFoundException('Email busy')

		if (dto.password) {
			const salt = await genSalt(10)
			user.password = await hash(dto.password, salt)
		}

		user.email = dto.email
		if (dto.isAdmin || dto.isAdmin === false) {
			user.isAdmin = dto.isAdmin
		}

		return this.prisma.user.update({
			where: { id: id },
			data: {
				email: user.email,
				password: user.password,
				isAdmin: user.isAdmin
			}
		})
	}

	async getCount() {
		return this.prisma.user.count()
	}

	async getAll(searchTerm?: string) {
		if (searchTerm) {
			return this.prisma.user.findMany({
				where: {
					OR: [
						{
							email: { contains: searchTerm }
						}
					]
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
		} else {
			return this.prisma.user.findMany()
		}
	}

	async toggleFavorite(movieId: number, user: UserModel) {
		const { id } = user
		const checkMovieId = await this.prisma.userOnMovie.findFirst({
			where: {
				userId: id,
				movieId
			},
			include: {
				movie: true
			}
		})
		if (checkMovieId === null) {
			return this.prisma.userOnMovie.create({
				data: {
					userId: user.id,
					movieId
				},
				include: {
					movie: true
				}
			})
		} else {
			return this.prisma.userOnMovie.delete({
				where: {
					movieId_userId: { movieId, userId: id }
				}
			})
		}
	}

	async getFavorite(id: number) {
		return this.prisma.userOnMovie
			.findMany({
				where: {
					userId: id
				},
				include: {
					movie: true
				}
			})
			.then((data) => data.map((data) => data.movie))
	}
}
