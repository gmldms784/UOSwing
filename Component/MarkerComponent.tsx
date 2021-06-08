import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { green, yellow, red, alert, borderColor } from '../CommonVariable';
import {
	StyleSheet,
	View,
	Text,
	Image
} from 'react-native';
import { useUserState } from '../Main/Model/UserModel';
import flagPinkImg from '../assets/img/circle.png';

type Props = {
	number: number;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	amount: number;
	isReported: boolean;
	onPress: (name: string, address: string) => void;
}


const MarkerComponent = ({ number, name, address, latitude, longitude, amount, isReported, onPress }: Props) => {
	const [markerColor, setMarkerColor] = useState<string>("yellow");
	const user = useUserState();

	useEffect(() => {
		const unitAmount = amount / number;
		if (unitAmount == 0) {
			setMarkerColor(red);
			return;
		} else if (unitAmount < 11) {
			setMarkerColor(yellow);
			return;
		} else {
			setMarkerColor(green);
		}
	}, [amount]);

	return (
		<Marker
			coordinate={{
				latitude: latitude,
				longitude: longitude
			}}
			onPress={() => onPress(name, address)}
		>
			<View
				style={StyleSheet.flatten([{backgroundColor: markerColor}, MarkerStyle.marker2])}
			/>
			{
				user.auth === "admin" && isReported &&
				<View style={MarkerStyle.alert}>
					<Text style={MarkerStyle.alertText}>!</Text>
				</View>
			}
		</Marker>
	);
};

const MarkerStyle = StyleSheet.create({
	marker2:{
		width: 30, height: 30,
		borderRadius: 100,
		borderColor: '#535353',
		borderWidth: 3,
		resizeMode :"contain"
	},
	alert: {
		position: "absolute",
		top: 0,
		right: 0,
		width: 20,
		height: 20,
		backgroundColor: alert,
		borderRadius: 100,
		zIndex: 1000,
		alignItems: "center",
		justifyContent: "center",
	},
	alertText: {
		textAlign: "center",
		color: "white",
		fontWeight: "bold"
	}
})

export default MarkerComponent;
