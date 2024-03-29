import { useQuery } from '@tanstack/react-query'
import { MovieService } from '@/services/movie.service'

export const useRelatedMovies = (
	genreIds: number[],
	currentMovieId: number
) => {
	const { isLoading, data } = useQuery(
		['get_related_movies_by_genres', genreIds],
		() => MovieService.getByGenres(genreIds),
		{
			select: (data) => data.filter((m) => m.id !== currentMovieId).slice(0, 5)
		}
	)
	return { isLoading, data }
}
