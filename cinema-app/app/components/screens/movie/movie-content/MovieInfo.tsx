import { FC, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import { GenreList, Rating } from '@/components/ui'
import { Entypo } from '@expo/vector-icons'
import { IMovieComponent } from '@/components/screens/movie/hooks_Interface/moviePage.interface'
import { HEADER_HEIGHT } from '@/components/screens/movie/movie.constant'

const MovieInfo: FC<IMovieComponent> = ({ movie }) => {
	const y = useRef(new Animated.Value(0)).current
	const opacity = y.interpolate({
		inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT / 2],
		outputRange: [1, 1, 0]
	})
	return (
		<Animated.View className='px-6 mb-3'>
			<Text
				className='text-5xl font-semibold text-[#F9FCFC] mb-2 pr-2'
				numberOfLines={2}
			>
				{movie.title}
			</Text>
			<View className='mb-4 flex-row items-center opacity-70'>
				<Rating rating={movie.rating} size={18} />
				<Entypo
					name='dot-single'
					size={18}
					color='rgba(255,255,255,.5)'
					style={{ marginLeft: 4 }}
				/>
				<Text style={styles.text}>{movie.duration}min</Text>
				<Entypo
					name='dot-single'
					size={18}
					color='rgba(255,255,255,.5)'
					style={{ marginLeft: 4 }}
				/>
				<Text style={styles.text}>{movie.years}</Text>
			</View>
			<GenreList genres={movie.genre} />
		</Animated.View>
	)
}
const styles = StyleSheet.create({
	text: {
		color: 'white',
		marginHorizontal: 4,
		fontSize: 18
	}
})

export default MovieInfo
