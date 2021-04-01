import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import MapView, { Marker, LatLng } from 'react-native-maps';
import { yellow, red } from '../StyleVariable';
// import { MarkerComponent } from '.';

const MapComponent = () => {
	const alforhks : LatLng = {
		latitude: 37.5842410,
		longitude: 127.0562571
	};
	const obj = [{
		name: "미래관 1층",
		number: "5개 ~ 10개",
		humidity: "24도 / 70%"
	}, {
		name: "학관 2층",
		number: "0개",
		humidity: "27도 / 60%"
	}];

	return (
        <MapView
			style={Map.wrap}
			initialRegion={{
				latitude: 37.5833427,
				longitude: 127.0580743,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			}}
			zoomEnabled={true}
			minZoomLevel={16}
			maxZoomLevel={18}
			scrollEnabled={false}
			loadingEnabled={true}
        >
			<Marker
				coordinate={{
					latitude: 37.5840907,
					longitude: 127.0562230
				}}
			>
				<View style={Map.markerYellow}>
					<Text style={Map.info}>{obj[0].name}</Text>
					<Text style={Map.whiteText}>{obj[0].number}</Text>
					<Text style={Map.whiteText}>{obj[0].humidity}</Text>
				</View>
			</Marker>
			<Marker
				coordinate={{
					latitude: 37.583787,
					longitude: 127.0602020
				}}
			>
				<View style={Map.markerRed}>
					<Text style={Map.info}>{obj[1].name}</Text>
					<Text style={Map.whiteText}>{obj[1].number}</Text>
					<Text style={Map.whiteText}>{obj[1].humidity}</Text>
				</View>
			</Marker>
		</MapView>
	);
};

const Map = StyleSheet.create({
	wrap: {
		width: "100%",
		height: "100%",
		flexDirection: "column",
		alignItems: "center"
	},
	markerYellow: {
		padding: 15,
		backgroundColor: yellow,
		borderRadius: 20,
	},
	markerRed: {
		padding: 15,
		backgroundColor: red,
		borderRadius: 20
	},
	info: {
		textAlign: "center",
		marginBottom: 10,
		fontWeight: "bold"
	},
	whiteText: {
		backgroundColor: "white",
		borderRadius: 20,
		padding: 5,
		marginBottom: 5,
		textAlign: "center",
	}
});

export default MapComponent;
