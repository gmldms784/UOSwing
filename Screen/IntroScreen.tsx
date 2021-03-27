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
import LinearGradient from 'react-native-linear-gradient';

import { StackParamList } from '../App';
import { mint, purple } from '../StyleVariable';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
	navigation: StackNavigationProp<StackParamList, 'Home'>;
	route: RouteProp<StackParamList, 'Home'>;
}

const IntroScreen = ({ navigation }: Props) => {
	return (
		<View style={Intro.wrap}>
			<LinearGradient colors={[mint, purple]} style={Intro.gradient}>
				<Text style={Intro.title}>
					날개를 달자.
				</Text>
				<TouchableHighlight
					onPress={() => {
						navigation.navigate('User');
					}}
					style={{ marginBottom: 16, zIndex: 2 }}
				>
					<View style={{ padding: 10 }}>
						<Text>시작하기</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={() => {
						navigation.navigate('Home');
					}}
					style={{zIndex: 2}}
				>
					<View style={Intro.adminBtn}>
						<Text>관리자용</Text>
					</View>
				</TouchableHighlight>
				<View opacity={0.5} style={Intro.whiteSpace} />
			</LinearGradient>
		</View>
	)
};

const Intro = StyleSheet.create({
	wrap: {
		height: "100%",
		width: "100%"
	},
	gradient: {
		height: "100%",
		width: "100%",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		zIndex: 0
	},
	whiteSpace: {
		backgroundColor: "white",
		width: "120%",
		height: "40%",
		position: "absolute",
		top: "30%",
		zIndex: 1,
		transform: [
			{ rotateZ: '-11deg'},
	  	]
	},
	title: {
		marginBottom: 16,
		fontSize: 32,
		zIndex: 2
	},
	adminBtn: {
		alignItems: "center",
		backgroundColor: "#8bc6c7",
		padding: 10,
		borderRadius: 20
	}
})

export default IntroScreen;