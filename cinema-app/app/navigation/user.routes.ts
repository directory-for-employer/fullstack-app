import { IRoute } from './navigation.types'
import { adminRoutes } from '@/navigation/admin.routes'
import {
	Favorites,
	Home,
	Profile,
	Search,
	Trending
} from '@/components/screens'

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
	}
]
export const routes = [...userRoutes, ...adminRoutes]
