import React from 'react';

import {
	View,
	Text,
	Button
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
			<Button
				title="서비스 바로가기"
				onPress={() => {
					navigation.navigate('Home');
				}}
			/>
		</View>
	)
};

export default IntroScreen;