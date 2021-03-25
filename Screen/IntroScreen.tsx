import React from 'react';

import {
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

const IntroScreen = ({navigation} : Props) => {
	return(
		<View style={{
			flexDirection:"column",
			alignItems:"center",
			justifyContent:"center",
			height:"100%"
		}}>
			<Text style={{
				marginBottom:16,
				fontSize:16
			}}>
				날개를 달자.
			</Text>
			<TouchableHighlight
				onPress={() => {
					navigation.navigate('User');
				}}
				style={{ marginBottom:16,}}
			>
				<View style={{
					padding: 10
				}}>
					<Text>시작하기</Text>
				</View>
			</TouchableHighlight>
			<TouchableHighlight
				onPress={()=>{
					navigation.navigate('Home');
				}}
			>
				<View style={{
					alignItems: "center",
					backgroundColor: "#8bc6c7",
					padding: 10,
					borderRadius: 20
				}}>
					<Text>관리자용</Text>
				</View>
			</TouchableHighlight>
		</View>
	)
};

export default IntroScreen;