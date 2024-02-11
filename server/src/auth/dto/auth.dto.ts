import {
	IsBoolean,
	IsEmail,
	IsNumber,
	IsString,
	MinLength,
} from 'class-validator'

export class AuthDto {
	@IsNumber()
	id?: number

	@IsEmail()
	email: string

	@MinLength(8, {
		message: 'Password can`t be less than 8 characters',
	})
	@IsString()
	password: string

	@IsString()
	name: string

	@IsBoolean()
	isAdmin: boolean
}
