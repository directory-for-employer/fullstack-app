import { useMutation } from '@tanstack/react-query'
import { MovieService } from '@/services/movie.service'
import { useTypedRoute } from '@/hooks/useTypedRoute'
import { useEffect } from 'react'

export const useCountOpened = () => {
	const { params } = useTypedRoute<'Movie'>()
	const { mutate } = useMutation(['updateCountOpened'], () =>
		MovieService.updateCountOpened(params.slug)
	)
	useEffect(() => {
		mutate()
	}, [])
}
