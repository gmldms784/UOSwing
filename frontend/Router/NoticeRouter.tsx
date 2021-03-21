import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { Alert, Text, TouchableHighlight } from 'react-native';

import { NoticeScreen, NoticeEditScreen } from '../Screen';
import { Logotitle } from '../Component';
import NoticeIcon from '../assets/information.svg';

const Stack = createStackNavigator();

type Props = {
	navigation: StackNavigationProp<NoticeStackParamList, 'Notice'>;
	route: RouteProp<NoticeStackParamList, 'Notice'>;
}

export type NoticeStackParamList = {
	Notice: undefined,
	NoticeEdit: {
		title: string;
		contents: string;
	}
};

const NoticeRouter = ({ navigation }: Props) => {
	const saveNotice = () => {
		Alert.alert("Save Notice");
	}

	return (
		<Stack.Navigator screenOptions={{
			headerTitleAlign: 'center',
			headerTitle: props => <Logotitle {...props} icon={<NoticeIcon width={30} height={30} fill="black" />} name="공지사항" />
		}}>
			<Stack.Screen name="Notice" component={NoticeScreen}
				options={{
					headerRight: () => (
						<TouchableHighlight
							onPress={() => navigation.push("NoticeEdit", {
								title: "",
								contents: ""
							})}
							style={{
								backgroundColor: '#8bc6c7',
								borderRadius: 100,
								height: 40,
								width: 40,
								alignItems: 'center',
								justifyContent: 'center',
								marginRight: 10
							}}
						>
							<Text
								style={{
									fontSize: 20,
									color: 'white'
								}}
							>+</Text>
						</TouchableHighlight>
					),
					headerLeft: null
				}}
			/>
			<Stack.Screen name="NoticeEdit" component={NoticeEditScreen}
				options={{
					headerRight: () => (
						<TouchableHighlight
							onPress={saveNotice}
							style={{
								backgroundColor: '#8bc6c7',
								height: 40,
								alignItems: 'center',
								justifyContent: 'center',
								marginRight: 10,
								padding: 10
							}}
						>
							<Text
								style={{
									fontSize: 16,
									color: 'white'
								}}
							>저장</Text>
						</TouchableHighlight>
					)
				}}
			/>
		</Stack.Navigator>
	);
}

export default NoticeRouter;