import { IActor } from '@/shared/types/dataInterface/actor.interface'
import { IGenre } from '@/shared/types/dataInterface/genre.interface'

export interface IMovie {
	id: number
	poster: string
	title: string
	years: number
	duration: number
	country: string
	genre: IGenre[]
	actor: IActor[]
	countOpened: number
	videoUrl: string
	rating: number
	slug: string
}

export interface IMovieEditInput extends Omit<IMovie, 'id'> {}
