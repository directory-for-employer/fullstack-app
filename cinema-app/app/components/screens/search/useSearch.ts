import { useQuery } from '@tanstack/react-query'
import { useSearchForm } from '@/components/screens/search/useSearchForm'
import { MovieService } from '@/services/movie.service'

export const useSearch = () => {
	const { searchTerm, debouncedSearch, control } = useSearchForm()
	const { data: movies, isLoading } = useQuery(
		['search_movie', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			enabled: !!debouncedSearch
		}
	)

	return { movies, isLoading, control, searchTerm }
}
