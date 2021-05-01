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

import { useReportState } from '../Main/Model/ReportModel';
import { useDeleteReport } from '../Main/ViewModel/ReportViewModel';

import { dateToString } from '../Function/DateToString';

import KeyIcon from '../assets/key(defill).svg';
import BrokenIcon from '../assets/broken-link.svg';
import WrongNumIcon from '../assets/decision.svg';
import NoPadIcon from '../assets/lost.svg';
import EtcIcon from '../assets/plus.svg';

type Props = {
	id: number,
	tag: string,
	content: string,
	isResolved: boolean,
	createdDate: Date,
	box_id: number,
	reportPos: number,
	tagString: string
}

const IconProvider = ( tag : string ) => {
	switch(tag){
		case "KEY_MISSED":
			return <KeyIcon width={20} height={20} fill="black" />
		case "BROKEN":
			return <BrokenIcon width={20} height={20} fill="black" />
		case "EMPTY":
			return <NoPadIcon width={20} height={20} fill="black" />
		case "WRONG_QUANTITY":
			return <WrongNumIcon width={20} height={20} fill="black" />
		case "DEFECT":
			return <EtcIcon width={20} height={20} fill="black" />
	}
}

const TextProvider = ( tag : string ) => {
	switch(tag){
		case "KEY_MISSED":
			return "[열쇠 분실]"
		case "BROKEN":
			return "[생리대함 파손]"
		case "EMPTY":
			return "[생리대 없음]"
		case "WRONG_QUANTITY":
			return "[수량 오차]"
		case "DEFECT":
			return "[기타]"
	}
}

const ReportCard = ({ id, tag, content, createdDate, box_id, reportPos, tagString }: Props) => {
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
				reportPos===box_id ?
				(tag === tagString || tagString==="ALL") &&
				<BoxLayout>
					<View
						style={Report.wrap}
					>
							<View style={{ width: '100%'}}>
								{/* <Text style={Report.tagIconCon}>{IconProvider(tag)}</Text> */}
								<Text style={Report.tagText}>{TextProvider(tag)}</Text>
								<Text style={Report.content}>{content}</Text>
							</View>
							<View style={Report.rowdatebtn}>
								<View style={{ alignItems: 'center', justifyContent: 'center'}}>
									<Text style={Report.date}>{dateToString(createdDate.toString())}</Text>
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
	tagIconCon: {
		borderColor: borderColor,
		borderWidth: 1,
		borderRadius: 100,
		padding: 5,
		alignSelf: 'flex-start',
		textAlign: 'center',
	},
	tagText: {
		fontWeight: 'bold',
	}
})

export default ReportCard;