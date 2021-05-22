import React from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';

type Props = {
	view : boolean
	onClose: () => void
	title: React.ReactNode
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
							fontSize: 20
						}}>X</Text>
					</TouchableHighlight>
				</View>
				<View>
				{children}
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
		width : '80%',
		overflow:"hidden"
	},
	header : {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "flex-start",
		height: 25
	},
	title : {
		fontSize: 16,
		fontFamily: 'DOHYEON',
		flexDirection: "row"
	},
	xbtn : {
		marginTop : -3,
		marginRight: 5,
	}
})

export default Modal;