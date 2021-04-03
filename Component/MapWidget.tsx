import React from 'react';

import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import NoticeIcon from '../assets/information.svg';
import RefreshIcon from '../assets/refresh.svg';
import GPSIcon from '../assets/gps.svg';

const MapWidget = () => {
	return (
		<View>
			{
				// todo : widget icon
			}
			{/* <View style={WidgetStyle.whiteCircle}>
				<NoticeIcon width={30} height={30} fill="black"/>
			</View>
			<View>
				<RefreshIcon width={30} height={30} fill="black"/>
			</View>
			<View>
				<GPSIcon width={30} height={30} fill="black"/>
			</View> */}
		</View>
	);
};

const WidgetStyle = StyleSheet.create({
	wrap: {
		backgroundColor: "red",
		width: 500,
		height: 500
	},
	whiteCircle: {
		width: 30,
		height: 30,
		backgroundColor: "white"
	},
	icon: {
		backgroundColor: "white"
	}
})

export default MapWidget;
