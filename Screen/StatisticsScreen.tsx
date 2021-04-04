import React, { useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import { ButtonComponent } from '../Component';
import { useStatisticsState } from '../Main/Model/StatisticsModel';

type tabArray = ["week", "month"]

const StatisticsScreen = () => {
	const [tab, tabChange] = useState<tabArray[number]>("week");
	const statistics = useStatisticsState();

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
					underlayColor="transparent"
					onPress={() => tabChange("week")}
				>
					<ButtonComponent
						color={tab==="week"?"mint":"white"}
						size="fit"
					>
						<Text>주별</Text>
					</ButtonComponent>
				</TouchableHighlight>
				<TouchableHighlight
					style={{
						width: "45%"
					}}
					underlayColor="transparent"
					onPress={() => tabChange("month")}
				>
					<ButtonComponent
						color={tab==="month"?"mint":"white"}
						size="fit"
					>
						<Text>월별</Text>
					</ButtonComponent>
				</TouchableHighlight>
			</View>
			<View>
				{statistics.map((padBox) => (
					<View key={padBox.id}>
						<Text>{padBox.boxName}</Text>
						<Text>todo : 차트 도입하기!</Text>
					</View>
				))}
			</View>
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