import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
	Platform,
	PermissionsAndroid,
	Alert,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker, Region } from 'react-native-maps';

import { ReportModal, PadListModal } from '.';
import AlertIcon from '../assets/warning.svg';

import { useUserState } from '../Main/Model/UserModel';
import { usePadBoxState } from '../Main/Model/PadBoxModel';
import { padBoxType, markerType, markerValueType } from '../Main/Type';
import { MarkerComponent, MapWidget, ButtonComponent } from '../Component';
import padBoxToMarker from '../Function/PadBoxToMarker';

const school : Region = {
	latitude: 37.5833427,
	longitude: 127.0590842,
	latitudeDelta: 0.2,
	longitudeDelta: 0.2
}

const range = {
	start: {
		latitude: 37.5777,
		longitude: 127.0518,
	},
	end: {
		latitude: 37.5874,
		longitude: 127.0682,
	}
};

const MapComponent = () => {
	const padBoxState = usePadBoxState();
	const user = useUserState();
	const [userLocation, setUserLocation] = useState<Region | undefined>(undefined);
	const [appCenter, setAppCenter] = useState<Region>(school);
	const [locationInfo, setLocationInfo] = useState<boolean>(false);

	// <--- make padBox to marker
	const [markers, setMarkers] = useState<markerType>({});
	useEffect(() => {
		async function changePadBoxToMarker() {
			const res = await padBoxToMarker(padBoxState);
			setMarkers(res);
		}
		changePadBoxToMarker();
	}, [padBoxState]);
	// ---> make padBox to marker

	// <---report modal
	const [reportModal, setReportModal] = useState<boolean>(false);
	const [reportPos, setReportPos] = useState<number>(0);
	const [posName, setPosName] = useState<string>("");
	const [tagString, setTagString] = useState<string>("ALL");
	const tagHandle = (tag: string) => setTagString(tag);
	const reportHandle = (id: number) => setReportPos(id);
	const handleReportOpen = (id: number, name: string) => {
		tagHandle("ALL");
		setPosName(name);
		reportHandle(id);
		setReportModal(true);
	}
	const handleReportClose = () => {
		setReportModal(false);
	}
	// ----> report modal

	// <--- Pad List Modal
	const [listModal, setListModal] = useState<boolean>(false);
	const [address, setAddress] = useState<string>("");

	const handleListOpen = (name: string, address: string) => { // list open 할 때는 id를 set하지 않아도 됨
		setPosName(name);
		setAddress(address);
		setListModal(true);
	}

	const handleListClose = () => {
		setListModal(false);
	}
	// ---> Pad List Modal

	// <--- location

	const getMyPosition = () => {
		if (Platform.OS === 'android') {
			PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
			).then(granted => {
				if (granted) {
					watchLocation();
				}else{
					Alert.alert('내 위치 권한이 없습니다.');
				}
			});
		} else {
			watchLocation();
		}
	};

	const watchLocation = () => {
		// 잘작동하는지 실제 디바이스로 테스트 필요
		// todo : 학교 밖에 위치하면 alert?
		// 37.5777~37.5874 , 127.0518~127.0682

		Geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords;
				setUserLocation({
					latitude,
					longitude,
					latitudeDelta: 0.2,
					longitudeDelta: 0.2
				});
				if (latitude < range.start.latitude || latitude > range.end.latitude || longitude < range.start.longitude || longitude > range.end.longitude) {
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

	// ---> location


	return (
		<>
			<View style={Map.wrap}>
				<MapView
					style={Map.map}
					initialRegion={school}
					region={appCenter}
					zoomEnabled={true}
					minZoomLevel={15.8}
					maxZoomLevel={18}
					scrollEnabled={true}
					loadingEnabled={true}
					moveOnMarkerPress={false}
				>
					{
						Object.keys(markers).map((padBoxAddress: string, index: number) => {
							let value: markerValueType = markers[padBoxAddress];
							return (
								<MarkerComponent
									key={index}
									number={value.number}
									name={value.name}
									address={padBoxAddress}
									latitude={value.latitude}
									longitude={value.longitude}
									amount={value.padAmount}
									isReported={value.isReported}
									onPress={handleListOpen}
								/>

							);
						})
					}
					{
						userLocation &&
						<Marker
							coordinate={{
								latitude: userLocation.latitude,
								longitude: userLocation.longitude
							}}
						/>
					}
				</MapView>
				{
					locationInfo &&
					<View style={Map.info}>
						<Text style={{ textAlign: "center" }}>😅 학교 내에 있지 않으시군요!</Text>
					</View>
				}
				<MapWidget
					getMyPosition={getMyPosition}
				/>
				{
					user.auth === "user" &&
					<TouchableHighlight
						style={
							Map.alert
						}
						onPress={() => setReportModal(true)}
						underlayColor="transparent"
					>
						<ButtonComponent
							color="mint"
							border={true}
						>
							<AlertIcon width={30} height={30} style={{ marginRight: 7 }} />
							<Text style={{ fontSize: 18 }}>신고하기</Text>
						</ButtonComponent>
					</TouchableHighlight>
				}
			</View>
			<ReportModal
				reportModal={reportModal}
				handleReportClose={handleReportClose}
				reportPos={reportPos}
				reportHandle={reportHandle}
				posName={posName}
				tagString={tagString}
				setTagString={tagHandle}
			/>
			<PadListModal
				listModal={listModal}
				handleListClose={handleListClose}
				address={address}
				handleReportOpen={handleReportOpen}
			/>
		</>
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
