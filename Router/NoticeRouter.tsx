import React from 'react';

import { RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Alert, Text, TouchableHighlight } from 'react-native';

import { NoticeScreen, NoticeEditScreen } from '../Screen';
import { Logotitle } from '../Component';
import NoticeIcon from '../assets/information.svg';
import { mint } from '../CommonVariable';

const Stack = createStackNavigator();

type Props = {
	navigation: StackNavigationProp<NoticeStackParamList, 'Notice'>;
	route: RouteProp<NoticeStackParamList, 'Notice'>;
}

export type NoticeStackParamList = {
	Notice: undefined,
	NoticeEdit: {
		id: number;
		title: string;
		contents: string;
	}
};

const NoticeRouter = ({ navigation }: Props) => {
	const a = 1;
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
								id: -1,
								title: "",
								contents: ""
							})}
							underlayColor={mint}
							style={Notice.addBtn}
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
			<Stack.Screen name="NoticeEdit" component={NoticeEditScreen}/>
		</Stack.Navigator>
	);
}

const Notice = StyleSheet.create({
	addBtn : {
		backgroundColor: mint,
		borderRadius: 100,
		height: 40,
		width: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10
	}, 
	saveBtn: {
		backgroundColor: mint,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
		padding: 10
	}
})

export default NoticeRouter;