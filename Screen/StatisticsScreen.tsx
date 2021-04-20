import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';

import { ButtonComponent } from '../Component';
import { useStatisticsWeekState, useStatisticsMonthState } from '../Main/Model/StatisticsModel';

type tabArray = ["week", "month"];
type barDataType = {
	value : number,
	label : string
}

const StatisticsScreen = () => {
	const weekData = useStatisticsWeekState();
	const monthData = useStatisticsMonthState();

	const [tab, tabChange] = useState<tabArray[number]>("week");
	const [barData, setBarData] = useState<Array<barDataType>>([]);

	useEffect(()=> {
		if(tab === "week")
			setBarData(weekData.map((stat) => ({ value : stat.amount, label: stat.padBoxName})));
		else
			setBarData(monthData.map((stat) => ({ value : stat.amount, label: stat.padBoxName})));
	}, [tab]);

	const handleClickPeriod = (period : tabArray[number]) => {
		switch(period){
			case "week" :
				tabChange("week");
				break;
			case "month" :
				tabChange("month");
				break;
		}
	};
	
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
					onPress={() => handleClickPeriod("week")}
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
					onPress={() => handleClickPeriod("month")}
				>
					<ButtonComponent
						color={tab==="month"?"mint":"white"}
						size="fit"
					>
						<Text>월별</Text>
					</ButtonComponent>
				</TouchableHighlight>
			</View>
			{
				barData.length !== 0 &&
				<View style={{ flexDirection: 'row', marginTop: 20 }}>
					<View>
						{
							barData.map((data :barDataType) => <Text key={data.label} style={StatisStyle.barLabel}>{`[${data.label}]\n${data.value}개`}</Text>)
						}
					</View>
					<BarChart
						style={{ flex: 1, marginLeft: 8, height: 60*barData.length }}
						data={barData}
						yAccessor={({item}) => item.value}
						horizontal={true}
						svg={{ fill: 'rgb(142, 135, 224)' }} // mint : rgb(139, 198, 199), purple : rgb(142, 135, 224)
						spacingInner={0.5}
						spacingOuter={0.5}
						gridMin={0}
						contentInset={{ right: 10 }}
					>
						<Grid direction={Grid.Direction.VERTICAL}/>
					</BarChart>
				</View>
			}
		</View>
	);
};

const StatisStyle = StyleSheet.create({
	btnContainer : {
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10
	},
	barLabel : {
		height: 60,
		textAlign: 'center',
		paddingTop: 10,
		marginLeft: 10
	},
});


export default StatisticsScreen;