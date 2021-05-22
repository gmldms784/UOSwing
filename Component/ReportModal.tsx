import React, { useState, useEffect, useCallback } from 'react';
import {
	StyleSheet,
	TouchableHighlight,
	Text,
	View,
	TextInput,
	Alert,
	ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Modal, Logotitle, ReportCard } from '.';
import { borderColor, alert, mint } from '../CommonVariable';

import AlertIcon from '../assets/warning.svg';
import KeyIcon from '../assets/key(defill).svg';
import BrokenIcon from '../assets/broken-link.svg';
import WrongNumIcon from '../assets/decision.svg';
import NoPadIcon from '../assets/lost.svg';
import EtcIcon from '../assets/plus.svg';

import { useUserState } from '../Main/Model/UserModel';
import { usePadBoxState } from '../Main/Model/PadBoxModel';
import { padBoxType, reportbyTagType, reportType } from '../Main/Type';
import { ButtonComponent } from '../Component';
import ReportByTag from '../Function/ReportByTag';
import { useSaveReport } from '../Main/ViewModel/ReportViewModel';
import { useReportState } from '../Main/Model/ReportModel';

type Props = {
	reportModal : boolean
	handleReportClose: () => void
	reportPos : number
	reportHandle : (idx:number) => void
	posName: string
	tagString: string
	setTagString: (a:string) => void
}

const ReportModal : React.FC<Props> = ({reportModal, handleReportClose, reportPos, reportHandle, posName, tagString, setTagString}) => {
	// reportPos는 현재 내가 누른 component(padbox)의 id임
	const padBoxState = usePadBoxState();
	const user = useUserState();
	const reportData = useReportState();
	const saveReport = useSaveReport();
	const tagData = ["KEY_MISSED", "BROKEN", "EMPTY", "WRONG_QUANTITY", "DEFECT"];

	const [reportWhy, setReportWhy] = useState<string>(tagData[0]);
	const [reportBody, setReportBody] = useState<string>("");

	// <--- report by tag
	const [reports, setReports] = useState<reportbyTagType>({"BROKEN": {"amount": 0}, "DEFECT": {"amount": 0}, "EMPTY": {"amount": 0}, "KEY_MISSED": {"amount": 0}, "WRONG_QUANTITY": {"amount": 0}});
	useEffect(() => {
		const key = new Date;
		async function ApplyReportByTag() {
			const res = await ReportByTag(reportData, reportPos, tagData);
			setReports(res);
		}
		ApplyReportByTag();
	}, [reportPos, reportData]);
	
	const tagToggleHandler = () => {
		if(tagString != "ALL") setTagString("ALL");
	}
	// ---> report by tag

	const handleReportComplete= () => {
		saveReport(-1, reportWhy, reportBody, reportPos);
		handleReportClose();
		// init
		reportHandle(0);
		setReportWhy(tagData[0]);
		setReportBody("");
		Alert.alert("신고가 성공적으로 접수되었습니다");
	}

	return(
		<>
			{
				user.auth==="user"?
				<Modal
					view={reportModal}
					onClose={handleReportClose}
					title={<Logotitle icon={<AlertIcon width={30} height={30} style={{ marginRight: 7 }} />}name="신고하기" />}
				>
					<View style={{ width: '100%' }}>
						<Text style={MS.title}>장소</Text>
						<View style={MS.picker}>
							<Picker
								selectedValue={reportPos}
								onValueChange={(v, i)=>reportHandle(v)}>
								{
									padBoxState.map((padBox : padBoxType, index : number) =>
										<Picker.Item key={padBox.id} label={padBox.name} value={padBox.id}/>
									)	
								}
							</Picker>
						</View>
						<Text style={MS.title}>신고사유</Text>
						<View style={MS.picker}>
							<Picker
								selectedValue={reportWhy}
								onValueChange={(v, i)=>setReportWhy(v)}>
								<Picker.Item label="생리대함 키 분실" value={tagData[0]} />
								<Picker.Item label="생리대함 파손" value={tagData[1]} />
								<Picker.Item label="생리대가 하나도 없음" value={tagData[2]} />
								<Picker.Item label="수량 오차" value={tagData[3]} />
								<Picker.Item label="기타 결함" value={tagData[4]} />
							</Picker>
						</View>
						<Text style={MS.title}>기타사항</Text>
						<TextInput
							style={MS.input}
							value={reportBody}
							onChangeText={setReportBody}
							maxLength={100}
							multiline={true}
						/>
						<TouchableHighlight
							style={{
								width: "50%",
								left: "25%",
								marginTop: 20
							}}
							underlayColor="transparent"
							onPress={handleReportComplete}
						>
							<ButtonComponent color="mint">
								<Text style={MS.btnText}>완료</Text>
							</ButtonComponent>
						</TouchableHighlight>
					</View>
				</Modal>
				:
				// admin modal
				<Modal
					view = {reportModal}
					onClose={handleReportClose}
					title={<Logotitle icon={<AlertIcon width={25} height={25} fill="black" />} name="신고내역"/>}
				>
					<View style={{ width: '100%', height: '97%' }}>
						<View style={MS.headerCon}>
							<Text style={MS.title}>{posName}</Text>
							<TouchableHighlight
								underlayColor="transparent"
								style={{ position: 'absolute', right: 0, top: 23 }}
								onPress={tagToggleHandler}
							>
								<View style={tagString==="ALL" ? MS.tagALL : MS.tagELSE}>
									<Text>ALL</Text>
								</View>
							</TouchableHighlight>
						</View>
						<View style={MS.tagCon}>
							<View style={MS.tagSet}>
								<View style={MS.alert}>
										<Text style={MS.alertText}>{reports[tagData[0]].amount}</Text>
								</View>
								<Text
									style={tagString===tagData[0] ? MS.tagIconConSELECT : MS.tagIconCon}
									onPress={() => setTagString(tagData[0])}
								>
									<KeyIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>열쇠 분실</Text>
							</View>
							<View style={MS.tagSet}>
								<View style={MS.alert}>
										<Text style={MS.alertText}>{reports[tagData[1]].amount}</Text>
								</View>
								<Text
									style={tagString===tagData[1] ? MS.tagIconConSELECT : MS.tagIconCon}
									onPress={() => setTagString(tagData[1])}
								>
									<BrokenIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>파손</Text>
							</View>
							<View style={MS.tagSet}>
								<View style={MS.alert}>
										<Text style={MS.alertText}>{reports[tagData[2]].amount}</Text>
								</View>
								<Text
									style={tagString===tagData[2] ? MS.tagIconConSELECT : MS.tagIconCon}
									onPress={() => setTagString(tagData[2])}
								>
									<NoPadIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>생리대 없음</Text>
							</View>
							<View style={MS.tagSet}>
								<View style={MS.alert}>
										<Text style={MS.alertText}>{reports[tagData[3]].amount}</Text>
								</View>
								<Text
									style={tagString===tagData[3] ? MS.tagIconConSELECT : MS.tagIconCon}
									onPress={() => setTagString(tagData[3])}
								>
									<WrongNumIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>수량 오차</Text>
							</View>
							<View style={MS.tagSet}>
								<View style={MS.alert}>
										<Text style={MS.alertText}>{reports[tagData[4]].amount}</Text>
								</View>
								<Text
									style={tagString===tagData[4] ? MS.tagIconConSELECT : MS.tagIconCon}
									onPress={() => setTagString(tagData[4])}
								>
									<EtcIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>기타</Text>
							</View>
						</View>
						<ScrollView style={MS.reportList} contentContainerStyle={{flexGrow:1}}>
							{
								reportData.map((report:reportType, index:number)=>
									reportPos===report.padBoxId &&
									(report.tag === tagString || tagString==="ALL") &&
									<ReportCard
										key={report.id}
										id={report.id}
										tag={report.tag}
										content={report.content}
										createdDate={report.createdDate}
									/>
								)
							}
						</ScrollView>
					</View>
				</Modal>
			}
		</>
	)
}

