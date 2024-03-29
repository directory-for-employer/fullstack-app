import { FC, useRef } from 'react'
import { Animated, ScrollView, View } from 'react-native'
import { useScrollToTop } from '@react-navigation/native'
import MovieInfo from '@/components/screens/movie/movie-content/MovieInfo'
import { IMovieComponent } from '@/components/screens/movie/hooks_Interface/moviePage.interface'
import RelatedMovies from '@/components/screens/movie/movie-content/MovieRelated'
import MovieActorCarousel from '@/components/screens/movie/movie-content/MovieActorCarousel'
import { HEADER_HEIGHT } from '@/components/screens/movie/movie.constant'
import VideoPlayer from '@/components/screens/movie/VideoPlayer/VideoPlayer'

const MovieContent: FC<IMovieComponent> = ({ movie }) => {
	const ref = useRef<ScrollView>(null)
	const y = useRef(new Animated.Value(0)).current

	useScrollToTop(ref)
	return (
		<Animated.ScrollView
			ref={ref}
			showsVerticalScrollIndicator={false}
			scrollEventThrottle={16}
			onScroll={Animated.event(
				[
					{
						nativeEvent: { contentOffset: { y } }
					}
				],
				{
					useNativeDriver: true
				}
			)}
			contentContainerStyle={{
				paddingTop: HEADER_HEIGHT / 1.3
			}}
		>
			<MovieInfo movie={movie} />
			<View className='bg-[#090909] px-6 pt-1 pb-24'>
				<VideoPlayer video={movie.videoUrl} />
				<MovieActorCarousel actors={movie.actor} />
				<RelatedMovies
					currentMovieId={movie.id}
					genreIds={movie.genre.map(({ id }) => id)}
				/>
			</View>
		</Animated.ScrollView>
	)
}

export default MovieContent
