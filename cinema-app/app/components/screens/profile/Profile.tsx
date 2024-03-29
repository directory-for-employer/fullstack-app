import { FC } from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { AuthService } from '@/services/auth/auth.service'
import { AntDesign } from '@expo/vector-icons'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/components/screens/profile/useProfile'
import { IAuthFormData } from '@/shared/types/auth.interface'
import { useForm } from 'react-hook-form'
import { Button, Heading, Layout, Loader } from '@/components/ui'
import AuthFields from '@/components/screens/auth/fields/AuthFields'
import { useScaleOnMount } from '@/hooks/useScaleOnMount'
import Animated from 'react-native-reanimated'

const Profile: FC = () => {
	const { setUser } = useAuth()
	const { handleSubmit, setValue, control } = useForm<IAuthFormData>({
		mode: 'onChange'
	})
	const { isLoading, onSubmit } = useProfile(setValue)
	const { styleAnimation } = useScaleOnMount()

	return (
		<Layout isHasPadding>
			<Heading title='Profile' className='pl-5' />
			<Animated.View
				style={styleAnimation}
				className='my-6 items-center justify-center'
			>
				<Image
					source={require('./avatar-guest.jpg')}
					className='w-40 h-40 rounded-2xl'
				/>
			</Animated.View>
			{isLoading ? (
				<Loader />
			) : (
				<View className='mb-5 px-5'>
					<AuthFields control={control} />
					<Button onPress={handleSubmit(onSubmit)} icon={'edit'}>
						Change Profile
					</Button>
				</View>
			)}
			{/*<Pressable onPress={() => deleteItemAsync(EnumSecureStore.ACCESS_TOKEN)}>
				<Text className='text-white'>Clear accessToken</Text>
			</Pressable>
			<Pressable onPress={() => deleteItemAsync(EnumSecureStore.REFRESH_TOKEN)}>
				<Text className='text-white'>Clear refreshToken</Text>
			</Pressable>
			<Pressable
				onPress={() =>
					getItemAsync(EnumSecureStore.ACCESS_TOKEN).then((data) =>
						console.log(data)
					)
				}
			>
				<Text className='text-white'>Show accessToken</Text>
			</Pressable>
			<Pressable
				onPress={() =>
					getItemAsync(EnumSecureStore.REFRESH_TOKEN).then((data) =>
						console.log(data)
					)
				}
			>
				<Text className='text-white'>Show refreshToken</Text>
			</Pressable>*/}
			<Pressable
				onPress={() => AuthService.logout().then(() => setUser(null))}
				className='opacity-40 items-center flex-row justify-end pr-5'
			>
				<AntDesign name={'logout'} size={18} color='white' />
				<Text className='text-white text-lg ml-2'>Logout</Text>
			</Pressable>
		</Layout>
	)
}

export default Profile
