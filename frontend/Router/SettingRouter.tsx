import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SettingScreen } from '../Screen';

const Stack = createStackNavigator();

const SettingRouter = () => {
	return (
		<Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
			<Stack.Screen name="Setting" component={SettingScreen} options={{ title: "Setting", headerLeft: null }} />
		</Stack.Navigator>
	);
}

export default SettingRouter;