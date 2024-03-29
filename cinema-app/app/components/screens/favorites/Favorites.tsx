import { FC } from 'react'

import { useFavorites } from '@/components/screens/favorites/useFavorites'
import MovieCatalog from '@/components/ui/movie/catalog/MovieCatalog'
import Loader from '@/components/ui/Loader'
import Layout from '@/components/ui/layout/Layout'

const Favorites: FC = () => {
	const { favoriteMovie, isLoading } = useFavorites()
	if (isLoading) return <Loader />
	return (
		<Layout isHasPadding>
			<MovieCatalog title='Favorite' movies={favoriteMovie} isBackButton />
		</Layout>
	)
}

export default Favorites
