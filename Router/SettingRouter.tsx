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

import {  Logotitle, SettingModal } from '../Component';
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
			<SettingModal
			view={modal}
			onClose={handleModalClose}
			icon={<SquareIcon width={30} height={30} fill="black" />}
			title="생리대함 생성"
			initialName=""
			initialPos=""
			/>
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

export default SettingRouter;