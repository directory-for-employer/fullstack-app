import { Text } from 'react-native'
import { FC } from 'react'
import { IHeading } from '@/components/ui/heading/heading.interface'
import cn from 'clsx'

const Heading: FC<IHeading> = ({ className, title }) => {
	return (
		<Text
			className={cn(
				'text-white text-opacity-80 font-semibold text-3xl',
				className
			)}
			numberOfLines={1}
		>
			{title}
		</Text>
	)
}

export default Heading
