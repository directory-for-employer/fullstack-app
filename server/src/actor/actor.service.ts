import { Injectable, NotFoundException } from '@nestjs/common'
import { ActorDto } from './dto/actor.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class ActorService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) {
			return this.prisma.actor.findMany({
				where: {
					OR: [
						{
							name: { contains: searchTerm }
						},
						{
							slug: { contains: searchTerm }
						}
					]
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
		} else {
			return this.prisma.actor.findMany()
		}
	}

	// admin place

	async findById(id: number) {
		const actor = await this.prisma.actor.findUnique({ where: { id } })
		if (!actor) throw new NotFoundException('actor not found')
		return actor
	}

	async findBySlug(slug: string) {
		const actor = await this.prisma.actor.findFirst({ where: { slug } })
		if (!actor) throw new NotFoundException('Actor not found')
		return actor
	}

	async create() {
		const defaultValue: ActorDto = {
			name: '',
			slug: '',
			photo: ''
		}
		const actor = await this.prisma.actor.create({ data: defaultValue })
		return actor.id
	}

	async update(id: number, data: ActorDto) {
		return this.prisma.actor
			.update({
				where: { id },
				data
			})
			.catch(() => {
				throw new NotFoundException('actor Not Found')
			})
	}

	async delete(id: number) {
		return this.prisma.actor.delete({ where: { id } }).catch(() => {
			throw new NotFoundException('actor Not Found')
		})
	}
}
