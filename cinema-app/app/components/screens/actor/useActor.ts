import { useTypedRoute } from '@/hooks/useTypedRoute'
import { useQuery } from '@tanstack/react-query'
import { ActorService } from '@/services/actor.service'
import { MovieService } from '@/services/movie.service'

export const useActor = () => {
	const { params } = useTypedRoute<'Actor'>()
	// console.log(params)
	const { isLoading, data: actor } = useQuery(
		['get actor by slug', params.slug],
		() => ActorService.getBySlug(params.slug)
	)

	let actorId = actor?.id || 1
	// console.log(actorId)
	const { isLoading: isMovieLoading, data: movies } = useQuery(
		['get actor by slug', actorId],
		() => MovieService.getByActor(+actorId),
		{
			enabled: !!actorId
		}
	)
	// console.log(movies)
	// console.log(actor)

	return { actor, movies, isLoading: isLoading || isMovieLoading }
}
