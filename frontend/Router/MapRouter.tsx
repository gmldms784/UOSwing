import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MapScreen } from '../Screen';

const Stack = createStackNavigator();

const MapRouter = () => {
	return (
		<Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
			<Stack.Screen name="Map" component={MapScreen} options={{ title: "Map", headerLeft: null }} />
		</Stack.Navigator>
	);
}

export default MapRouter;