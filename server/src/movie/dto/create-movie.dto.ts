import { IsBoolean, IsNumber, IsString } from 'class-validator'

export class CreateMovieDto {
	@IsString()
	poster: string

	@IsString()
	bigPoster: string

	@IsString()
	title: string

	@IsString()
	description: string

	@IsString()
	slug: string

	@IsNumber()
	duration: number

	@IsString()
	country: string

	@IsNumber()
	years: number

	@IsString()
	videoUrl: string

	@IsBoolean()
	isSendTelegram?: boolean

	@IsNumber()
	actorId?: number

	// @IsNumber()
	genreId?: number

	@IsNumber()
	rating?: number
}
