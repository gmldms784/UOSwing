import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';

import { BoxLayout } from '.';
import { borderColor } from '../CommonVariable';
import { useReportState } from '../Main/Model/ReportModel';
import { useDeleteReport } from '../Main/ViewModel/ReportViewModel';

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
						<Text>{content}</Text>
						<Text>{createdDate}</Text>
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
})

export default ReportCard;