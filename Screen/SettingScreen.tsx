import React, { useState } from 'react';
import {
  ScrollView,
  Text
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { usePadBoxState } from '../Main/Model/PadBoxModel'
import { padBoxType } from '../Main/Type';
import { SettingCard, SettingModal } from '../Component';
import SquareIcon from '../assets/square.svg';
import { SettingStackParamList } from '../Router/SettingRouter';

type Props = {
	navigation: StackNavigationProp<SettingStackParamList, 'SettingCreate'>;
}

const SettingScreen = ({ navigation } : Props) => {
	const settingData = usePadBoxState();
	const [modal, setModal] = useState<boolean>(false);

	const handleModalOpen = () => {
		setModal(true);
	}
	const handleModalClose = () => {
		setModal(false);
	}

	return (
		<>
			<ScrollView>
				{
					settingData.map((setting: padBoxType, index: number) => 
						<>
							<SettingCard
								key={setting.id}
								index={index}
								name={setting.name}
								address={setting.address}
								padAmount={setting.padAmount}
								humidity={setting.humidity}
								temperature={setting.temperature}
								modalOpen={handleModalOpen}
							/>
							<SettingModal
								view={modal}
								onClose={handleModalClose}
								icon={<SquareIcon width={30} height={30} fill="black" />}
								title="개별 생리대함 관리"
								initialName={setting.name}
								initialPos={setting.address}
							/>
						</>
					)
				}
			</ScrollView>
		</>
	);
}

export default SettingScreen;