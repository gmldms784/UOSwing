import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IntroScreen } from './Screen';
import { HomeRouter } from './Router';

export type StackParamList = {
  Intro: undefined;
  Home: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={HomeRouter} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
};

export default App;
