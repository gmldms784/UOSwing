import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatisticsScreen } from '../Screen';
import { Logotitle } from '../Component';
import StatisticsIcon from '../assets/bar-chart.svg';

const Stack = createStackNavigator();

const StatisticsRouter = () => {
	return (
		<Stack.Navigator screenOptions={{
			headerTitleAlign: 'center',
			headerTitle: props => <Logotitle {...props} icon={<StatisticsIcon width={30} height={30} fill="black" />} name="통계" />
		}}>
			<Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: "Statistics", headerLeft: null }} />
		</Stack.Navigator>
	);
}

export default StatisticsRouter;