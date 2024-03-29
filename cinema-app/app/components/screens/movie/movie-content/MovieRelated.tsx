import { FC } from 'react'
import { ListRenderItemInfo, Text, View } from 'react-native'
import { useRelatedMovies } from '@/components/screens/movie/movie-content/useRelatedMovies'
import { Loader, MovieItem } from '@/components/ui'
import HorizontalList from '@/components/ui/HorizontalList'
import { IMovie } from '@/shared/types/dataInterface/movie.interface'

interface IRelatedMovie {
	genreIds: number[]
	currentMovieId: number
}
const RelatedMovies: FC<IRelatedMovie> = ({ currentMovieId, genreIds }) => {
	const { data, isLoading } = useRelatedMovies(genreIds, currentMovieId)
	if (isLoading) return <Loader />
	if (!data?.length) return null

	return (
		<View className='my-8'>
			<Text className='text-white text-2xl font-semibold mb-5'>
				Related movies
			</Text>

			<HorizontalList
				data={data}
				// @ts-ignore
				renderItem={({ item: movie, index }: ListRenderItemInfo<IMovie>) => (
					<MovieItem
						index={index}
						movie={movie}
						key={movie.id}
						className='w-36 mr-4'
					/>
				)}
			/>
		</View>
	)
}

export default RelatedMovies
