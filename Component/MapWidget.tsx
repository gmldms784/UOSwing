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

import { borderColor, darkGray } from '../StyleVariable';
import { Modal } from '.';
import Logotitle from './Logotitle';
import { NoticeScreen } from '../Screen';
import { useGetPadBox } from '../Main/PadBoxViewModel';

type Props = {
	getMyPosition : () => void
}

const MapWidget = ({getMyPosition} : Props) => {
	const [infoModal, setInfoModal] = useState<boolean>(false);
	const getPadBox = useGetPadBox();

	const handleInfoOpen = () => {
		setInfoModal(true);
	}

	const handleInfoClose = () => {
		setInfoModal(false);
	}

	const getPadBoxInfo = () => {
		getPadBox();
	}

	return (
		<>
			<View style={WidgetStyle.wrap}>
				<TouchableHighlight
					style={WidgetStyle.whiteCircle}
					onPress={handleInfoOpen}
					underlayColor="transparent"
				>
					<NoticeIcon width={25} height={25} fill={darkGray} />
				</TouchableHighlight>
				<TouchableHighlight
					style={WidgetStyle.whiteCircle}
					onPress={getPadBoxInfo}
					underlayColor="transparent"
				>
					<RefreshIcon width={25} height={25} fill={darkGray} />
				</TouchableHighlight>
				<TouchableHighlight
					style={WidgetStyle.whiteCircle}
					onPress={getMyPosition}
					underlayColor="transparent"
				>
					<GPSIcon width={25} height={25} fill={darkGray} />
				</TouchableHighlight>
			</View>
			<Modal
				view = {infoModal}
				onClose={handleInfoClose}
				title={<Logotitle icon={<NoticeIcon width={25} height={25} fill="black" />} name="공지사항"/>}
			>
				<NoticeScreen />
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
