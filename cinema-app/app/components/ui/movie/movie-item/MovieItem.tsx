import React, { FC } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { IMovie } from '@/shared/types/dataInterface/movie.interface'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { useMovieItemAnimation } from '@/components/ui/movie/movie-item/useMovieAnimation'
import cn from 'clsx'
import { getMediaSourse } from '@/utils/getMediaSourse'
import { BlurView } from 'expo-blur'
import Rating from '@/components/ui/movie/movie-item/Rating'
import Animated from 'react-native-reanimated'

const ReanimatedPressable = Animated.createAnimatedComponent(Pressable)

interface IMovieItem {
	index: number
	className?: string
	movie: IMovie
}

const MovieItem: FC<IMovieItem> = ({ className, index, movie }) => {
	const { navigate } = useTypedNavigation()
	const { name } = useTypedRoute()

	const isFavoritePage = name === 'Favorites'
	const { styledAnimation } = useMovieItemAnimation(index)
	return (
		<ReanimatedPressable
			style={styledAnimation}
			onPress={() => {
				navigate('Movie', {
					slug: movie.slug
				})
			}}
			className={cn('rounded-xl overflow-hidden h-56 w-40', className)}
		>
			<Image
				style={{
					resizeMode: 'cover',
					...StyleSheet.absoluteFillObject
				}}
				source={getMediaSourse(movie.poster)}
			/>

			<View className='absolute z-1 right-1.5 top-1.5'>
				{/*<FavoriteButton movieId={movie.id} isSmall={true} />*/}
			</View>

			<BlurView
				intensity={25}
				className={cn(
					'absolute w-full bottom-0 left-0 right-0 items-center pt-0.5 px-2'
				)}
			>
				<View className='-ml-2 -mb-0.5'>
					<Rating rating={movie.rating} size={16} />
				</View>

				<Text
					className='text-white text-lg font-semibold mb-1'
					numberOfLines={1}
				>
					{movie.title}
				</Text>
			</BlurView>
		</ReanimatedPressable>
	)
}

export default MovieItem
