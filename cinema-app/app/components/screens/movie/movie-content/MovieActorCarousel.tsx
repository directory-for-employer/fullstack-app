import { FC } from 'react'
import { Image, ListRenderItemInfo, Pressable, Text, View } from 'react-native'
import { IActor } from '@/shared/types/dataInterface/movie.interface'
import HorizontalList from '@/components/ui/HorizontalList'
import { useTypedNavigation } from '@/hooks/useTypedNavigation'
import { getMediaSourse } from '@/utils/getMediaSourse'

const MovieActorCarousel: FC<{ actors: IActor[] }> = ({ actors }) => {
	const { navigate } = useTypedNavigation()
	return (
		<HorizontalList
			data={actors}
			// @ts-ignore
			renderItem={({ item: actor }: ListRenderItemInfo<IActor>) => (
				<Pressable
					onPress={() =>
						navigate('Actor', {
							slug: actor['actor']['slug']
						})
					}
					className='flex-row items-center rounded-xl overflow-hidden w-48 mr-4'
					style={{
						height: 72,
						backgroundColor: 'rgba(255, 255, 255, 0.07)'
					}}
				>
					<Image
						className='h-full'
						style={{ width: 50, resizeMode: 'cover' }}
						source={getMediaSourse(actor['actor']['photo'])}
					/>
					<View className='p-3 w-11/12'>
						<Text
							className='text-white text-base font-medium pr-7'
							numberOfLines={1}
						>
							{actor['actor']['name']}
						</Text>
					</View>
				</Pressable>
			)}
		></HorizontalList>
	)
}

export default MovieActorCarousel
