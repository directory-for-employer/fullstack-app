import { FC } from 'react'
import { IGenre } from '@/shared/types/dataInterface/movie.interface'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Pressable, Text, View } from 'react-native'

const GenreList: FC<{ genres: IGenre[] }> = ({ genres }) => {
	const { navigate } = useTypedNavigation()
	return (
		<View className='flex-row gap-3'>
			{genres?.map((genre) => (
				<Pressable
					onPress={() =>
						navigate('Genre', {
							slug: genre['genre'].slug
						})
					}
					key={genre['genre'].id}
					className='rounded-2xl bg-gray-700 py-1.5 px-3'
				>
					<Text className='text-white'>{genre['genre'].name}</Text>
				</Pressable>
			))}
		</View>
	)
}

export default GenreList
