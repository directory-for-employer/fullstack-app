export interface IGenre {
	id: number
	name: string
	slug: string
	description: string
}

export interface IGenreEditInput extends Omit<IGenre, 'id'> {}

export interface IActor {
	id: number
	photo: string
	name: string
	slug: string
}

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
