import { request } from '@/services/api/request.api'
import { EnumAsyncStorage, IAuthResponse } from '@/shared/types/auth.interface'
import { getAuthUrl } from '@/config/api.config'
import {
	deleteTokensStorage,
	saveTokensStorage
} from '@/services/auth/auth.helper'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthService = {
	async main(variant: 'reg' | 'login', email: string, password: string) {
		const response = await request<IAuthResponse>({
			url: getAuthUrl(`${variant === 'reg' ? 'reg' : 'login'}`),
			method: 'POST',
			data: { email, password }
		})

		if (response.accessToken) await saveTokensStorage(response)
		return response
	},
	async logout() {
		await deleteTokensStorage()
		await AsyncStorage.removeItem(EnumAsyncStorage.USER)
	}
}
