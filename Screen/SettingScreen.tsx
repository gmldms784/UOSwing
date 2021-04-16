import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

import { usePadBoxAddress, usePadBoxState } from '../Main/Model/PadBoxModel'
import { padBoxType, padBoxAddressType } from '../Main/Type';
import { Logotitle, Modal, SettingCard, ButtonComponent } from '../Component';
import SquareIcon from '../assets/square.svg';
import { SettingStackParamList } from '../Router/SettingRouter';

type Props = {
	navigation: StackNavigationProp<SettingStackParamList, 'SettingCreate'>;
}

const SettingScreen = ({ navigation } : Props) => {
	const settingData = usePadBoxState();
	const settingAddress = usePadBoxAddress();
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
							index={setting.id}
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
					<View style={{ width: 270 }}>
						<Text style={MS.title}>이름</Text>
						<TextInput value={name} onChangeText={setName} style={MS.input} />
						<Text style={MS.title}>장소</Text>
						<Picker 
							selectedValue={pos}
							onValueChange={(v, i)=>setPos(v)}>
							{
								settingAddress.map((padBox : padBoxAddressType, index : number) =>
									<Picker.Item key={index} label={padBox.address} value={padBox.address}/>
								)	
							}
						</Picker>
						<TouchableHighlight
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