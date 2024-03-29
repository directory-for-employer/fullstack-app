import { FC, useRef } from 'react'
import { Animated, Image, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { getMediaSourse } from '@/utils/getMediaSourse'
import { LinearGradient } from 'expo-linear-gradient'
import { IMovieComponent } from '@/components/screens/movie/hooks_Interface/moviePage.interface'
import {
	HEADER_HEIGHT,
	inputRange
} from '@/components/screens/movie/movie.constant'

const MovieBackground: FC<IMovieComponent> = ({ movie }) => {
	const { top } = useSafeAreaInsets()
	const y = useRef(new Animated.Value(0)).current

	const scale = y.interpolate({
		inputRange,
		outputRange: [2, 1, 1],
		extrapolate: 'clamp'
	})

	const translateY = y.interpolate({
		inputRange,
		outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.01]
	})

	return (
		<Animated.View
			style={[
				{
					...StyleSheet.absoluteFillObject,
					height: HEADER_HEIGHT * 1.76,
					marginTop: -top,
					transform: [{ scale }, { translateY }]
				}
			]}
		>
			<Image
				style={{ ...StyleSheet.absoluteFillObject, top: -HEADER_HEIGHT * 1.6 }}
				resizeMode='cover'
				source={getMediaSourse(movie.poster)}
			/>
			<LinearGradient
				style={StyleSheet.absoluteFill}
				start={[0, 0.3]}
				end={[0, 0.8]}
				colors={['transparent', 'rgba(0,0,0,0.2)', '#090909']}
			/>
		</Animated.View>
	)
}

export default MovieBackground
