import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight,
	Alert
} from 'react-native';

import { BoxLayout } from '.';
import { borderColor, mint } from '../CommonVariable';
import { ReportContextProvider, useReportState } from '../Main/Model/ReportModel';
import { useDeleteReport } from '../Main/ViewModel/ReportViewModel';

import { dateToString } from '../Function/DateToString';
import { reportType } from '../Main/Type';

type Props = {
	id: number,
	tag: string, // 추후 수정
	content: string,
	isResolved: boolean,
	createdDate: Date,
	box_id: number,
	reportPos: number
}

const ReportCard = ({ id, tag, content, isResolved, createdDate, box_id, reportPos }: Props) => {
	const report = useReportState();
	const deleteReport = useDeleteReport();

	const handleDelete = () => {
		Alert.alert(
			"해당 신고를 해결 처리 하시겠습니까?",
			"해결 처리된 신고만 해결 처리 해주세요.",
			[
				{
					text: "네",
					onPress: () => deleteReport(id)
				},
				{
					text: "아니요",
					style: "cancel"
				}
			],
			{ cancelable: false }
		);
	}

	return (
		<>
			{
				reportPos===box_id?
				<BoxLayout>
					<View
						style={Report.wrap}
					>
							<View style={{ width: '100%'}}>
								<Text style={Report.content}>{content}</Text>
							</View>
							<View style={Report.rowdatebtn}>
								<View style={{ alignItems: 'center', justifyContent: 'center'}}>
									<Text style={Report.date}>{createdDate && dateToString(createdDate)}</Text>
								</View>
								<TouchableHighlight
									underlayColor="transparent"
									onPress={handleDelete}
								>
									<Text style={Report.btnText}>해결</Text>
								</TouchableHighlight>
							</View>
					</View>
				</BoxLayout>
				: null
			}
		</>
	);
}

const Report = StyleSheet.create({
	wrap: {
		display: 'flex',
		flexWrap: 'nowrap',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	content: {
		marginBottom: 5,
	},
	date: {
		paddingLeft: 5,
		backgroundColor: mint,
		borderRadius: 4,
		width: 85,
	},
	rowdatebtn: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between'
	},
	btnText: {
		fontSize: 12,
		fontFamily: 'DOHYEON',
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderRadius: 7,
		borderColor: borderColor
	},
})

export default ReportCard;