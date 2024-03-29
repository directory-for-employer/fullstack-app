import React, { FC } from 'react'
import { useGenre } from '@/components/screens/genre/useGenre'
import NotFound from '@/components/ui/NotFound'
import Layout from '@/components/ui/layout/Layout'
import MovieCatalog from '@/components/ui/movie/catalog/MovieCatalog'
import { Loader } from '@/components/ui'

const Genre: FC = () => {
	const { isLoading, genre, movies } = useGenre()
	if (isLoading) return <Loader />
	return (
		<Layout isHasPadding>
			{genre ? (
				<MovieCatalog
					movies={movies}
					title={genre.name}
					description={genre.description}
					isBackButton
				/>
			) : (
				<NotFound />
			)}
		</Layout>
	)
}

export default Genre
