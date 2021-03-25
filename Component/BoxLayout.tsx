import React, { ReactElement, ReactNode } from 'react';

import {
	View,
	Text
} from 'react-native';
import { borderColor } from '../StyleVariable';

type Props = {};

const BoxLayout : React.FC<Props> = ({ children }) => {
	return(
		<View
			style={{
				width: '96%',
				borderRadius: 5,
				borderStyle: 'solid',
				borderWidth: 1,
				borderColor: borderColor,
				margin: '2%',
				padding: 16
			}}
		>
			{children}
		</View>
	);
};

export default BoxLayout;