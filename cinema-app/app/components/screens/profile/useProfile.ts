import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { IAuthFormData } from '@/shared/types/auth.interface'
import { useMutation, useQuery } from '@tanstack/react-query'
import { UserService } from '@/services/user.service'
import Toast from 'react-native-toast-message'

export const useProfile = (setValue: UseFormSetValue<IAuthFormData>) => {
	const { isLoading } = useQuery(['profile'], () => UserService.getProfile(), {
		onSuccess({ email }) {
			setValue('email', email)
		}
	})

	const { mutateAsync } = useMutation(
		['update_profile'],
		(data: IAuthFormData) => UserService.updateProfile(data),
		{
			onSuccess({ email }) {
				Toast.show({
					text1: 'Update Profile',
					text2: 'Update was successful',
					type: 'success'
				})
			}
		}
	)

	const onSubmit: SubmitHandler<IAuthFormData> = async (data) => {
		await mutateAsync(data)
	}
	return { onSubmit, isLoading }
}
