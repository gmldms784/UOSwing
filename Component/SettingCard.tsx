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
import { getPadNumber } from '../Function/GetPadNumber';

type Props = {
	index: number;
	name: string;
	address: string;
	padAmount: Number;
	humidity: Number;
	temperature: Number;
	modalOpen: any;
}

// 생리대함 설정 페이지의 카드 컴포넌트 
const SettingCard = ({ name, address, padAmount, humidity, temperature, index, modalOpen }: Props) => {
	const deletePadBox = useDeletePadBox();

	const handleDelete = () => {
		// 생리대함 삭제
		Alert.alert(
			"생리대함 삭제",
			"정말 삭제하시겠습니까?\n해당 작업은 되돌릴 수 없습니다.",
			[
				{
					text: "네",
					onPress: () => deletePadBox(index)
				},
				{
					text: "아니요",
					style: "cancel"
				}
			],
			{ cancelable: false }
		);
	};

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
							underlayColor="transparent"
						>
							<EditIcon width={20} height={20} fill="black" />
						</TouchableHighlight>
						<TouchableHighlight
							onPress={handleDelete}
							style={Setting.deleteBtn}
							underlayColor="transparent"
						>
							<DeleteIcon width={20} height={20} fill="black" />
						</TouchableHighlight>
					</View>
				</View>
				<View>
					<View style={{ flexDirection: 'row' }}>
						<Text
							style={Setting.quantity}>잔량</Text>
						<Text>{getPadNumber(padAmount)}</Text>
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
		width: '100%',
		display: 'flex',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	header: {
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		width: '100%',
		flexShrink: 1,
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
		flexShrink: 0,
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