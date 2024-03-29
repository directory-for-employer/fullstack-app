import { FC, useRef } from 'react'
import { Animated, Platform, View } from 'react-native'
import { IMovie } from '@/shared/types/dataInterface/movie.interface'
import CarouselItem from '@/components/screens/home/carousel/carousel-item/CarouselItem'
import {
	EMPTY_ITEM_SIZE,
	ITEM_SIZE
} from '@/components/screens/home/carousel/carousel.constants'

const Carousel: FC<{ movies: IMovie[] }> = ({ movies }) => {
	const scrollX = useRef(new Animated.Value(0)).current
	return (
		<View>
			<Animated.FlatList
				data={[{ id: 0 } as IMovie, ...movies, { id: 999999999 } as IMovie]}
				keyExtractor={(item) => `key ${item.id}`}
				showsHorizontalScrollIndicator={false}
				horizontal
				bounces={false}
				renderToHardwareTextureAndroid
				contentContainerStyle={{
					alignItems: 'center'
				}}
				scrollEventThrottle={16}
				snapToInterval={ITEM_SIZE}
				snapToAlignment='start'
				decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: true }
				)}
				renderItem={({ item: movie, index }) =>
					movie?.slug ? (
						<CarouselItem movie={movie} index={index} scrollX={scrollX} />
					) : (
						<View
							style={{
								width: EMPTY_ITEM_SIZE
							}}
						/>
					)
				}
			/>
		</View>
	)
}
export default Carousel
