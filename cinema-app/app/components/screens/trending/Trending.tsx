import { FC } from 'react'
import { useTrending } from '@/components/screens/trending/useTrending'
import Layout from '@/components/ui/layout/Layout'
import MovieCatalog from '@/components/ui/movie/catalog/MovieCatalog'
import Loader from '@/components/ui/Loader'

const Trending: FC = () => {
	const { isLoading, movies } = useTrending()
	if (isLoading) return <Loader />
	return (
		<Layout isHasPadding>
			<MovieCatalog
				title='Trending'
				movies={movies}
				isBackButton={true}
				description='Trending movies in excellent quality: legal, safe, without ads'
			/>
		</Layout>
	)
}

export default Trending
