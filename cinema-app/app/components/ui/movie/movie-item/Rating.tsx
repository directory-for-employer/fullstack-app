import React, { FC } from 'react'
import { Text, View } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { getColor } from '@/config/colors.config'
import cn from 'clsx'

interface IRating {
	size?: number
	rating: number
}

const Rating: FC<IRating> = ({ size = 20, rating }) => {
	return (
		<View className='flex-row items-center'>
			<AntDesign name='star' size={size} color={getColor('yellow')} />

			<Text
				className={cn(
					'text-white ml-2 font-bold',
					size === 20 ? 'text-lg' : 'text-base'
				)}
			>
				{rating.toFixed(1)}
			</Text>
		</View>
	)
}

export default Rating
