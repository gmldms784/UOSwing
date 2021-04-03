import React from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import MapView from 'react-native-maps';
import { useUserState } from '../Main/Model/UserModel';
import { usePadBoxState } from '../Main/Model/PadBoxModel';
import { padBoxType } from '../Main/Type';
import { MarkerComponent, MapWidget } from '../Component';


const MapComponent = () => {
	const padBoxState = usePadBoxState();
	const user = useUserState();

	return (
		<MapView
			style={Map.wrap}
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
		// todo: double click 시 이동하는 현상 막기
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
			<MapWidget/>
		</MapView>
	);
};

const Map = StyleSheet.create({
	wrap: {
		width: "100%",
		height: "100%",
		flexDirection: "column",
		alignItems: "center",
		position: "relative"
	}
});

export default MapComponent;
