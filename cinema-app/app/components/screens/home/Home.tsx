import { Layout, Loader } from '@/components/ui'
import { useGetAllMovies } from '@/components/screens/home/useGetAllMovies'
import Carousel from './carousel/Carousel'

const Home = () => {
	const { movies, isLoading } = useGetAllMovies()
	return (
		<>
			<Layout>
				{isLoading ? (
					<Loader />
				) : (
					movies?.length && <Carousel movies={movies} />
				)}
			</Layout>
		</>
	)
}

export default Home
