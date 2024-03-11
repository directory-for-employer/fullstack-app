import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateMovieDto } from './dto/create-movie.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class MovieService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) {
			return this.prisma.movie.findMany({
				where: {
					OR: [
						{
							title: { contains: searchTerm }
						}
					]
				},
				include: {
					actor: true,
					genre: true
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
		} else {
			return this.prisma.movie.findMany({
				include: { actor: true, genre: true }
			})
		}
	}

	async findBySlug(slug: string) {
		const movie = await this.prisma.movie.findFirst({
			where: { slug },
			include: {
				actor: {
					select: {
						actor: true
					}
				},
				genre: {
					select: {
						genre: true
					}
				}
			}
		})
		if (!movie) throw new NotFoundException('Movie not found')
		return movie
	}

	async findByActor(actorId: number) {
		const movie = await this.prisma.actorOnMovie.findMany({
			where: {
				actorId
			},
			select: {
				movie: true
			}
		})
		if (!movie) throw new NotFoundException('Movies not found')
		return movie
	}

	async findByGenre(genreId: number) {
		const movie = await this.prisma.genreOnMovie.findMany({
			where: {
				genreId
			},
			select: {
				genre: true,
				movie: true
			}
		})
		if (!movie) throw new NotFoundException('Movies not found')
		return movie
	}

	async updateCountOpened(slug: string) {
		// Telegram notification
		return this.prisma.movie
			.update({
				where: {
					slug
				},
				data: {
					countOpened: { increment: 1 }
				}
			})
			.catch(() => {
				throw new NotFoundException('movie Not Found')
			})
	}

	async GetMostPopular() {
		const movie = await this.prisma.movie.findMany({
			where: {
				countOpened: {
					gt: 0
				}
			},
			include: {
				genre: true
			},
			orderBy: {
				countOpened: 'desc'
			}
		})
		if (!movie) throw new NotFoundException('Movies not found')
		return movie
	}

	// admin place
	async findById(id: number) {
		const movie = await this.prisma.movie.findUnique({
			where: { id },
			include: {
				genre: {
					select: {
						genre: true
					}
				},
				actor: {
					select: {
						actor: true
					}
				}
			}
		})
		if (!movie) throw new NotFoundException('movie not found')

		return movie
	}

	async create() {
		const defaultValue: CreateMovieDto = {
			bigPoster: '',
			description: '',
			poster: '',
			title: '',
			videoUrl: '',
			slug: '',
			years: 0,
			country: '',
			duration: 0,
			isSendTelegram: false
		}
		const movie = await this.prisma.movie.create({ data: defaultValue })
		return movie.id
	}

	async update(movieId: number, data: CreateMovieDto) {
		const { genreId, actorId } = data

		if (genreId) {
			return this.prisma.movie
				.update({
					where: { id: movieId },
					data: {
						genre: {
							connectOrCreate: {
								where: { movieId_genreId: { genreId, movieId } },
								create: { genreId }
							}
						}
					},
					include: {
						genre: true
					}
				})
				.catch(() => {
					throw new NotFoundException('Failed Update Genre')
				})
		}

		if (actorId) {
			return this.prisma.actor
				.update({
					where: { id: actorId },
					data: {
						movie: {
							createMany: {
								data: { movieId },
								skipDuplicates: true
							}
						}
					}
				})
				.catch(() => {
					throw new NotFoundException('Failed Update Actor')
				})
		}

		return this.prisma.movie
			.update({
				where: { id: movieId },
				data,
				include: {
					actor: {
						select: {
							actor: true
						}
					},
					genre: {
						select: {
							genre: true
						}
					},
					user: {
						select: {
							user: true
						}
					}
				}
			})
			.catch(() => {
				throw new NotFoundException('Movie Not Found')
			})
	}

	async delete(id: number) {
		return this.prisma.movie.delete({ where: { id } }).catch(() => {
			throw new NotFoundException('movie Not Found')
		})
	}
}
