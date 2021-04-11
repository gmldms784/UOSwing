import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Alert, Text, TouchableHighlight } from 'react-native';

import { Logotitle } from '../Component';
import { SettingScreen, SettingCreateScreen } from '../Screen';
import SettingIcon from '../assets/squares.svg';
import { mint } from '../CommonVariable';

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
	const saveSetting = () => {
		Alert.alert("Save Setting");
	}
	return (
		<Stack.Navigator screenOptions={{
			headerTitleAlign: 'center',
			headerTitle: props => <Logotitle {...props} icon={<SettingIcon width={30} height={30} fill="black" />}
			name="생리대함 관리" />
		}}>
			<Stack.Screen name="Setting" component={SettingScreen}
				options={{
					headerRight: () => (
						<TouchableHighlight
							onPress={()=> navigation.push("SettingCreate", {
								title: "",
							})}
							style={Setting.addBtn}
						>
							<Text style={{ fontSize: 20, color: 'white' }}>+</Text>
						</TouchableHighlight>
					),
					headerLeft: null
				}} />
			<Stack.Screen
				name="SettingCreate"
				component={SettingCreateScreen}
				options={{
					headerRight: () => (
						<TouchableHighlight
							onPress={saveSetting}
							style={Setting.saveBtn}
						>
							<Text style={{ fontSize: 16, color: 'white'}}>저장</Text>
						</TouchableHighlight>
					)
				}}
			/>
		</Stack.Navigator>
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
	}
})

export default SettingRouter;