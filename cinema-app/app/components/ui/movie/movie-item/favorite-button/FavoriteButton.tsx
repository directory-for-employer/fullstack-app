import { FC } from 'react'
import { StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import cn from 'clsx'
import { useFavoriteAnimation } from '@/components/ui/movie/movie-item/favorite-button/useFavoriteAnimation'
import Animated, { withSpring } from 'react-native-reanimated'
import { useFavorite } from '@/components/ui/movie/movie-item/favorite-button/useFavorite'
import BlurButton from '@/components/ui/movie/movie-item/favorite-button/blur-button/BlurButton'

interface IFavoriteButton {
	movieId: number
	isSmall?: boolean
}

const FavoriteButton: FC<IFavoriteButton> = ({ isSmall, movieId }) => {
	const { toggleFavorite, isSmashed } = useFavorite(movieId)
	const { outlineStyle, fillStyle, liked } = useFavoriteAnimation(isSmashed)
	return (
		<BlurButton
			className={cn({ 'w-8 h-8 rounded-lg': isSmall })}
			onPress={() => {
				liked.value = withSpring(liked.value === 1 ? 0 : 1)
				toggleFavorite()
			}}
		>
			<Animated.View
				style={[StyleSheet.absoluteFill, outlineStyle]}
				className='items-center justify-center'
			>
				<MaterialCommunityIcons
					name={'heart-outline'}
					size={isSmall ? 19 : 22}
					color={'white'}
				></MaterialCommunityIcons>
			</Animated.View>

			<Animated.View style={fillStyle}>
				<MaterialCommunityIcons
					name={'heart'}
					size={isSmall ? 19 : 22}
					color={'#DC3F41'}
				></MaterialCommunityIcons>
			</Animated.View>
		</BlurButton>
	)
}

export default FavoriteButton
