import { request } from '@/services/api/request.api'
import { IUser } from '@/shared/types/user.interface'
import { getUserUrl } from '@/config/api.config'
import { IAuthFormData } from '@/shared/types/auth.interface'
import { IMovie } from '@/shared/types/dataInterface/movie.interface'

export const UserService = {
	async getAll(searchTerm?: string) {
		return request<IUser[]>({
			url: getUserUrl(''),
			method: 'GET',
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	},

	async getProfile() {
		return request<IUser>({
			url: getUserUrl('profile'),
			method: 'GET'
		})
	},

	async getFavorites() {
		return request<IMovie[]>({
			url: getUserUrl('profile/favorites'),
			method: 'GET'
		})
	},
	async toggleFavorite(movieId: number) {
		return request<IMovie[]>({
			url: getUserUrl('profile/favorites'),
			method: 'PUT',
			data: { movieId }
		})
	},

	async getById(id: number) {
		return request<IUser>({
			url: getUserUrl(`${id}`),
			method: 'GET'
		})
	},

	async update(id: number, data: IAuthFormData) {
		return request<string>({
			url: getUserUrl(`${id}`),
			method: 'PUT',
			data
		})
	},

	async updateProfile(data: IAuthFormData) {
		return request<IUser>({
			url: getUserUrl(`profiles`),
			method: 'PUT',
			data
		})
	},

	async deleteUser(id: number) {
		return request<string>({
			url: getUserUrl(`${id}`),
			method: 'DELETE'
		})
	}
}
