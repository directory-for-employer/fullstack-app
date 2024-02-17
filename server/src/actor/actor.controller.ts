import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpCode, Put } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorDto } from './dto/actor.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get('by-slug/:slug')
  async findBySlug(@Param('slug') slug: string){
    return this.actorService.findBySlug(slug)
  }


  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string){
    return this.actorService.getAll(searchTerm)
  }

  @Get(':id')
	@Auth('admin')
	async getUser(@Param('id') id:number) {
		return this.actorService.findById(+id)
	}

	@Post()
	@HttpCode(200)
	@Auth('admin')
	async create(@Param('id') id, @Body() dto: ActorDto){
		return this.actorService.create()
	}

	@Put(':id')
	@HttpCode(200)
	@Auth('admin')
	async update(@Param('id') id: number, @Body() dto: ActorDto){
		return this.actorService.update(+id, dto)
	}

	@Delete(':id')
	@HttpCode(200)
	@Auth('admin')
	async delete(@Param('id') id: number){
		return this.actorService.delete(+id)
	}

}
