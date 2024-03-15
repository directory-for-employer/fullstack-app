import {
	createContext,
	FC,
	PropsWithChildren,
	useEffect,
	useState
} from 'react'
import {
	IContext,
	TypeUserState
} from '@/providers/auth/auth-provider.interface'
import * as SplashScreen from 'expo-splash-screen'
import { IUser } from '@/shared/types/user.interface'
import { getAccessToken, getUserFromStorage } from '@/services/auth/auth.helper'

export const AuthContext = createContext({} as IContext)

let ignore = SplashScreen.preventAutoHideAsync()
const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
	const [user, setUser] = useState<TypeUserState>({} as IUser)
	useEffect(() => {
		let IsMounted = true

		const checkAccesstoken = async () => {
			try {
				const accessToken = await getAccessToken()
				if (accessToken) {
					const user = await getUserFromStorage()
					if (IsMounted) setUser(user)
				}
			} catch {
			} finally {
				await SplashScreen.hideAsync()
			}
		}
		let ignore = checkAccesstoken()
		return () => {
			IsMounted = false
		}
	}, [])
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthProvider
