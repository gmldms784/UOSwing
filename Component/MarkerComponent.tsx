import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { green, yellow, red, alert } from '../CommonVariable';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import { useUserState } from '../Main/Model/UserModel';

type Props = {
	number: number;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	amount: number;
	isReported: boolean;
	onPress: (name:string, address: string) => void;
}


const MarkerComponent = ({number, name, address, latitude, longitude, amount, isReported, onPress} : Props) => {
	const [markerColor, setMarkerColor] = useState<string>("yellow");
	const user = useUserState();

	useEffect(()=> {
		const unitAmount = amount / number;
		if(unitAmount == 0){
			setMarkerColor(red);
			return;
		}else if (unitAmount < 11){
			setMarkerColor(yellow);
			return;
		}else {
			setMarkerColor(green);
		}
	}, [amount]);

	return (
		<>
			<Marker
				coordinate={{
					latitude: latitude,
					longitude: longitude
				}}
				style={{ padding: 10 }}
				onPress={() => onPress(name, address)}
			>
				{
					user.auth === "admin" && isReported &&
					<View style={MarkerStyle.alert}>
						<Text style={MarkerStyle.alertText}>!</Text>
					</View>
				}
				<View
					style={StyleSheet.flatten([{backgroundColor: markerColor}, MarkerStyle.marker])}
				>
					{/* <Text style={MarkerStyle.info}>{address.replace("서울시립대학교 ", "")}</Text> */}
					<Text style={StyleSheet.flatten([MarkerStyle.whiteText, MarkerStyle.margin])}>{amount}개</Text>
				</View>
				<Text style={StyleSheet.flatten([MarkerStyle.arrow, {borderTopColor: markerColor}])}></Text>
			</Marker>
		</>
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
	},
	arrow : {
		position: 'absolute',
		bottom: 0,
		right: '50%',
		width: 0,
		height: 0,
		borderLeftColor : 'transparent',
		borderLeftWidth : 10,
		borderRightColor : 'transparent',
		borderRightWidth : 10,
		borderTopColor : 'black',
		borderTopWidth : 10
	}
})

export default MarkerComponent;
