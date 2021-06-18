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

// 최상위 라우팅
// 1. Intro 페이지 2. 유저 페이지 3. 관리자 페이지
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
