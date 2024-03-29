import React, { FC } from 'react'
import { Animated, Image, Pressable, Text, View } from 'react-native'
import { IMovie } from '@/shared/types/movie.interface'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { getMediaSourse } from '@/utils/getMediaSourse'
import { GenreList, Rating } from '@/components/ui'
import { useItemAnimation } from '@/components/screens/home/carousel/carousel-item/useItemAnimation'
import {
	ITEM_SIZE,
	SPACING
} from '@/components/screens/home/carousel/carousel.constants'
import FavoriteButton from '@/components/ui/movie/movie-item/favorite-button/FavoriteButton'

interface ICarouselItem {
	index: number
	scrollX: Animated.Value
	movie: IMovie
}

const CarouselItem: FC<ICarouselItem> = ({ movie, index, scrollX }) => {
	const { navigate } = useTypedNavigation()
	const { rotate, opacity, scale, opacityElement } = useItemAnimation(
		index,
		scrollX
	)

	return (
		<View
			style={{
				width: ITEM_SIZE
			}}
		>
			<Animated.View
				style={{
					padding: SPACING,
					transform: [{ rotate: rotate }, { scale }],
					opacity
				}}
				className='items-center'
			>
				<Pressable
					className='w-full relative'
					onPress={() => navigate('Movie', { slug: movie.slug })}
				>
					<Image
						style={{
							height: ITEM_SIZE * 1.3,
							resizeMode: 'cover',
							borderWidth: 1,
							borderColor: 'white'
						}}
						className='w-full rounded-xl mb-2.5'
						source={getMediaSourse(movie.poster)}
					/>

					<View className={'absolute z-1 right-2 top-2'}>
						<FavoriteButton movieId={movie.id} />
					</View>
				</Pressable>
				<Animated.View
					className='items-center'
					style={{
						opacity: opacityElement
					}}
				>
					<Rating rating={movie.rating} />
					<Pressable onPress={() => navigate('Movie', { slug: movie.slug })}>
						<Text
							className='text-white text-3xl font-semibold opacity-95 mb-2.5'
							numberOfLines={1}
						>
							{movie.title}
						</Text>
					</Pressable>
					<GenreList genres={movie.genre} />
				</Animated.View>
			</Animated.View>
		</View>
	)
}

export default CarouselItem
