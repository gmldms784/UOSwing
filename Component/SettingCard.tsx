import React, { useState } from 'react';

import {
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { BoxLayout } from '.';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import SettingIcon from '../assets/squares.svg';

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

const SettingCard = ({ navigation, title, position, quantity, humidity, index, deleteSetting } : Props) => {

	return(
		<BoxLayout>
			<View
				style={{
					display: 'flex',
					flexWrap: 'nowrap',
					flexDirection: 'row',
					justifyContent: 'space-between'
				}}
			>
				<View
					style={{
						flexWrap: 'wrap',
						justifyContent: 'flex-start',
						width: '75%',
						marginBottom: 10
					}}
				>
					<View style={{ flexDirection: 'row' }}>
						<SettingIcon width={20} height={20} fill="black" />
						<Text
							style={{
								fontSize: 20,
								fontWeight: 'bold',
								width: '100%',
								marginLeft: 10,
								marginBottom: 10
							}}
						>{title}</Text>
					</View>
					<Text
						style={{
							color: 'gray',
							width: '100%'
						}}
					> 
						{position}
					</Text>
				</View>
				<View
					style={{
						width: '20%',
						flexDirection: 'row',
						alignItems: 'flex-start'
					}}
				>
					<TouchableHighlight
						onPress={() => navigation.navigate('SettingCreate', {
							title: title,
						})}
						style={{
							padding: 6,
							borderWidth: 1,
							borderStyle: 'solid',
							borderColor: '#adadad',
							borderRadius: 6
						}}
					>
						<EditIcon width={20} height={20} fill="black" />
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => deleteSetting(index)}
						style={{
							padding: 6,
							borderWidth: 1,
							borderStyle: 'solid',
							borderColor: '#adadad',
							borderRadius: 6,
							marginLeft: 6
						}}
					>
						<DeleteIcon width={20} height={20} fill="black" />
					</TouchableHighlight>
				</View>
			</View>
			<View>
				<View style={{ flexDirection: 'row' }}>
					<Text
						style={{
							marginBottom: 10,
							paddingLeft: 7,
							borderLeftWidth: 2,
							borderLeftColor: 'black'
							}}>잔량</Text>
					<Text>{quantity}</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Text
						style={{
							marginBottom: 10,
							paddingLeft: 7,
							borderLeftWidth: 2,
							borderLeftColor: 'black'
							}}>온습도</Text>
					<Text>{humidity}</Text>
				</View>
			</View>
		</BoxLayout>
	);
}

export default SettingCard;