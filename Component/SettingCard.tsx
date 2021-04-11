import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { BoxLayout } from '.';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import SettingIcon from '../assets/squares.svg';
import { mint, borderColor } from '../CommonVariable';

import { SettingStackParamList } from '../Router/SettingRouter';

type Props = {
	navigation: StackNavigationProp<SettingStackParamList, 'SettingCreate'>;
	index: number;
	title: string;
	position: string;
	quantity: string;
	humidity: string;
	deleteSetting: (index: number) => void;
}

const SettingCard = ({ navigation, title, position, quantity, humidity, index, deleteSetting }: Props) => {

	return (
		<BoxLayout>
			<View
				style={Setting.wrap}
			>
				<View
					style={Setting.header}
				>
					<View style={{ flexDirection: 'row' }}>
						<SettingIcon width={20} height={20} fill="black" />
						<Text
							style={Setting.title}
						>{title}</Text>
					</View>
					<Text
						style={{
							color: 'gray',
							width: '100%'
						}}
					>
						{position}
						{
							// 이부분 position이 아니라 name 같은 이름으로 지어야할 것 같아요 :) 사용자가 지정한 이름이 들어가니까..!
						}
					</Text>
				</View>
				<View
					style={Setting.btnContainer}
				>
					<TouchableHighlight
						onPress={() => navigation.navigate('SettingCreate', {
							title: title,
						})}
						style={Setting.editBtn}
					>
						<EditIcon width={20} height={20} fill="black" />
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => deleteSetting(index)}
						style={Setting.deleteBtn}
					>
						<DeleteIcon width={20} height={20} fill="black" />
					</TouchableHighlight>
				</View>
			</View>
			<View>
				<View style={{ flexDirection: 'row' }}>
					<Text
						style={Setting.quantity}>잔량</Text>
					<Text>{quantity}</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Text
						style={Setting.humidity}>온습도</Text>
					<Text>{humidity}</Text>
				</View>
			</View>
		</BoxLayout>
	);
}

const Setting = StyleSheet.create({
	wrap: {
		display: 'flex',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	header: {
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		width: '75%',
		marginBottom: 10
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		width: '100%',
		marginLeft: 10,
		marginBottom: 10
	},
	btnContainer: {
		width: '20%',
		flexDirection: 'row',
		alignItems: 'flex-start'
	},
	editBtn: {
		padding: 6,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: borderColor,
		borderRadius: 6
	},
	deleteBtn: {
		padding: 6,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: borderColor,
		borderRadius: 6,
		marginLeft: 6
	},
	quantity: {
		marginBottom: 10,
		paddingLeft: 7,
		borderLeftWidth: 2,
		borderLeftColor: 'black'
	},
	humidity: {
		marginBottom: 10,
		paddingLeft: 7,
		borderLeftWidth: 2,
		borderLeftColor: 'black'
	}
})

export default SettingCard;