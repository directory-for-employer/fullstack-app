import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { UserService } from '@/services/user.service'

export const useFavorites = () => {
	const { user } = useAuth()
	const userId = user?.id

	const { isLoading, data: favoriteMovie } = useQuery(
		['favorite-movie'],
		() => UserService.getFavorites(),
		{
			enabled: !!userId
		}
	)
	return {
		isLoading,
		favoriteMovie
	}
}
