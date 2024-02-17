import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, HttpCode, Put, ValidationPipe, Query } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  
  @Get('by-slug/:slug')
  async findBySlug(@Param('slug') slug: string){
    return this.genreService.findBySlug(slug)
  }

  @Get('/collections')
	async getCollections() {
		return this.genreService.getCollections()
	}

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string){
    return this.genreService.getAll(searchTerm)
  }

  @Get(':id')
	@Auth('admin')
	async getUser(@Param('id') id:number) {
		return this.genreService.findById(+id)
	}

  @UsePipes(new ValidationPipe())
	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create(@Param('id') id, @Body() dto: CreateGenreDto){
		return this.genreService.create()
	}

  @UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(@Param('id') id: number, @Body() dto: CreateGenreDto){
		return this.genreService.update(+id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id') id: number){
		return this.genreService.delete(+id)
	}
}
