import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query
} from '@nestjs/common'
import { MovieService } from './movie.service'
import { CreateMovieDto } from './dto/create-movie.dto'
import { Auth } from 'src/auth/decorator/auth.decorator'

@Controller('movie')
export class MovieController {
	constructor(private readonly movieService: MovieService) {}

	@Get('by-slug/:slug')
	async findBySlug(@Param('slug') slug: string) {
		return this.movieService.findBySlug(slug)
	}

	@Get('by-actor/:actor')
	async findByActor(@Param('actor') actorId: number) {
		return this.movieService.findByActor(+actorId)
	}

	@Post('by-genre')
	@HttpCode(200)
	async findByGenre(@Body('genreId') genreId: number) {
		return this.movieService.findByGenre(genreId)
	}

	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.movieService.getAll(searchTerm)
	}

	@Get('most-popular')
	async GetMostPopular() {
		return this.movieService.GetMostPopular()
	}

	@Put('update-count-opened')
	@HttpCode(200)
	async updateCountOpened(@Body('slug') slug: string) {
		return this.movieService.updateCountOpened(slug)
	}

	@Get(':id')
	@Auth('admin')
	async getUser(@Param('id') id: number) {
		return this.movieService.findById(+id)
	}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create() {
		return this.movieService.create()
	}

	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(@Param('id') movieId: number, @Body() dto: CreateMovieDto) {
		return this.movieService.update(+movieId, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id') id: number) {
		return this.movieService.delete(+id)
	}
}
