import { UseFormReset } from 'react-hook-form'
import { IAuthFormData } from '@/shared/types/auth.interface'
import { useAuth } from '@/hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/services/auth/auth.service'
import { useMemo } from 'react'

export const useAuthMutation = (reset: UseFormReset<IAuthFormData>) => {
	const { setUser } = useAuth()
	const { mutate: loginSync, isLoading: isLoginLoading } = useMutation(
		['login'],
		({ email, password }: IAuthFormData) =>
			AuthService.main('login', email, password),
		{
			onSuccess(data) {
				console.log('success')
				reset()
				setUser(data.user)
			}
		}
	)

	const { mutate: registerSync, isLoading: isRegisterLoading } = useMutation(
		['reg'],
		({ email, password }: IAuthFormData) =>
			AuthService.main('reg', email, password),
		{
			onSuccess(data) {
				reset()
				setUser(data.user)
			}
		}
	)

	return useMemo(
		() => ({
			loginSync,
			registerSync,
			isLoading: isLoginLoading || isRegisterLoading
		}),
		[isLoginLoading, isRegisterLoading]
	)
}
