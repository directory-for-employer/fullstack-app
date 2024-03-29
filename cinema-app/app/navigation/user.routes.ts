import { IRoute } from './navigation.types'
import { adminRoutes } from '@/navigation/admin.routes'
import {
	Favorites,
	Home,
	Profile,
	Search,
	Trending
} from '@/components/screens'
import Genre from '@/components/screens/genre/Genre'
import Actor from '@/components/screens/actor/Actor'
import Movie from '@/components/screens/movie/Movie'

export const userRoutes: IRoute[] = [
	{
		name: 'Home',
		component: Home
	},
	{
		name: 'Trending',
		component: Trending
	},
	{
		name: 'Search',
		component: Search
	},
	{
		name: 'Favorites',
		component: Favorites
	},
	{
		name: 'Profile',
		component: Profile
	},
	{
		name: 'Genre',
		component: Genre
	},
	{
		name: 'Actor',
		component: Actor
	},
	{
		name: 'Movie',
		component: Movie
	}
]
export const routes = [...userRoutes, ...adminRoutes]
