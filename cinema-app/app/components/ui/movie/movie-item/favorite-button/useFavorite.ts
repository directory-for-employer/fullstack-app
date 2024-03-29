import { useEffect, useState } from 'react'
import { useFavorites } from '@/components/screens/favorites/useFavorites'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserService } from '@/services/user.service'
import { IMovie } from '@/shared/types/dataInterface/movie.interface'

export const useFavorite = (movieId: number) => {
	const [isSmashed, setIsSmashed] = useState(false)
	const { favoriteMovie } = useFavorites()

	useEffect(() => {
		if (!favoriteMovie) return
		const isHasMovie =
			favoriteMovie && favoriteMovie.some((f: IMovie) => f.id === movieId)
		if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
	}, [isSmashed, movieId])

	const queryClient = useQueryClient()

	const { mutate: toggleFavorite } = useMutation(
		['update-favorite'],
		() => UserService.toggleFavorite(movieId),
		{
			async onSuccess() {
				await queryClient.invalidateQueries(['favorite-movie'])
			}
		}
	)

	return {
		toggleFavorite,
		isSmashed
	}
}
