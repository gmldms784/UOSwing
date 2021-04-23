import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

import { usePadBoxAddress, usePadBoxState } from '../Main/Model/PadBoxModel'
import { useSavePadBox, useDeletePadBox } from '../Main/ViewModel/PadBoxViewModel';
import { padBoxType, padBoxAddressType } from '../Main/Type';
import { Logotitle, Modal, SettingCard, ButtonComponent } from '../Component';
import SquareIcon from '../assets/square.svg';
import { SettingStackParamList } from '../Router/SettingRouter';

type Props = {
	navigation: StackNavigationProp<SettingStackParamList, 'SettingCreate'>;
}

const SettingScreen = ({ navigation } : Props) => {
	const settingData = usePadBoxState();
	const settingAddress = usePadBoxAddress();
	const saveSetting = useSavePadBox();
	const deletePadBox = useDeletePadBox();
	const [modal, setModal] = useState<boolean>(false);
	const [deleteModal, setDeleteModal] = useState<boolean>(false);

	// <-- 넘겨줄 데이터(주소, id, 위도, 경도, 이름)
	const [name, setName] = useState<string>("");
	const [pos, setPos] = useState<string>(""); // 주소(address)
	const [id, setId] = useState<number>(0);
	const [latitude, setLatitude] = useState<number>(0);
	const [longitude, setLongitude] = useState<number>(0);
	// -->

	const handleModalOpen = (setting: padBoxType) => {
		setName(setting.name);
		setPos(setting.address);
		setId(setting.id);
		setLatitude(setting.latitude);
		setLongitude(setting.longitude);

		setModal(true);
	}
	const handleModalClose = () => {
		setModal(false);
	}
	const handleModalSave = () => {
		saveSetting(pos,id,latitude,longitude,name);
		setModal(false);
	}
	const posChangeHandler = (pos: string) => {
		console.log(pos);
		setPos(pos);
		let filterData = settingAddress.filter((padBox : padBoxAddressType)=> padBox.address===pos);
		setLatitude(filterData[0].latitude);
		setLongitude(filterData[0].longitude);
	}

	return (
		<>
			<ScrollView contentContainerStyle={{flexGrow:1}}>
				{
					settingData.map((setting: padBoxType, index: number) => 
						<SettingCard
							key={setting.id}
							index={setting.id}
							name={setting.name}
							address={setting.address}
							padAmount={setting.padAmount}
							humidity={setting.humidity}
							temperature={setting.temperature}
							modalOpen={()=>handleModalOpen(setting)}
						/>
					)
				}
				<Modal
					view={modal}
					onClose={handleModalClose}
					title={<Logotitle icon={<SquareIcon width={30} height={30} fill="black" />} name="개별 생리대함 관리" />}
				>
					<View style={{ width: 270 }}>
						<Text style={MS.title}>이름</Text>
						<TextInput value={name} onChangeText={setName} style={MS.input} />
						<Text style={MS.title}>장소</Text>
						<Picker 
							selectedValue={pos}
							onValueChange={(v, i)=>posChangeHandler(v)}>
							{
								settingAddress.map((padBox : padBoxAddressType, index : number) =>
									<Picker.Item key={index} label={padBox.address} value={padBox.address}/>
								)	
							}
						</Picker>
						<TouchableHighlight
							style={{
								width: "50%",
								left: "25%",
								marginTop: 20
							}}
							underlayColor="transparent"
							onPress={handleModalSave}
						>
							<ButtonComponent color="mint">
								<Text style={MS.btnText}>완료</Text>
							</ButtonComponent>
						</TouchableHighlight>
					</View>
				</Modal>
			</ScrollView>
		</>
	);
}
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
const ModalStyle = StyleSheet.create({
	wrap: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	back: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "black",
		opacity: 0.5,
		zIndex: 11,
	},
	modal: {
		zIndex: 12,
		backgroundColor: "white",
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 1,
		shadowRadius: 4,
		elevation: 6,
		margin: 60
	},
	content: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 20,
	},
})

export default SettingScreen;