import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SettingStackParamList } from '../Router/SettingRouter';

type Props = {
	route: RouteProp<SettingStackParamList, 'SettingCreate'>;
}

const SettingCreateScreen = ({route} : Props) => {
	return (
		<View>
			<Text>SettingCreateScreen</Text>
		</View>
	);
}

export default SettingCreateScreen;