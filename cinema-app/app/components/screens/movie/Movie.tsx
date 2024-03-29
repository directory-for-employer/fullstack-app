import { FC } from 'react'
import { useMovie } from '@/components/screens/movie/hooks_Interface/useMovie'
import { Layout, Loader } from '@/components/ui'
import MovieHeader from '@/components/screens/movie/movie-element/MovieHeader'
import MovieBackgound from '@/components/screens/movie/movie-element/MovieBackgound'
import MovieContent from '@/components/screens/movie/movie-content/MovieContent'

const Movie: FC = () => {
	const { isLoading, movie } = useMovie()

	if (isLoading) return <Loader />
	if (!movie) return null

	return (
		<Layout style={{ paddingTop: 0 }}>
			<MovieBackgound movie={movie} />
			<MovieHeader movie={movie} />
			<MovieContent movie={movie} />
		</Layout>
	)
}

export default Movie
