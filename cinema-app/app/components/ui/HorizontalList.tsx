import { FlatList, FlatListProps, Platform } from 'react-native'
import { memo } from 'react'

const HorizontalList = <T extends any>(props: FlatListProps<T>) => {
	return (
		<FlatList
			horizontal
			renderToHardwareTextureAndroid
			showsHorizontalScrollIndicator={false}
			scrollEventThrottle={16}
			decelerationRate={Platform.OS === 'ios' ? 0 : 0.98}
			{...props}
		/>
	)
}

export default memo(HorizontalList)
