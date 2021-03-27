import React from 'react';

import {
	StyleSheet,
	View,
	Text,
	Image,
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
				<Image
					style={Intro.Logo}
					source={require('../assets/img/logo.png')}
				/>
				<Text style={Intro.title}>
					날개를 달다
				</Text>
				<Text style={Intro.subTitle}>
					서울시립대 양심생리대함 앱
				</Text>
				<TouchableHighlight
					onPress={() => {
						navigation.navigate('User');
					}}
					style={{ marginBottom: 16, zIndex: 2 }}
				>
					<View style={Intro.startBtn}>
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
		height: "45%",
		position: "absolute",
		top: "30%",
		zIndex: 1,
		transform: [
			{ rotateZ: '-11deg'},
	  	]
	},
	Logo: {
		width: 100,
		height: 100,
		zIndex: 2,
		marginBottom: 10
	},
	title: {
		marginBottom: 8,
		fontSize: 50,
		zIndex: 2,
		fontFamily: 'DOHYEON'
	},
	subTitle: {
		zIndex: 2,
		fontSize: 16,
		marginBottom: 20
	},
	startBtn: {
		backgroundColor: "white",
		padding: 10,
		paddingRight: 40,
		paddingLeft: 40,
		borderRadius: 20
	},
	adminBtn: {
		alignItems: "center",
		backgroundColor: "#8bc6c7",
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		borderRadius: 20,
		marginBottom: 45
	}
})

export default IntroScreen;