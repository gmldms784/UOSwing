import React, { ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { NoticeRouter, MapRouter, StatisticsRouter, SettingRouter } from '.';

import NoticeIcon from '../assets/information.svg';
import MapIcon from '../assets/maps-and-flags.svg';
import StatisticsIcon from '../assets/bar-chart.svg';
import SettingIcon from '../assets/squares.svg';

export type HomeStackParamList = {
  Notice: undefined,
  Map: undefined,
  Statistics: undefined,
  setting: undefined
};

const Tab = createBottomTabNavigator();

// 관리자 페이지 라우팅
// 1. 맵 페이지 2. 통계 페이지 3. 공지사항 페이지 4. 관리 페이지
const HomeScreen = () => {
	const icons : { [key: string] : ReactNode } = {
		"Map" : <MapIcon />,
		"Statistics" : <StatisticsIcon />
	}

	return (
		<Tab.Navigator>
			<Tab.Screen name="Map" component={MapRouter}
				options={{
					tabBarIcon: () => <MapIcon width={30} height={30} fill="black"/>
				}}
			/>
			<Tab.Screen name="Statistics" component={StatisticsRouter}
				options={{
					tabBarIcon: () => <StatisticsIcon width={30} height={30} fill="black"/>
				}}	
			/>
			<Tab.Screen name="Notice" component={NoticeRouter}
				options={{
					tabBarIcon: () => <NoticeIcon width={30} height={30} fill="black"/>
				}}	
			/>
			<Tab.Screen name="Setting" component={SettingRouter}
				options={{
					tabBarIcon: () => <SettingIcon width={30} height={30} fill="black"/>
				}}
			/>
		</Tab.Navigator>
	);
}

export default HomeScreen;