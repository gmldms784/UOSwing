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

import { Modal, Logotitle, PadListCard } from '.';
import { borderColor, darkGray } from '../CommonVariable';

import { usePadBoxState } from '../Main/Model/PadBoxModel';

import { padBoxType } from '../Main/Type';

type Props = {
	listModal : boolean
	handleListClose: () => void
	address : string
	handleReportOpen: (idx : number, name : string, address : string) => void
}

const PadListModal : React.FC<Props> = ({listModal, handleListClose, address, handleReportOpen}) => {
	// reportPos는 현재 내가 누른 component(padbox)의 id임
	const padBoxState = usePadBoxState();

	const handleModalOpen = (id : number, name : string, address : string) => {
		handleReportOpen(id, name, address);
		handleListClose();
	}

	return(
		<Modal
			view={listModal}
			onClose={handleListClose}
			title={<Logotitle icon={null} name={address.replace("서울시립대학교 ", "")} />} 
		>
			<View style={{ width: 270 }}>
				<ScrollView style={PLM.padList} contentContainerStyle={{flexGrow:1}}>
					{
						padBoxState.map((setting: padBoxType, index: number) => {
							if(setting.address === address){
								return (
									<PadListCard
										key={setting.id}
										index={setting.id}
										name={setting.name}
										address={setting.address}
										padAmount={setting.padAmount}
										humidity={setting.humidity}
										temperature={setting.temperature}
										isReported={setting.isReported}
										modalOpen={() => handleModalOpen(setting.id, setting.name, setting.address)}
									/>
								);
							}
						})
					}
				</ScrollView>
				
			</View>
		</Modal>
	)
}

const PLM = StyleSheet.create({
	padList: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: borderColor,
		maxHeight: 500,
	}
})

export default PadListModal;