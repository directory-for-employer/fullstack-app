import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Pressable, Text, View } from 'react-native'

function Home() {
	const { navigate } = useTypedNavigation()
	return (
		<>
			<View className='mt-10'>
				<Text>Home</Text>
				<Pressable onPress={() => navigate('Auth')}>
					<Text style={{ color: 'white' }}>Go to login</Text>
				</Pressable>
			</View>
		</>
	)
}

export default Home
