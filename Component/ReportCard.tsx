import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';

import { BoxLayout } from '.';
import { mint } from '../CommonVariable';
import { ReportContextProvider, useReportState } from '../Main/Model/ReportModel';
import { useDeleteReport } from '../Main/ViewModel/ReportViewModel';

import { dateToString } from '../Function/DateToString';

type Props = {
	id: number,
	tag: string, // 추후 수정
	content: string,
	isResolved: boolean,
	createdDate: Date,
	box_id: number
}

const ReportCard = ({ id, tag, content, isResolved, createdDate, box_id }: Props) => {
	const report = useReportState();
	const deleteReport = useDeleteReport();

	const handleDelete = () => {
		deleteReport(id);
	}

	return (
		<>
			<BoxLayout>
				<View
					style={Report.wrap}
				>
					<View>
						<Text style={Report.content}>{content}</Text>
						<Text style={Report.date}>{createdDate && dateToString(createdDate)}</Text>
					</View>
				</View>
			</BoxLayout>
		</>
	);
}

const Report = StyleSheet.create({
	wrap: {
		display: 'flex',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	content: {
		marginBottom: 10,
	},
	date: {
		paddingLeft: 5,
		backgroundColor: mint,
		borderRadius: 4,
		width: 85,
	},
})

export default ReportCard;