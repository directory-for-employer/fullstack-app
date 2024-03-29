import React, { FC } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { IMovieCatalog } from '@/components/ui/movie/catalog/movie-catalog.interface'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { Ionicons } from '@expo/vector-icons'
import Description from '@/components/ui/heading/Description'
import Heading from '@/components/ui/heading/Heading'
import MovieItem from '@/components/ui/movie/movie-item/MovieItem'

const MovieCatalog: FC<IMovieCatalog> = ({
	description,
	isBackButton,
	movies = [],
	title
}) => {
	const { goBack } = useTypedNavigation()
	return (
		<View>
			<View className='flex-row items-start justify-between'>
				<Heading title={title} />
				{isBackButton && (
					<Pressable onPress={goBack}>
						<Ionicons
							name='arrow-back-circle-outline'
							size={32}
							color='white'
						/>
					</Pressable>
				)}
			</View>
			{description && <Description text={description} />}
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className='flex-row flex-wrap justify-between mt-5 mb-32'>
					{movies?.length ? (
						movies.map((movie, index) => (
							<View className='mb-6' key={movie.id}>
								<MovieItem index={index} movie={movie} className='w-40' />
							</View>
						))
					) : (
						<Text className='text-white text-lg'>Element not found</Text>
					)}
				</View>
			</ScrollView>
		</View>
	)
}

export default MovieCatalog
