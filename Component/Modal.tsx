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
	title: string
}

const Modal : React.FC<Props> = ({children, view, onClose, title}) => {
	if(!view)
		return null;
	return (
		<View style={ModalStyle.wrap}>
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
	);
};

const ModalStyle = StyleSheet.create({
	wrap : {
		position: "absolute",
		top: "30%",
		zIndex: 10,
		backgroundColor: "white",
		padding: 20
	},
	header : {
		display: "flex",
		justifyContent: "space-between",
		flexDirection: "row",
		alignItems: "center"
	},
	title : {
		fontSize: 16,
		fontFamily: 'DOHYEON'
	},
	xbtn : {
		marginLeft: 15,
		marginRight: 5
	}
})

export default Modal;