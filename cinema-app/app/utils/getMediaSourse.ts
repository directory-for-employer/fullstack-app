import { SERVER_URL } from '@/config/api.config'

export const getMediaSourse = (path: string) => ({
	uri: SERVER_URL + path
})
