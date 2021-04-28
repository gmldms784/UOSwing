import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { green, yellow, red, alert } from '../CommonVariable';
import {
	StyleSheet,
	View,
	Text,
	TextInput
} from 'react-native';
import { Modal, Logotitle } from '../Component';
import { useUserLogin, useUserState } from '../Main/Model/UserModel';
import AlertIcon from '../assets/warning.svg';

type Props = {
	// 희은 : 마커에는 id 필요없어서 지움
	number: number;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	amount: number;
	// 희은 : 마커에는 온습도 필요없어서 지움
	onPress: (name:string, address: string) => void;
}


const MarkerComponent = ({number, name, address, latitude, longitude, amount, onPress} : Props) => {
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

	// todo: marker arrow 만들기

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
					user.auth === "admin" &&
					<View style={MarkerStyle.alert}>
						<Text style={MarkerStyle.alertText}>!</Text>
					</View>
				}
				<View
					style={StyleSheet.flatten([{backgroundColor: markerColor}, MarkerStyle.marker])}
				>
					<Text style={MarkerStyle.info}>{address.replace("서울시립대학교 ", "")}</Text>
					<Text style={StyleSheet.flatten([MarkerStyle.whiteText, MarkerStyle.margin])}>{amount}개</Text>
					{
						// 마커에 온습도 필요 없어서 지움
					}
				</View>
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
	}
})

export default MarkerComponent;
