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
	createdDate: Date,
}

const IconProvider = ( tag : string ) => {
	// 신고 종류에 따른 아이콘 세팅
	switch(tag){
		case "KEY_MISSED":
			return <KeyIcon width={25} height={25} fill="black" />
		case "BROKEN":
			return <BrokenIcon width={25} height={25} fill="black" />
		case "EMPTY":
			return <NoPadIcon width={25} height={25} fill="black" />
		case "WRONG_QUANTITY":
			return <WrongNumIcon width={25} height={25} fill="black" />
		case "DEFECT":
			return <EtcIcon width={25} height={25} fill="black" />
	}
}

const TextProvider = ( tag : string ) => {
	// 신고 종류에 따른 tag 이름 세팅
	switch(tag){
		case "KEY_MISSED":
			return "열쇠 분실"
		case "BROKEN":
			return "생리대함 파손"
		case "EMPTY":
			return "생리대 없음"
		case "WRONG_QUANTITY":
			return "수량 오차"
		case "DEFECT":
			return "기타"
	}
}

// 신고 카드 컴포넌트
const ReportCard = ({ id, tag, content, createdDate }: Props) => {
	const report = useReportState();
	const deleteReport = useDeleteReport();

	const handleDelete = () => {
		Alert.alert(
			"신고 해결",
			"해당 신고를 해결 처리하시겠습니까?\n해결 완료된 신고만 해결 처리 해주세요.",
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
				<BoxLayout>
					<View
						style={Report.wrap}
					>
							<View style={{ width: '100%'}}>
								<View style={{ flexDirection:'row', alignItems:'center', marginBottom: 5}}>
									<Text style={Report.tagIconCon}>{IconProvider(tag)}</Text>
									<Text style={Report.tagText}>{TextProvider(tag)}</Text>
								</View>
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
		paddingRight: 3,
		marginBottom: 5,
	},
	date: {
		paddingHorizontal: 5,
		backgroundColor: mint,
		borderRadius: 4,
	},
	rowdatebtn: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'space-between'
	},
	btnText: {
		fontSize: 13,
		paddingHorizontal: 10,
		paddingTop: 7,
		paddingBottom: 4,
		fontFamily: 'DOHYEON',
		borderWidth: 1,
		borderRadius: 7,
		borderColor: borderColor,
		textAlign: 'center',
	},
	tagIconCon: {
		marginRight: 5,
	},
	tagText: {
		fontSize: 16,
		fontWeight: 'bold',
	}
})

export default ReportCard;