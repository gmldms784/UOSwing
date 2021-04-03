import React from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';

import { mint, purple } from '../StyleVariable';

type sizeArr = ["default", "fit"];

type Props = {
	color?: string
	size?: sizeArr[number]
}

// how to use?
// <TouchableHighlight>
// 	 <ButtonComponent color="mint" size="lg">
//     <Text>hi</Text>
//   </ButtonComponent>
// </TouchableHighlight>

const ButtonComponent : React.FC<Props> = ({color, size, children}) => {
	let style = [];
	switch(color){
		case "mint":
			style.push(ButtonStyle.mint);
			break;
		case "white":
			style.push(ButtonStyle.white);
			break;
		default :
			style.push(ButtonStyle.white);
	}
	switch(size){
		case "fit":
			style.push(ButtonStyle.fit);
			break;
		default:
	}
	return (
		<View style={StyleSheet.flatten([ButtonStyle.button, ...style])}>
			{children}
		</View>
	);
};

const ButtonStyle = StyleSheet.create({
	button: {
		alignItems: "center",
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		borderRadius: 20,
		fontFamily: 'DOHYEON'
	},
	mint: {
		backgroundColor: mint
	},
	white: {
		backgroundColor: "white",
	},
	fit: {
		padding: 10,
		paddingRight: "auto",
		paddingLeft: "auto",
		width: "100%"
	}
})

export default ButtonComponent;
