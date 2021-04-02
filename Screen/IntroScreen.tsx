import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
	TextInput,
	Button,
	Alert
} from 'react-native';

import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import { Modal } from '../Component';
import { StackParamList } from '../Router/MainRouter';
import { mint, purple } from '../StyleVariable';
import { useLogin } from '../Main/Model/UserModel';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
	navigation: StackNavigationProp<StackParamList, 'Home'>;
	route: RouteProp<StackParamList, 'Home'>;
}

const IntroScreen = ({ navigation }: Props) => {
	const [modal, setModal] = useState<boolean>(false);
	const [key, setKey] = useState<string>("");
	const login = useLogin();

	const handleModalOpen = () => {
		setModal(true);
	}
	const handleModalClose = () => {
		setModal(false);
	}

	const loginAdmin = () => {
		if(login(key)){
			navigation.navigate("Home");
		}else{
			Alert.alert("key를 잘못 입력하셨습니다.");
		}
	}

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
					underlayColor="transparent"
					style={{ marginBottom: 16, zIndex: 2 }}
				>
					<View style={Intro.startBtn}>
						<Text>시작하기</Text>
					</View>
				</TouchableHighlight>
				<TouchableHighlight
					onPress={handleModalOpen}
					underlayColor="transparent"
					style={{ zIndex: 2 }}
				>
					<View style={Intro.adminBtn}>
						<Text>관리자용</Text>
					</View>
				</TouchableHighlight>
				<View opacity={0.5} style={Intro.whiteSpace} />
				<Modal
					view={modal}
					onClose={handleModalClose}
					title="관리자 키를 입력해주세요."
				>
					<TextInput value={key} onChangeText={setKey} placeholder="관리자 키"/>
					<Button
						title="로그인"
						onPress={loginAdmin}
					/>
				</Modal>
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
			{ rotateZ: '-11deg' },
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
		backgroundColor: mint,
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		borderRadius: 20,
		marginBottom: 45
	}
})

export default IntroScreen;