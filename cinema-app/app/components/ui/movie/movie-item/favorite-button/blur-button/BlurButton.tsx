import { FC, PropsWithChildren } from 'react'
import { IBlurButton } from '@/components/ui/movie/movie-item/favorite-button/blur-button/blur-button.interface'
import { Pressable } from 'react-native'
import { BlurView } from 'expo-blur'
import { Feather } from '@expo/vector-icons'
import cn from 'clsx'

const BlurButton: FC<PropsWithChildren<IBlurButton>> = ({
	children,
	color = '#fff',
	icon,
	iconSize = 21,
	style,
	isSmall = false,
	...rest
}) => {
	return (
		<Pressable {...rest}>
			<BlurView
				intensity={20}
				tint={'light'}
				className={cn(
					'items-center justify-center overflow-hidden',
					isSmall ? 'w-8 h-8 rounded-lg' : 'w-12 h-12 rounded-2xl  '
				)}
				style={style}
			>
				{children ? (
					children
				) : (
					<Feather name={icon} size={iconSize} color={color} />
				)}
			</BlurView>
		</Pressable>
	)
}

export default BlurButton
