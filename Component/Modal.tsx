import React from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import { borderColor } from '../StyleVariable';

type Props = {
	view : boolean
	onClose: () => void
	title: string
}

const Modal : React.FC<Props> = ({children, view, onClose, title}) => {
	if(!view)
		return null;
	return (
		<View style={ModalStyle.wrap}>
			<View style={ModalStyle.back}></View>
			<View style={ModalStyle.modal}>
				<View style={ModalStyle.header}>
					<Text style={ModalStyle.title}>{title}</Text>
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
				{children}
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
	},
	header : {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center",
	},
	title : {
		fontSize: 16,
		fontFamily: 'DOHYEON',
	},
	xbtn : {
		marginLeft: 15,
		marginRight: 5,
	}
})

export default Modal;