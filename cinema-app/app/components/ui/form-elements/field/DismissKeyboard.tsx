// @flow
import * as React from 'react'
import { FC, PropsWithChildren } from 'react'
import {
	Keyboard,
	TouchableWithoutFeedback,
	View,
	ViewProps
} from 'react-native'

type Props = {}
export const DismissKeyboard: FC<PropsWithChildren<ViewProps>> = ({
	children,
	...rest
}) => {
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View
				style={{
					flex: 1
				}}
				{...rest}
			>
				{children}
			</View>
		</TouchableWithoutFeedback>
	)
}
