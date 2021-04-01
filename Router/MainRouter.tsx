import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IntroScreen, UserScreen } from '../Screen';
import { HomeRouter } from '.';

export type StackParamList = {
  Intro: undefined;
  User: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="User" component={UserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeRouter} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default Main;
