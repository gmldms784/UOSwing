import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { green, yellow, red, alert } from '../StyleVariable';
import {
	StyleSheet,
	View,
	Text,
	TextInput
} from 'react-native';
import { useUserLogin, useUserState } from '../Main/Model/UserModel';

type Props = {
	name: string;
	latitude: number;
	longitude: number;
	amount: number;
	humidity?: number;
	temperature?: number;
}


const MarkerComponent = ({name, latitude, longitude, amount, humidity, temperature} : Props) => {
	const [markerColor, setMarkerColor] = useState<string>("yellow");
	const user = useUserState();

	useEffect(()=> {
		if(amount == 0){
			setMarkerColor(red);
			return;
		}else if (amount < 11){
			setMarkerColor(yellow);
			return;
		}else {
			setMarkerColor(green);
		}
	}, [amount]);

	// todo: marker arrow 만들기

	return (
		<Marker
			coordinate={{
				latitude: latitude,
				longitude: longitude
			}}
			style={{ padding: 10 }}
		>
			{
				user.auth === "admin" &&
				<View style={MarkerStyle.alert}>
					<Text style={MarkerStyle.alertText}>!</Text>
				</View>
			}
			<View
				style={StyleSheet.flatten([{backgroundColor: markerColor}, MarkerStyle.marker])}
			>
				<Text style={MarkerStyle.info}>{name}</Text>
				<Text style={StyleSheet.flatten([MarkerStyle.whiteText, MarkerStyle.margin])}>{amount}개</Text>
				{
					temperature && humidity &&
					<Text style={MarkerStyle.whiteText}>{`${temperature}°C / ${humidity}%`}</Text>
				}
			</View>
		</Marker>
	);
};

const MarkerStyle = StyleSheet.create({
	marker: {
		padding: 8,
		borderRadius: 20,
		position: "relative",
		flexDirection: "column",
		alignItems: "center"
	},
	info: {
		textAlign: "center",
		marginTop: 5,
		marginBottom: 8,
		fontFamily: 'GmarketMedium'
	},
	whiteText: {
		backgroundColor: "white",
		borderRadius: 15,
		padding: 10,
		paddingTop: 5,
		paddingBottom: 5,
		textAlign: "center",
		fontFamily: 'GmarketMedium'
	},
	margin: {
		marginBottom: 5
	},
	alert: {
		position: "absolute",
		top: 0,
		right: 0,
		width: 25,
		height: 25,
		backgroundColor: alert,
		borderRadius: 100,
		zIndex: 1000,
		alignItems: "center",
		justifyContent: "center"
	},
	alertText: {
		textAlign: "center",
		color: "white",
		fontWeight: "bold"
	}
})

export default MarkerComponent;
