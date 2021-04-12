import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';

import { BoxLayout } from '.';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import SettingIcon from '../assets/square.svg';
import { mint, borderColor } from '../StyleVariable';

import { usePadBoxState } from '../Main/Model/PadBoxModel';
import { useDeletePadBox } from '../Main/PadBoxViewModel';

type Props = {
	index: number;
	name: string;
	address: string;
	padAmount: Number;
	humidity: Number;
	temperature: Number;
	modalOpen: any;
}

const SettingCard = ({ name, address, padAmount, humidity, temperature, index, modalOpen }: Props) => {
	const padBox = usePadBoxState();
	const deletePadBox = useDeletePadBox();

	const handleDelete = () => {
		deletePadBox(index);
	}

	return (
		<>
			<BoxLayout>
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
						<Text
							style={{
								color: 'gray',
								width: '100%'
							}}
						>
							{address}
						</Text>
					</View>
					<View
						style={Setting.btnContainer}
					>
						<TouchableHighlight
							onPress={modalOpen}
							style={Setting.editBtn}
						>
							<EditIcon width={20} height={20} fill="black" />
						</TouchableHighlight>
						<TouchableHighlight
							onPress={handleDelete}
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
						<Text>{padAmount}개</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text
							style={Setting.humidity}>온습도</Text>
						<Text>{temperature}℃ / {humidity}%</Text>
					</View>
				</View>
			</BoxLayout>
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

export default SettingCard;