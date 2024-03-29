import { IGenre, IGenreEditInput } from '@/shared/types/movie.interface'
import { request } from '@/services/api/request.api'
import { getGenreUrl } from '@/config/api.config'

export const GenreService = {
	async getAll(searchTerm?: string) {
		return request<IGenre[]>({
			url: getGenreUrl(''),
			method: 'GET',
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	},

	async getBySlug(slug: string) {
		return request<IGenre>({
			url: getGenreUrl(`by-slug/${slug}`),
			method: 'GET'
		})
	},

	async getById(id: number) {
		return request<IGenreEditInput>({
			url: getGenreUrl(`${id}`),
			method: 'GET'
		})
	},

	async create() {
		return request<string>({
			url: getGenreUrl(''),
			method: 'POST'
		})
	},

	async update(id: number, data: IGenreEditInput) {
		return request<string>({
			url: getGenreUrl(`${id}`),
			method: 'PUT',
			data
		})
	},

	async delete(id: number) {
		return request<string>({
			url: getGenreUrl(`${id}`),
			method: 'DELETE'
		})
	}
}
