import React, { useState } from 'react';
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
import { borderColor, darkGray } from '../CommonVariable';
import AlertIcon from '../assets/warning.svg';
import KeyIcon from '../assets/key.svg';
import BrokenIcon from '../assets/broken-link.svg';
import WrongNumIcon from '../assets/decision.svg';
import NoPadIcon from '../assets/lost.svg';

import { useUserState } from '../Main/Model/UserModel';
import { usePadBoxState } from '../Main/Model/PadBoxModel';
import { padBoxType, reportType } from '../Main/Type';
import { ButtonComponent } from '../Component';
import { useSaveReport } from '../Main/ViewModel/ReportViewModel';
import { useReportState } from '../Main/Model/ReportModel';

type Props = {
	reportModal : boolean
	handleReportClose: () => void
	reportPos : number
	reportHandle : (idx:number) => void
}

const ReportModal : React.FC<Props> = ({reportModal, handleReportClose, reportPos, reportHandle}) => {
	const padBoxState = usePadBoxState();
	const user = useUserState();
	const reportData = useReportState();

	const saveReport = useSaveReport();
	const [reportWhy, setReportWhy] = useState<string>("");
	const [reportBody, setReportBody] = useState<string>("");

	const handleReportComplete= () => {
		saveReport(-1, reportWhy, reportBody, reportPos);
		handleReportClose();
		reportHandle(0);
		setReportWhy("");
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
					<View style={{ width: 270 }}>
						<Text style={MS.title}>장소</Text>
						<Picker
							selectedValue={reportPos}
							// 희은 피드백 : ts 맞춰서 type 기재해주세요!
							// 이제 마커 클릭해도 신고하기가 뜨는데 바로 클릭한 padBox가 select되게 해두었어요! 아래 map도 구현해두었습니다!
							onValueChange={(v, i)=>reportHandle(v)}>
							{
								padBoxState.map((padBox : padBoxType, index : number) =>
									<Picker.Item key={padBox.id} label={padBox.name} value={index}/>
								)	
							}
						</Picker>
						<Text style={MS.title}>신고사유</Text>
						<Picker
							selectedValue={reportWhy}
							onValueChange={(v, i)=>setReportWhy(v)}>
							<Picker.Item label="Test" value={0} />
							<Picker.Item label="Test2" value={1} />
							<Picker.Item label="Test3" value={2} />
						</Picker>
						<Text style={MS.title}>기타사항</Text>
						<TextInput
							style={MS.input}
							value={reportBody}
							onChangeText={setReportBody}
							maxLength={40}
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
					<View style={{width:270, height:'95%'}}>
						<Text style={MS.title}>{padBoxState[reportPos].name}</Text>
						<View style={MS.tagCon}>
							<View style={MS.tagSet}>
								<Text style={MS.tagIconCon}>
									<KeyIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>열쇠 분실</Text>
							</View>
							<View style={MS.tagSet}>
								<Text style={MS.tagIconCon}>
									<BrokenIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>생리대함 파손</Text>
							</View>
							<View style={MS.tagSet}>
								<Text style={MS.tagIconCon}>
									<WrongNumIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>생리대 없음</Text>
							</View>
							<View style={MS.tagSet}>
								<Text style={MS.tagIconCon}>
									<NoPadIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>수량 오차</Text>
							</View>
						</View>
						<ScrollView style={MS.reportList} contentContainerStyle={{flexGrow:1}}>
							{
								reportData.map((report:reportType, index:number)=>
									<ReportCard
										key={report.id}
										id={index}
										tag={report.tag}
										content={report.content}
										isResolved={report.isResolved}
										createdDate={report.createdDate}
										box_id={report.box_id}
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
		borderLeftColor: 'black',
		borderLeftWidth: 3,
		fontSize: 18,
		fontWeight: '600',
		fontFamily: 'DOHYEON',
	},
	input: {
		borderWidth: 1,
		borderRadius: 7,
		padding: 5,
		marginTop: 10,
	},
	btnText: {
		fontSize: 15,
		fontFamily: 'DOHYEON',
		marginVertical: 7,
	},
	tagCon: {
		display: 'flex',
		flexDirection: 'row',
		paddingVertical: 10,
	},
	tagSet: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 5
	},
	tagIconCon: {
		borderColor: borderColor,
		borderWidth: 1,
		borderRadius: 100,
		padding: 10
	},
	tagText: {
		marginTop: 3,
		fontSize: 11,
	},
	tagIconCon: {
		borderColor: borderColor,
		borderWidth: 1,
		borderRadius: 100,
		padding: 10
	},
	reportList: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: borderColor,
	}
})

export default ReportModal;