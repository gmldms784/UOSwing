import React from 'react';
import { Marker, LatLng } from 'react-native-maps';
import {
	StyleSheet,
	View,
	Text,
	TextInput
} from 'react-native';

const MarkerComponent = (position : LatLng) => {
	const obj = {
		name: "미래관 1층",
		number: "5개 ~ 10개",
		humidity: "10도 / 70%"
	}
	return (
		<Marker
			coordinate={{
				latitude: position.latitude,
				longitude: position.longitude
			}}
		>
			<View>
				<Text>{obj.name}</Text>
				<Text>{obj.number}</Text>
				<Text>{obj.humidity}</Text>
			</View>
		</Marker>
	);
};

export default MarkerComponent;
