import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import NoticeIcon from '../assets/information.svg';
import RefreshIcon from '../assets/refresh.svg';
import GPSIcon from '../assets/gps.svg';
import PositionIcon from '../assets/placeholder.svg';
import BackIcon from '../assets/back.svg';

import { borderColor, darkGray } from '../CommonVariable';
import { Modal, NoticeModal } from '.';
import Logotitle from './Logotitle';
import { NoticeScreen } from '../Screen';
import { useUserState } from '../Main/Model/UserModel';
import { useGetPadBox } from '../Main/ViewModel/PadBoxViewModel';

type Props = {
	getMyPosition : () => void;
	InitializePosition : () => void;
}

// 맵 컴포넌트에서 이용할 수 있는 위젯 컴포넌트
const MapWidget = ({getMyPosition, InitializePosition} : Props) => {
	const [infoModal, setInfoModal] = useState<boolean>(false);
	const getPadBox = useGetPadBox();
	const user = useUserState();

	const handleInfoOpen = () => {
		setInfoModal(true);
	}

	const handleInfoClose = () => {
		setInfoModal(false);
	}

	const getPadBoxInfo = () => {
		getPadBox();
		InitializePosition();
	}

	return (
		<>
			<View style={WidgetStyle.wrap}>
				{
					user.auth === "admin" ?
					null :
					<TouchableHighlight
						style={WidgetStyle.whiteCircle}
						onPress={handleInfoOpen}
						underlayColor="transparent"
					>
						<NoticeIcon width={25} height={25} fill={darkGray} /> 
						{/* 공지사항 */}
					</TouchableHighlight>
				}
				<TouchableHighlight
					style={WidgetStyle.whiteCircle}
					onPress={getPadBoxInfo}
					underlayColor="transparent"
				>
					<RefreshIcon width={25} height={25} fill={darkGray} />
					{/* 새로고침 */}
				</TouchableHighlight>
				<TouchableHighlight
					style={WidgetStyle.whiteCircle}
					onPress={getMyPosition}
					underlayColor="transparent"
				>
					<PositionIcon width={25} height={25} fill={darkGray} />
					{/* 내 위치 받아오기 */}
				</TouchableHighlight>
			</View>
			<Modal
				view = {infoModal}
				onClose={handleInfoClose}
				title={<Logotitle icon={<NoticeIcon width={25} height={25} fill="black" />} name="공지사항"/>}
			>
				<NoticeModal/>
			</Modal>
		</>
	);
};

const WidgetStyle = StyleSheet.create({
	wrap: {
		position: "absolute",
		bottom: 100,
		right: 20
	},
	whiteCircle: {
		padding: 5,
		borderRadius: 100,
		backgroundColor: "white",
		borderColor: borderColor,
		borderWidth: 1,
		marginBottom: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 1,
		shadowRadius: 4,
		elevation: 3,
	},
	icon: {
		backgroundColor: "white"
	}
})

export default MapWidget;
