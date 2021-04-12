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

import {  Logotitle, Modal, ButtonComponent } from '../Component';
import { SettingScreen } from '../Screen';
import SettingIcon from '../assets/squares.svg';
import SquareIcon from '../assets/square.svg';
import { mint } from '../StyleVariable'; 

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
	const [modal, setModal] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [pos, setPos] = useState<string>("");

	const handleModalOpen = () => {
		setModal(true);
	}
	const handleModalClose = () => {
		setModal(false);
	}
	return (
		<>
			<Stack.Navigator screenOptions={{
				headerTitleAlign: 'center',
				headerTitle: props => <Logotitle {...props} icon={<SettingIcon width={30} height={30} fill="black" />}
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
					<TextInput value={pos} onChangeText={setPos} style={MS.input} />
					<TouchableHighlight
						// !키보드가 올라오면 버튼이 자리를 벗어남 해결필요!
						style={{
							width: "50%",
							left: "25%",
							marginTop: 20
						}}
						underlayColor="transparent"
						onPress={handleModalClose} // todo
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