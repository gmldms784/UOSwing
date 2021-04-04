import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	Text,
	View
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';

import AlertIcon from '../assets/warning.svg';

import { useUserState } from '../Main/Model/UserModel';
import { usePadBoxState } from '../Main/Model/PadBoxModel';
import { padBoxType } from '../Main/Type';
import { MarkerComponent, MapWidget, ButtonComponent } from '../Component';
import { mint } from '../StyleVariable';

type ILocation = {
	latitude: number;
	longitude: number;
}

const range = {
	start : {
		latitude: 37.5777,
		longitude: 127.0518,
	},
	end : {
		latitude: 37.5874,
		longitude: 127.0682,
	}
};

const MapComponent = () => {
	const padBoxState = usePadBoxState();
	const user = useUserState();
	const [location, setLocation] = useState<ILocation | undefined>(undefined);
	const [locationInfo, setLocationInfo] = useState<boolean>(false);

	const getMyPosition = () => {
		// 잘작동하는지 실제 디바이스로 테스트 필요
		// todo : 학교 밖에 위치하면 alert?
		// 37.5777~37.5874 , 127.0518~127.0682

		Geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				setLocation({
					latitude,
					longitude,
				});
				if(latitude < range.start.latitude || latitude > range.end.latitude || longitude < range.start.longitude || longitude > range.end.longitude){
					// 학교 범위 안에 있지 않으면
					handleInfoShow();
				}
			},
			error => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
	};

	const handleInfoShow = async () => {
		await setLocationInfo(true);
		setTimeout(() => {
			setLocationInfo(false);
		}, 2000);
	};

	return (
		<View style={Map.wrap}>
			<MapView
				style={Map.map}
				initialRegion={{
					latitude: 37.5833427,
					longitude: 127.0590842,
					latitudeDelta: 0.2,
					longitudeDelta: 0.2,
				}}
				zoomEnabled={true}
				minZoomLevel={15.8}
				maxZoomLevel={18}
				scrollEnabled={false}
				loadingEnabled={true}
				moveOnMarkerPress={false}
			>
				{
					padBoxState.map((padBox: padBoxType) =>
						<MarkerComponent
							key={padBox.boxId}
							name={padBox.name}
							latitude={padBox.latitude}
							longitude={padBox.longitude}
							amount={padBox.padAmount}
							humidity={user.auth === "admin" ? padBox.humidity : undefined}
							temperature={user.auth === "admin" ? padBox.temperature : undefined}
						/>
					)
				}
				{
					location &&
					<Marker
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude
						}}
					/>
				}
			</MapView>
			{
				locationInfo &&
				<View style={Map.info}>
					<Text style={{textAlign: "center"}}>😅 학교 내에 있지 않으시군요!</Text>
				</View>
			}
			<MapWidget
				getMyPosition={getMyPosition}
			/>
			<TouchableHighlight
				style={
					Map.alert
				}
			// todo : onPress로 신고 modal 열기
			>
				<ButtonComponent
					color="mint"
					border={true}
				>
					<AlertIcon width={30} height={30} style={{ marginRight: 7 }} />
					<Text style={{ fontSize: 18 }}>신고하기</Text>
				</ButtonComponent>
			</TouchableHighlight>
		</View>
	);
};

const Map = StyleSheet.create({
	wrap: {
		position: "relative",
		justifyContent: "center",
		alignItems: "flex-end",
		width: "100%",
		height: "100%",
	},
	map: {
		width: "100%",
		height: "100%",
		flexDirection: "column",
		alignItems: "center",
		position: "relative"
	},
	alert: {
		position: "absolute",
		width: "50%",
		bottom: 20,
		right: "25%"
	},
	info: {
		position: "absolute",
		top: 10,
		width: "50%",
		right: "25%",
		borderRadius: 20,
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 4,
		elevation: 6,
		padding: 8
	}
});

export default MapComponent;
