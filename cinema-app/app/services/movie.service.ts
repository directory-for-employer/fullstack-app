import { request } from '@/services/api/request.api'
import { IMovie, IMovieEditInput } from '@/shared/types/movie.interface'
import { getMovieUrl } from '@/config/api.config'

export const MovieService = {
	async getAll(searchTerm?: string) {
		return request<IMovie[]>({
			url: getMovieUrl(''),
			method: 'GET',
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	},

	async getMostPopularMovies() {
		return request<IMovie[]>({
			url: getMovieUrl('most-popular'),
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return request<IMovie>({
			url: getMovieUrl(`by-slug/${slug}`),
			method: 'GET'
		})
	},

	async getByActor(actorId: number) {
		return request<IMovie>({
			url: getMovieUrl(`by-actor/${actorId}`),
			method: 'GET'
		})
	},

	async getByGenres(genreId: number[]) {
		return request<IMovie[]>({
			url: getMovieUrl(`by-genre`),
			method: 'POST'
		})
	},

	async getById(Id: number) {
		return request<IMovie[]>({
			url: getMovieUrl(`by-genre`),
			method: 'POST',
			data: { Id }
		})
	},

	async create() {
		return request<string>({
			url: getMovieUrl(``),
			method: 'POST'
		})
	},

	async update(id: number, data: IMovieEditInput) {
		return request<string>({
			url: getMovieUrl(`${id}`),
			method: 'PUT',
			data
		})
	},

	async deleteMovie(id: number) {
		return request<string>({
			url: getMovieUrl(`${id}`),
			method: 'DELETE'
		})
	},
	async updateCountOpened(slug: string) {
		return request<string>({
			url: getMovieUrl(`update-count-opened`),
			method: 'PUT',
			data: {
				slug
			}
		})
	}
}