const MS = StyleSheet.create({
	title: {
		paddingLeft: 10,
		marginTop: 25,
		marginBottom : 10,
		borderLeftColor: 'black',
		borderLeftWidth: 3,
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'DOHYEON',
	},
	input: {
		borderWidth: 1,
		borderRadius: 15,
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderColor : borderColor
	},
	btnText: {
		fontSize: 15,
		fontFamily: 'DOHYEON',
		marginVertical: 7,
	},
	headerCon: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	toggleText: {
		fontSize: 13,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderRadius: 14,
		borderColor: borderColor,
		textAlign: 'center',
	},
	tagALL: {
		fontSize: 13,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderRadius: 14,
		borderColor: borderColor,
		textAlign: 'center',
		backgroundColor: mint,
	},
	tagELSE: {
		fontSize: 13,
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderRadius: 14,
		borderColor: borderColor,
		textAlign: 'center',
	},
	tagCon: {
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 10,
		justifyContent: 'space-between'
	},
	tagSet: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	tagIconCon: {
		borderColor: borderColor,
		borderWidth: 1,
		borderRadius: 100,
		padding: 10,
		textAlign: 'center',
	},
	tagIconConSELECT: {
		borderColor: borderColor,
		borderWidth: 1,
		borderRadius: 100,
		padding: 10,
		textAlign: 'center',
		backgroundColor: mint,
	},
	alert: {
		position: "absolute",
		top: -3,
		right: -5,
		width: 20,
		height: 20,
		backgroundColor: alert,
		borderRadius: 100,
		zIndex: 1000,
		alignItems: "center",
		justifyContent: "center"
	},
	alertText: {
		textAlign: "center",
		color: "white",
	},
	tagText: {
		marginTop: 3,
		fontSize: 11,
	},
	reportList: {
		width: '100%',
		borderWidth: 1,
		borderRadius: 5,
		borderColor: borderColor,
	},
	picker : {
		borderColor : borderColor,
		borderRadius: 15,
		borderWidth: 1
	}
})

export default ReportModal;