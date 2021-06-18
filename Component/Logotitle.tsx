import React from 'react';

import {
	View,
	Text
} from 'react-native';

type Props = {
	icon : React.ReactNode;
	name : string;
}

// Page 상단의 Logo가 있는 Title 컴포넌트
const Logotitle = ({ icon, name } : Props) => {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center"
			}}
		>
			<Text>{icon}</Text>
			<Text style={{
				fontSize: 24,
				marginLeft: 6,
				fontFamily: 'DOHYEON'
			}}>{name}</Text>
		</View>
	)
};

export default Logotitle;