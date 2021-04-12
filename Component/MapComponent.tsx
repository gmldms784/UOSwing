import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
	TextInput,
	Alert
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import { Picker } from '@react-native-picker/picker';

import { Modal, Logotitle } from '.';
import AlertIcon from '../assets/warning.svg';

import { useUserState } from '../Main/Model/UserModel';
import { usePadBoxState } from '../Main/Model/PadBoxModel';
import { padBoxType } from '../Main/Type';
import { MarkerComponent, MapWidget, ButtonComponent } from '../Component';
import { useSaveReport } from '../Main/ViewModel/ReportViewModel';

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

	// <---report modal
	const saveReport = useSaveReport();
	const [reportModal, setReportModal] = useState<boolean>(false);
	const [reportPos, setReportPos] = useState<number>(0);
	const [reportWhy, setReportWhy] = useState<string>("");
	const [reportBody, setReportBody] = useState<string>("");
	const handleReportOpen = (idx : number) => {
		setReportPos(idx);
		setReportModal(true);
	}
	const handleReportClose = () => {
		setReportModal(false);
	}
	const handleReportComplete= () => {
		saveReport(-1, reportWhy, reportBody, reportPos);
		handleReportClose();
		setReportPos(0);
		setReportWhy("");
		setReportBody("");
		Alert.alert("신고가 성공적으로 접수되었습니다");
	}
	// ----> report modal

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
		<>
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
						padBoxState.map((padBox: padBoxType, index : number) =>
							<MarkerComponent
								key={padBox.boxId}
								index={index}
								name={padBox.name}
								latitude={padBox.latitude}
								longitude={padBox.longitude}
								amount={padBox.padAmount}
								humidity={user.auth === "admin" ? padBox.humidity : undefined}
								temperature={user.auth === "admin" ? padBox.temperature : undefined}
								onPress={handleReportOpen}
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
				{
					user.auth === "user" &&
					<TouchableHighlight
						style={
							Map.alert
						}
						onPress = {handleReportOpen}
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
			{
				// todo : report 모달 관련 요소 컴포넌트로 분리하기
				user.auth==="user"?
				<Modal
					view={reportModal}
					onClose={handleReportClose}
					title={<Logotitle icon={<AlertIcon width={30} height={30} style={{ marginRight: 7 }} />}name="신고하기" />}
				>
					<View style={{ width: 270 }}>
						<Text style={MS.title}>장소</Text>
						<Picker
							selectedValue={reportPos}
							// 희은 피드백 : ts 맞춰서 type 기재해주세요!
							// 이제 마커 클릭해도 신고하기가 뜨는데 바로 클릭한 padBox가 select되게 해두었어요! 아래 map도 구현해두었습니다!
							onValueChange={(v, i)=>setReportPos(v)}>
							{
								padBoxState.map((padBox : padBoxType, index : number) =>
									<Picker.Item key={padBox.id} label={padBox.name} value={index}/>
								)	
							}
							{/* <Picker.Item label="창공관" value={0} />
							<Picker.Item label="학관" value={1} />
							<Picker.Item label="도서관" value={2} /> */}
						</Picker>
						<Text style={MS.title}>신고사유</Text>
						<Picker
							selectedValue={reportWhy}
							onValueChange={(v, i)=>setReportWhy(v)}>
							<Picker.Item label="Test" value={0} />
							<Picker.Item label="Test2" value={1} />
							<Picker.Item label="Test3" value={2} />
						</Picker>
						<Text style={MS.title}>기타사항</Text>
						<TextInput style={MS.input} value={reportBody} onChangeText={setReportBody} />
						<TouchableHighlight
							style={{
								width: "50%",
								left: "25%",
								marginTop: 20
							}}
							underlayColor="transparent"
							onPress={handleReportComplete}
						>
							<ButtonComponent color="mint">
								<Text style={MS.btnText}>완료</Text>
							</ButtonComponent>
						</TouchableHighlight>
					</View>
				</Modal>
				:
				<Modal
					view = {reportModal}
					onClose={handleReportClose}
					title={<Logotitle icon={<AlertIcon width={25} height={25} fill="black" />} name="신고내역"/>}
				>
					<Text style={MS.title}>{padBoxState}</Text>
				</Modal>
			}
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

const MS = StyleSheet.create({
	title: {
		paddingLeft: 10,
		marginTop: 25,
		borderLeftColor: 'black',
		borderLeftWidth: 3,
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'DOHYEON',
	},
	input: {
		borderWidth: 1,
		borderRadius: 7,
		padding: 5,
		marginTop: 10,
	},
	btnText: {
		fontSize: 15,
		fontFamily: 'DOHYEON',
		marginVertical: 7,
	}
})

export default MapComponent;
