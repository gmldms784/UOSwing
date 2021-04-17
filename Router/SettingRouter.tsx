import React, { useState } from 'react';

import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableHighlight,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { usePadBoxAddress } from '../Main/Model/PadBoxModel'
import { padBoxAddressType } from '../Main/Type';
import {  Logotitle, Modal, ButtonComponent } from '../Component';
import { SettingScreen } from '../Screen';
import { mint } from '../CommonVariable';
import SquaresIcon from '../assets/squares.svg';
import SquareIcon from '../assets/square.svg';
import { useSavePadBox } from '../Main/ViewModel/PadBoxViewModel';

const Stack = createStackNavigator();

type Props = {
	navigation: StackNavigationProp<SettingStackParamList, 'Setting'>;
	route: RouteProp<SettingStackParamList, 'Setting'>;
}

export type SettingStackParamList = {
	Setting: undefined,
	SettingCreate: {
		title: string;
	}
};

const SettingRouter = ( { navigation }: Props) => {
	const settingAddress = usePadBoxAddress();
	const saveSetting = useSavePadBox();

	const [modal, setModal] = useState<boolean>(false);

	// <-- 넘겨줄 데이터(주소, id, 위도, 경도, 이름)
	const [name, setName] = useState<string>("");
	const [pos, setPos] = useState<string>(""); // 주소(address)
	const [latitude, setLatitude] = useState<number>(0);
	const [longitude, setLongitude] = useState<number>(0);
	// -->

	const handleModalOpen = () => {
		setModal(true);
	}
	const handleModalClose = () => {
		saveSetting(pos,-1,latitude,longitude,name);
		setModal(false);
	}
	const posChangeHandler = (pos: string) => {
		setPos(pos);
		let filterData = settingAddress.filter((padBox : padBoxAddressType)=> padBox.address==pos);
		setLatitude(filterData[0].latitude);
		setLongitude(filterData[0].longitude);
	}
	return (
		<>
			<Stack.Navigator screenOptions={{
				headerTitleAlign: 'center',
				headerTitle: props => <Logotitle {...props} icon={<SquaresIcon width={30} height={30} fill="black" />}
				name="생리대함 관리" />
			}}>
				<Stack.Screen name="Setting" component={SettingScreen}
					options={{
						headerRight: () => (
							<TouchableHighlight
								onPress={handleModalOpen}
								style={Setting.addBtn}
							>
								<Text style={{ fontSize: 20, color: 'white' }}>+</Text>
							</TouchableHighlight>
						),
						headerLeft: null
					}} />
			</Stack.Navigator>
			<Modal
				view={modal}
				onClose={handleModalClose}
				title={<Logotitle icon={<SquareIcon width={30} height={30} fill="black" />} name="생리대함 생성" />}
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
									<Picker.Item key={index} label={padBox.address} value={padBox.address} />
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
						onPress={handleModalClose}
					>
						<ButtonComponent color="mint">
							<Text style={MS.btnText}>완료</Text>
						</ButtonComponent>
					</TouchableHighlight>
				</View>
			</Modal>
		</>
	);
}

const Setting = StyleSheet.create({
	addBtn: {
		backgroundColor: mint,
		borderRadius: 100,
		height: 40,
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10
	},
	saveBtn: {
		backgroundColor: mint,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
		padding: 10
	},
})

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

export default SettingRouter;