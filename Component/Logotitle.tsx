import React from 'react';

import {
	View,
	Text
} from 'react-native';

type Props = {
	icon : React.ReactNode;
	name : string;
}

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