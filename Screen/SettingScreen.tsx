import React, { useState } from 'react';
import {
  ScrollView,
  Text
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { settingType } from '../Type';
import { SettingCard } from '../Component';
import { SettingStackParamList } from '../Router/SettingRouter';

type Props = {
	navigation: StackNavigationProp<SettingStackParamList, 'SettingCreate'>;
}

const SettingScreen = ({ navigation } : Props) => {
	const [settingData, setSettingData] = useState<Array<settingType>>([
		{
			id: 1,
			title: "미래관 1층",
			position: "서울특별시 동대문구 서울시립대로 163",
			quantity: "8~10개",
			humidity: "28.2도 / 68%"
		}
	]);
	const deleteSetting = (index : number) => {
		let tmp : Array<settingType> = settingData.slice(index, 1);
		setSettingData(tmp);
	}
	return (
		<ScrollView>
			{
				settingData.map((setting: settingType, index: number) => 
					<SettingCard
						key={setting.id}
						index={index}
						navigation={navigation}
						title={setting.title}
						position={setting.position}
						quantity={setting.quantity}
						humidity={setting.humidity}
						deleteSetting={deleteSetting}
					/>
				)
			}
		</ScrollView>
	);
}

export default SettingScreen;