import React from 'react';

import {
	View
} from 'react-native';
import { borderColor } from '../CommonVariable';

type Props = {};

// Box 모양 리스트의 컴포넌트
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