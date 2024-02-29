import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prisma: PrismaService) {}


  async getAll(searchTerm?: string){
    if (searchTerm){
      const data = await this.prisma.movie.findMany({
        where: {
          OR: [
            {
              title: {contains: searchTerm}
            }
          ]
      },
      include:{
        actor: true,
        genre: true
      },
      orderBy: {
      createdAt: 'desc'
      }
      })
      return data
    } 
    else {
      const data = await this.prisma.movie.findMany({include:{actor: true, genre: true}})
      return data
    }
  }


  async findBySlug(slug: string) {
    const movie = await this.prisma.movie.findFirst(
      {
        where:{slug},
        include: {
          actor: true,
          genre: true
        }
      })
    if(!movie) throw new NotFoundException('Movie not found')
    return movie
  }

  async findByActor(actorId: number) {
    const movie = await this.prisma.movie.findMany(
      {
        include: {
          actor: {
            where: {
              actorId
            }
          }
        }
      })
    if(!movie) throw new NotFoundException('Movies not found')
    return movie
  }

  async findByGenre(genreId: number) {
    const movie = await this.prisma.movie.findMany(
      { 
       where: {
        genre: {
          some: {
            genreId
          }
        }
       }
      })
    if(!movie) throw new NotFoundException('Movies not found')
    return movie
  }

  async updateCountOpened(slug: string){
    // Telegram notification
    const result = await this.prisma.movie.update({
      where:{
        slug
      },
      data: {
        countOpened: {increment: 1}
      }
    })
    .catch(() => {throw new NotFoundException('movie Not Found')})
		return result
	} 


  async GetMostPopular() {
    const movie = await this.prisma.movie.findMany(
      { 
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
    if(!movie) throw new NotFoundException('Movies not found')
    return movie
  }

  // admin place
  async findById(id: number){
    const movie = await this.prisma.movie.findUnique({where: {id}})
    if (!movie) throw new NotFoundException('movie not found')
    
    return movie
  }

  async create(){ 
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
      isSendTelegram: false,
    }
    const movie = await this.prisma.movie.create({data: defaultValue})
    return movie.id
	}

  async update(movieId: number, data: CreateMovieDto){
    const {genreId, actorId} = data

    if(genreId){
      return await this.prisma.movie.update({
        where: {id: movieId},
        data: {
          genre: {
            connectOrCreate: {
              where: {movieId_genreId: {genreId, movieId}},
              create: {genreId}
            }
          }
        },
        include: {
          genre: true
        }
      }).catch(() => {throw new NotFoundException('Failed Update Genre')})
    }

    if(actorId){
      return await this.prisma.actor.update({
        where: {id: actorId},
        data: {
          movie:{
          createMany: {
            data: {movieId},
            skipDuplicates: true
          }
        }}
      }).catch(() => {throw new NotFoundException('Failed Update Actor')})
    }

    return await this.prisma.movie.update({
      where:{id: movieId},
      data,
      include: {
        actor: {
          include: {
            actor: true
          },
        },
        genre: {
          include: {
            genre:true
          }
        },
        user: {
          include: {
            user: true
          }
        }
      }
    }).catch(() => {throw new NotFoundException('Movie Not Found')})
	} 

  async delete(id:number){
    console.log(id)
    const result = await this.prisma.movie.delete({where:{id}})
    .catch(() => {throw new NotFoundException('movie Not Found')})
		return result
  }

}
