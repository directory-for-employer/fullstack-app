export interface IGenre {
	id: number
	name: string
	slug: string
	description: string
}

export interface IGenreEditInput extends Omit<IGenre, 'id'> {}
