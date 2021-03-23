import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatisticsScreen } from '../Screen';

const Stack = createStackNavigator();

const StatisticsRouter = () => {
	return (
		<Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
			<Stack.Screen name="Statistics" component={StatisticsScreen} options={{ title: "Statistics", headerLeft: null }} />
		</Stack.Navigator>
	);
}

export default StatisticsRouter;