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
import KeyIcon from '../assets/key(defill).svg';
import BrokenIcon from '../assets/broken-link.svg';
import WrongNumIcon from '../assets/decision.svg';
import NoPadIcon from '../assets/lost.svg';
import EtcIcon from '../assets/plus.svg';

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
	const [reportWhy, setReportWhy] = useState<string>("KEY_MISSED");
	const [reportBody, setReportBody] = useState<string>("");

	const handleReportComplete= () => {
		saveReport(-1, reportWhy, reportBody, reportPos);
		handleReportClose();
		// init
		reportHandle(0);
		setReportWhy("KEY_MISSED");
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
							onValueChange={(v, i)=>reportHandle(v)}>
							{
								padBoxState.map((padBox : padBoxType, index : number) =>
									<Picker.Item key={padBox.id} label={padBox.name} value={padBox.id}/>
								)	
							}
						</Picker>
						<Text style={MS.title}>신고사유</Text>
						<Picker
							selectedValue={reportWhy}
							onValueChange={(v, i)=>setReportWhy(v)}>
							<Picker.Item label="생리대함 키 분실" value="KEY_MISSED" />
							<Picker.Item label="생리대함 파손" value="BROKEN" />
							<Picker.Item label="생리대가 하나도 없음" value="EMPTY" />
							<Picker.Item label="수량 오차" value="WRONG_QUANTITY" />
							<Picker.Item label="기타 결함" value="DEFECT" />
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
					<View style={{width:'100%', height:'95%'}}>
						<Text style={MS.title}>{posName}</Text>
						<View style={MS.tagCon}>
							<View style={MS.tagSet}>
								<Text style={MS.tagIconCon} onPress={() => setTagString("KEY_MISSED")}>
									<KeyIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>열쇠 분실</Text>
							</View>
							<View style={MS.tagSet}>
								<Text style={MS.tagIconCon} onPress={() => setTagString("BROKEN")}>
									<BrokenIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>생리대함 파손</Text>
							</View>
							<View style={MS.tagSet}>
								<Text style={MS.tagIconCon} onPress={() => setTagString("EMPTY")}>
									<WrongNumIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>생리대 없음</Text>
							</View>
							<View style={MS.tagSet}>
								<Text style={MS.tagIconCon} onPress={() => setTagString("WRONG_QUANTITY")}>
									<NoPadIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>수량 오차</Text>
							</View>
							<View style={MS.tagSet}>
								<Text style={MS.tagIconCon} onPress={() => setTagString("DEFECT")}>
									<EtcIcon width={30} height={30} fill="black" />
								</Text>
								<Text style={MS.tagText}>기타</Text>
							</View>
						</View>
						<ScrollView style={MS.reportList} contentContainerStyle={{flexGrow:1}}>
							{
								reportData.map((report:reportType, index:number)=>
									<ReportCard
										key={report.id}
										id={report.id}
										tag={report.tag}
										content={report.content}
										isResolved={report.isResolved}
										createdDate={report.createdDate}
										box_id={report.padBoxId}
										reportPos={reportPos}
										tagString={tagString}
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
		padding: 10,
		textAlign: 'center',
	},
	tagText: {
		marginTop: 3,
		fontSize: 11,
	},
	reportList: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: borderColor,
	}
})

export default ReportModal;