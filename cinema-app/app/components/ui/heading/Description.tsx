import React, { FC } from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import RenderHtml from 'react-native-render-html'

const Description: FC<{ text: string }> = ({ text }) => {
	const { width } = useWindowDimensions()
	const tagsStyles = {
		body: {
			color: 'white',
			fontSize: 17,
			fontWeight: '300',
			opacity: 0.5
		}
	}
	return (
		<View>
			<RenderHtml
				contentWidth={width}
				source={{
					html: text.includes('<p>') ? text : `<p>${text}</p>`
				}}
				tagsStyles={tagsStyles}
			/>
			<Text>Description</Text>
		</View>
	)
}

export default Description
