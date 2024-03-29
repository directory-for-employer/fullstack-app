import { FC, useRef } from 'react'
import { Button } from '@/components/ui'
import { ResizeMode, Video } from 'expo-av'
import { getMediaSourse } from '@/utils/getMediaSourse'
import { View } from 'react-native'

const VideoPlayer: FC<{ video: string }> = ({ video }) => {
	const videoRef = useRef<Video>(null)

	return (
		<>
			<Button
				icon='play'
				className='mb-6'
				onPress={async () => {
					await videoRef.current?.presentFullscreenPlayer()
					await videoRef.current?.playAsync()
				}}
			>
				Watch movie
			</Button>
			<View>
				<Video
					ref={videoRef}
					source={getMediaSourse(video)}
					style={{ height: 100 }}
					className='mb-5 w-full hidden'
					shouldPlay
					useNativeControls
					resizeMode={ResizeMode.CONTAIN}
				/>
			</View>
		</>
	)
}

export default VideoPlayer
