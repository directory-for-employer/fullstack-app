import { FC } from 'react'
import { TypeNavigate } from '@/components/ui/layout/bottom-menu/menu.interface'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { menuItems } from '@/components/ui/layout/bottom-menu/menu.data'
import MenuItem from '@/components/ui/layout/bottom-menu/MenuItem'

interface IBottomMenu {
	nav: TypeNavigate
	currentRoute?: string
}
const BottomMenu: FC<IBottomMenu> = ({ currentRoute, nav }) => {
	const { bottom } = useSafeAreaInsets()
	return (
		<View
			className='pt-5 px-2 flex-row justify-between items-center w-full
		border-t border-t-solid border-t-[#929292] bg-[#090909]'
			style={{ paddingBottom: bottom + 5 }}
		>
			{menuItems.map((item) => (
				<MenuItem
					key={item.path}
					item={item}
					nav={nav}
					currentRoute={currentRoute}
				></MenuItem>
			))}
		</View>
	)
}

export default BottomMenu
