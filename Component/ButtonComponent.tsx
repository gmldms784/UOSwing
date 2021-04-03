import React, { useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	StyleSheetProperties
} from 'react-native';

import { borderColor, mint, purple } from '../StyleVariable';

type sizeArr = ["default", "fit"];
// default는 text 크기에 맞춰서 button이 나옴
// fit은 상위 컴포넌트 크기에 맞춰서 button이 나옴

type Props = {
	color?: string,
	size?: sizeArr[number],
	border?: boolean
}

// how to use?
// <TouchableHighlight>
// 	 <ButtonComponent color="mint" size="fit">
//     <Text>hi</Text>
//   </ButtonComponent>
// </TouchableHighlight>

const ButtonComponent : React.FC<Props> = ({color, size, border, children}) => {
	const style = [{}];
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
	if(size === "fit"){
		style.push(ButtonStyle.fit);
	}
	if(border){
		style.push(ButtonStyle.border);
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
		justifyContent: "center",
		padding: 5,
		paddingRight: 15,
		paddingLeft: 15,
		borderRadius: 20,
		fontFamily: 'DOHYEON',
		flexDirection: "row"
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
	},
	border: {
		borderWidth: 1,
		borderColor: borderColor
	}
})

export default ButtonComponent;
