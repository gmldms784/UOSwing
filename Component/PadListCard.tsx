import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	Alert,
	TouchableHighlight
} from 'react-native';

import { BoxLayout } from '.';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import { mint, borderColor } from '../CommonVariable';
import SettingIcon from '../assets/square.svg';

import { useDeletePadBox } from '../Main/ViewModel/PadBoxViewModel';
import ButtonComponent from './ButtonComponent';
import { useUserState } from '../Main/Model/UserModel';

type Props = {
	index: number;
	name: string;
	address: string;
	padAmount: Number;
	humidity: Number;
	temperature: Number;
	modalOpen: any;
	compareAddress: string;
}

const PadListCard = ({ name, address, padAmount, humidity, temperature, index, modalOpen, compareAddress }: Props) => {
	const user=useUserState();
	return (
		<>
		{
			address===compareAddress &&
			<BoxLayout>
				<TouchableHighlight
					onPress={modalOpen}
					underlayColor="transparent"
				>
					<>
					<View
					style={Setting.wrap}
					>
						<View
							style={Setting.header}
						>
							<View style={{ flexDirection: 'row' }}>
								<SettingIcon width={30} height={30} fill="black" />
								<Text
									style={Setting.title}
								>{name}</Text>
							</View>
						</View>
					</View>
					<View>
						<View style={{ flexDirection: 'row' }}>
							<Text
								style={Setting.quantity}>잔량</Text>
							<Text>{padAmount}개</Text>
						</View>
						{
							user.auth === "admin" &&
							<View style={{ flexDirection: 'row' }}>
								<Text
									style={Setting.humidity}>온습도</Text>
								<Text>{temperature}℃ / {humidity}%</Text>
							</View>
						}
					</View>
					</>
				</TouchableHighlight>
			</BoxLayout>
		}
		</>
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
	titleContainer: {
		flexDirection: 'row',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		width: '100%',
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

export default PadListCard;