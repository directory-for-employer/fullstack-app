export interface IActor {
	id: number
	photo: string
	name: string
	slug: string
}

export interface IActorEditInput extends Omit<IActor, 'id'> {}
