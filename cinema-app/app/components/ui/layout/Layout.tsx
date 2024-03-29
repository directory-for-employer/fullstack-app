import { FC, PropsWithChildren } from 'react'
import { Platform, SafeAreaView, View, ViewStyle } from 'react-native'
import cn from 'clsx'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayout {
	className?: string
	style?: ViewStyle
	isHasPadding?: boolean
}
const Layout: FC<PropsWithChildren<ILayout>> = ({
	children,
	className,
	style,
	isHasPadding
}) => {
	const { top } = useSafeAreaInsets()
	return (
		<SafeAreaView className='flex-1'>
			<View
				className={cn('flex-1', className, { 'px-6': isHasPadding })}
				style={{
					paddingTop: Platform.OS === 'ios' ? top / 4 : top * 1.7,
					...style
				}}
			>
				{children}
			</View>
		</SafeAreaView>
	)
}

export default Layout
