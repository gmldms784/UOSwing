import React from 'react';

import {
	StyleSheet,
	View,
	Text,
	Button,
	TouchableHighlight
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../App';

type Props = {
	navigation: StackNavigationProp<StackParamList, 'Home'>;
	route: RouteProp<StackParamList, 'Home'>;
}

const IntroScreen = ({ navigation }: Props) => {
	return (
		<View style={Intro.wrap}>
			<Text style={Intro.title}>
				날개를 달자.
			</Text>
			<TouchableHighlight
				onPress={() => {
					navigation.navigate('User');
				}}
				style={{ marginBottom: 16 }}
			>
				<View style={{ padding: 10 }}>
					<Text>시작하기</Text>
				</View>
			</TouchableHighlight>
			<TouchableHighlight
				onPress={() => {
					navigation.navigate('Home');
				}}
			>
				<View style={Intro.adminBtn}>
					<Text>관리자용</Text>
				</View>
			</TouchableHighlight>
		</View>
	)
};

const Intro = StyleSheet.create({
	wrap: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100%"
	},
	title: {
		marginBottom: 16,
		fontSize: 16
	},
	adminBtn: {
		alignItems: "center",
		backgroundColor: "#8bc6c7",
		padding: 10,
		borderRadius: 20
	}
})

export default IntroScreen;