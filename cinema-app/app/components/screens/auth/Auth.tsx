import { Button, DismissKeyboard, Loader } from '@/components/ui'
import { IAuthFormData } from '@/shared/types/auth.interface'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Pressable, Text, View } from 'react-native'
import AuthFields from '@/components/screens/auth/fields/AuthFields'
import { useAuthMutation } from '@/components/screens/auth/useAuthMutation'

function Auth() {
	const [isReg, setIsReg] = useState(false)

	const { handleSubmit, reset, control } = useForm<IAuthFormData>({
		mode: 'onChange'
	})

	const { isLoading, registerSync, loginSync } = useAuthMutation(reset)
	const onSubmit: SubmitHandler<IAuthFormData> = (data) => {
		if (isReg) registerSync(data)
		else loginSync(data)
	}

	return (
		<DismissKeyboard>
			<View className='mx-2 item-center justify-center h-full'>
				<View>
					<Text className='text-center text-white text-4xl font-bold mb-2.5'>
						{isReg ? 'Register' : 'Login'}
					</Text>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<AuthFields control={control} isPassRequired className='px-5' />
							<Button onPress={handleSubmit(onSubmit)} icon={'film'}>
								Go to watch
							</Button>
							<Pressable onPress={() => setIsReg(!isReg)}>
								<Text className='text-white opacity-30 text-right text-base mt-5 mr-8'>
									{isReg ? 'Login' : 'Register'}
								</Text>
							</Pressable>
						</>
					)}
				</View>
			</View>
		</DismissKeyboard>
	)
}

export default Auth
