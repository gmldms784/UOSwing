import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	Alert,
	TouchableHighlight
} from 'react-native';

import { BoxLayout } from '.';
import { alert, borderColor } from '../CommonVariable';
import SettingIcon from '../assets/square.svg';

import { useUserState } from '../Main/Model/UserModel';

import { getPadNumber } from '../Function/GetPadNumber';

type Props = {
	index: number;
	name: string;
	address: string;
	padAmount: Number;
	humidity: Number;
	temperature: Number;
	isReported: boolean;
	modalOpen: () => void;
}

// 생리대 함 카드 컴포넌트
const PadListCard = ({ name, address, padAmount, humidity, temperature, isReported, index, modalOpen}: Props) => {
	const user=useUserState();
	return (
		<BoxLayout>
			<TouchableHighlight
				onPress={modalOpen}
				underlayColor="transparent"
				style={{width: "100%"}}
			>
				<>
					<View
						style={Setting.header}
					>
						<View style={{flexDirection: 'row'}}>
							<SettingIcon width={30} height={30} fill="black" />
							<Text
								style={Setting.title}
							>{name}</Text>
						</View>
						{
							user.auth==="admin" && isReported?
							<View style={Setting.alert}>
								<Text style={Setting.alertText}>!</Text>
							</View>:null
						}
					</View>
					<View>
						<View style={{ flexDirection: 'row' }}>
							<Text
								style={Setting.quantity}>잔량</Text>
							<Text>{getPadNumber(padAmount)}</Text>
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
	);
}

const Setting = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10
	},
	titleContainer: {
		flexDirection: 'row',
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
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
	},
	reported: {
		borderColor : 'red'
	},
	alert: {
		width: 25,
		height: 25,
		backgroundColor: alert,
		borderRadius: 100,
		alignItems: "center",
		justifyContent: "center"
	},
	alertText: {
		textAlign: "center",
		color: "white",
		fontWeight: "bold"
	},
})

export default PadListCard;