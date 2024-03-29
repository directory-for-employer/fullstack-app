import { FC, useRef } from 'react'
import { Animated, Platform, StyleSheet, Text, View } from 'react-native'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BlurButton, Rating } from '@/components/ui'
import FavoriteButton from '@/components/ui/movie/movie-item/favorite-button/FavoriteButton'
import { IMovieComponent } from '@/components/screens/movie/hooks_Interface/moviePage.interface'
import { inputRange } from '@/components/screens/movie/movie.constant'

const MovieHeader: FC<IMovieComponent> = ({ movie }) => {
	const { goBack } = useTypedNavigation()
	const y = useRef(new Animated.Value(0)).current
	const { top } = useSafeAreaInsets()

	return (
		<View
			className='w-full z-1 flex-row justify-between items-center px-6 pb-4'
			style={{
				marginTop: -top,
				paddingTop: Platform.OS === 'ios' ? top + 6 : top + 35
			}}
		>
			<Animated.View
				style={{
					...StyleSheet.absoluteFillObject,
					opacity: y.interpolate({
						inputRange,
						outputRange: [0, 0, 1.8]
					})
				}}
				className='bg-[#0D0404]'
			/>
			<BlurButton icon={'chevron-left'} iconSize={23} onPress={goBack} />
			<Animated.View className='items-center w-2/3'>
				<Text
					className='text-white font-semibold text-2xl mb-0.5 px-2'
					numberOfLines={1}
				>
					{movie.title}
				</Text>
				<Rating rating={movie.rating} size={14} />
			</Animated.View>
			<FavoriteButton movieId={movie.id} />
		</View>
	)
}

export default MovieHeader
