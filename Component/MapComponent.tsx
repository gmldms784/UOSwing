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

type ILocation = {
	latitude: number;
	longitude: number;
}

const MapComponent = () => {
	const padBoxState = usePadBoxState();
	const user = useUserState();
	const [location, setLocation] = useState<ILocation | undefined>(undefined);

	const getMyPosition = () => {
		// 잘작동하는지 실제 디바이스로 테스트 필요
		// todo : 학교 밖에 위치하면 alert?
		Geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				setLocation({
					latitude,
					longitude,
				});
			},
			error => {
				console.log(error.code, error.message);
			},
			{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
		);
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
	}
});

export default MapComponent;
