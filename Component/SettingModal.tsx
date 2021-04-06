import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableHighlight,
} from 'react-native';

import { ButtonComponent } from '../Component';

type Props = {
	view : boolean
	onClose: () => void
	icon: React.ReactNode
	title: string,
	initialName: string
	initialPos: string
}

const SettingModal : React.FC<Props> = ({view, onClose, icon, title, initialName, initialPos}) => {
	const [name, setName] = useState<string>(initialName);
	const [pos, setPos] = useState<string>(initialPos);
	if(!view)
		return null;
	return (
		<View style={ModalStyle.wrap}>
			<View style={ModalStyle.back}></View>
			<View style={ModalStyle.modal}>
				<View style={ModalStyle.header}>
					<View style={{ flexDirection: 'row'}}>
						<Text>{icon}</Text>
						<Text style={ModalStyle.title}>{title}</Text>
					</View>
					<TouchableHighlight
						style={ModalStyle.xbtn}
						onPress={onClose}
						underlayColor="transparent"
					>
						<Text style={{
							fontSize: 18
						}}>X</Text>
					</TouchableHighlight>
				</View>
				<View>
				{/* modal 크기를 어떻게 늘려야할지 몰라서 이렇게해둠.. */}
					<View style={{ width: 270 }}> 
						<Text style={ModalStyle.modalTitle}>이름</Text>
						<TextInput value={name} onChangeText={setName} style={ModalStyle.textInput} />
						<Text style={ModalStyle.modalTitle}>장소</Text>
						<TextInput value={pos} onChangeText={setPos} style={ModalStyle.textInput} />
						<TouchableHighlight
							style={ModalStyle.th}
							underlayColor="transparent"
							onPress={onClose} // todo
						>
							<ButtonComponent color="mint">
								<Text style={ModalStyle.thText}>완료</Text>
							</ButtonComponent>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		</View>
	);
};

const ModalStyle = StyleSheet.create({
	wrap: {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center"
	},
	back: {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "black",
		opacity: 0.5,
		zIndex: 11,
	},
	modal : {
		zIndex: 12,
		backgroundColor: "white",
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 1,
		shadowRadius: 4,
		elevation: 6,
		maxWidth: "80%",
		maxHeight: "80%"
	},
	header : {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "flex-start",
		height: 40
	},
	title : {
		fontSize: 20,
		fontWeight: '600',
		fontFamily: 'DOHYEON',
		flexDirection: "row",
		marginLeft: 5,
	},
	xbtn : {
		marginLeft: 15,
		marginRight: 5,
	},
	modalTitle: {
		paddingLeft: 10,
		marginTop: 25,
		borderLeftColor: 'black',
		borderLeftWidth: 3,
		fontSize: 16,
		fontWeight: '600',
		fontFamily: 'DOHYEON',
	},
	textInput: {
		marginTop: 10,
		padding: 5,
		borderWidth: 1,
		borderRadius: 7,
	},
	th: {
		marginTop: 30,
		marginHorizontal: 60,
	},
	thText: {
		fontSize: 15,
		fontFamily: 'DOHYEON',
		marginVertical: 7,
	}
})

export default SettingModal;