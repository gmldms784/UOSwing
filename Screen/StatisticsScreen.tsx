import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import { ButtonComponent } from '../Component';

const StatisticsScreen = () => {
	const [tab, tabChange] = useState<boolean>(0); // 0 : week, 1: month
	return (
		<View>
			<View
				style={StatisStyle.btnContainer}
			>
				<TouchableHighlight
					style={{
						marginRight: 15,
						width: "45%"
					}}
				>
					<ButtonComponent
						color="mint"
						size="fit"
					>
						<Text>주별</Text>
					</ButtonComponent>
				</TouchableHighlight>
				<TouchableHighlight
					style={{
						width: "45%"
					}}
				>
					<ButtonComponent
						size="fit"
					>
						<Text>월별</Text>
					</ButtonComponent>
				</TouchableHighlight>
			</View>
			<Text>Statistics</Text>
		</View>
	);
};

const StatisStyle = StyleSheet.create({
	btnContainer : {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10
	},
})

export default StatisticsScreen;