import { request } from '@/services/api/request.api'
import { getActorUrl } from '@/config/api.config'
import {
	IActor,
	IActorEditInput
} from '@/shared/types/dataInterface/actor.interface'

export const ActorService = {
	async getAll(searchTerm?: string) {
		return request<IActor[]>({
			url: getActorUrl(''),
			method: 'GET',
			params: searchTerm
				? {
						searchTerm
					}
				: {}
		})
	},

	async getBySlug(slug: string) {
		return request<IActor>({
			url: getActorUrl(`by-slug/${slug}`),
			method: 'GET'
		})
	},

	async getById(id: number) {
		return request<IActorEditInput>({
			url: getActorUrl(`${id}`),
			method: 'GET'
		})
	},

	async create() {
		return request<string>({
			url: getActorUrl(''),
			method: 'POST'
		})
	},

	async update(id: number, data: IActorEditInput) {
		return request<string>({
			url: getActorUrl(`${id}`),
			method: 'PUT',
			data
		})
	},

	async delete(id: number) {
		return request<string>({
			url: getActorUrl(`${id}`),
			method: 'DELETE'
		})
	}
}
