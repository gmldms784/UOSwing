import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { usePadBoxState } from '../Main/Model/PadBoxModel'
import { padBoxType } from '../Main/Type';
import { Logotitle, Modal, SettingCard, ButtonComponent } from '../Component';
import SquareIcon from '../assets/square.svg';
import { SettingStackParamList } from '../Router/SettingRouter';
import { TouchableHighlight } from 'react-native-gesture-handler';

type Props = {
	navigation: StackNavigationProp<SettingStackParamList, 'SettingCreate'>;
}

const SettingScreen = ({ navigation } : Props) => {
	const settingData = usePadBoxState();
	const [modal, setModal] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [pos, setPos] = useState<string>("");

	const handleModalOpen = (n:string, a:string) => {
		setName(n);
		setPos(a);
		setModal(true);
	}
	const handleModalClose = () => {
		setModal(false);
	}
	return (
		<>
			<ScrollView contentContainerStyle={{flexGrow:1}}>
				{
					settingData.map((setting: padBoxType, index: number) => 
						<SettingCard
							key={setting.id}
							index={index}
							name={setting.name}
							address={setting.address}
							padAmount={setting.padAmount}
							humidity={setting.humidity}
							temperature={setting.temperature}
							modalOpen={()=>handleModalOpen(setting.name, setting.address)}
						/>
					)
				}
				<Modal
					view={modal}
					onClose={handleModalClose}
					title={<Logotitle icon={<SquareIcon width={30} height={30} fill="black" />} name="개별 생리대함 관리" />}
				>
					{/* 이름, 장소 받아오기 구현해야함, 어떻게..?????  */}
					{/* modal이 겹쳐 뜨는 것 같음 */}
					<View style={{ width: 270 }}>
						<Text style={MS.title}>이름</Text>
						<TextInput value={name} onChangeText={setName} style={MS.input} />
						<Text style={MS.title}>장소</Text>
						<TextInput value={pos} onChangeText={setPos} style={MS.input} />
						<TouchableHighlight
							// !키보드가 올라오면 버튼이 자리를 벗어남 해결필요!
							style={{
								width: "50%",
								left: "25%",
								marginTop: 20
							}}
							underlayColor="transparent"
							onPress={handleModalClose} // todo
						>
							<ButtonComponent color="mint">
								<Text style={MS.btnText}>완료</Text>
							</ButtonComponent>
						</TouchableHighlight>
					</View>
				</Modal>
			</ScrollView>
		</>
	);
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
	}
})

export default SettingScreen;