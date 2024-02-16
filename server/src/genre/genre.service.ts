import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService){}
  
  async getAll(searchTerm?: string){
    console.log(searchTerm)
    if (searchTerm){
      const data = await this.prisma.genre.findMany({
        where: {
          OR: [
            {
              name: {contains: searchTerm}
            },
            {
              slug: {contains:searchTerm}
            },
            {
              description: {contains:searchTerm}
            },
          ]
      },
    orderBy: {
      createdAt: 'desc'
    }})
    return data
    } else {
      const data = await this.prisma.genre.findMany()
      return data
    }
    
  }

  async getCollections() {
    const genres = await this.getAll()
    const collections = genres
    //TODO Create function
    return collections
  }

// admin place

  async findById(id: number){
    const genre = await this.prisma.genre.findUnique({where: {id}})
    if (!genre) throw new NotFoundException('Genre not found')
    
    return genre
  }

  async findBySlug(slug: string) {
    return this.prisma.genre.findFirst({where:{slug}})
  }

  async create(){
		const defaultValue: CreateGenreDto = {
      name: "",
      slug: "",
      description: "",
      icon: ""
    }
    const genre = await this.prisma.genre.create({data: defaultValue})
    return genre.id
	}

  async update(id: number, data:CreateGenreDto){
    const result = await this.prisma.genre.update({
      where:{id},
      data
    })
    .catch(() => {throw new NotFoundException('Genre Not Found')})
		return result
	} 

  async delete(id:number){
    const result = await this.prisma.genre.delete({where:{id}})
    .catch(() => {throw new NotFoundException('Genre Not Found')})
		return result
  }

}
