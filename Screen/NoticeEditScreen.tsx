import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableHighlight
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { NoticeStackParamList } from '../Router/NoticeRouter';
import { ButtonComponent } from '../Component';
import { useSaveNotice } from '../Main/ViewModel';

type Props = {
	route: RouteProp<NoticeStackParamList, 'NoticeEdit'>;
	navigation: StackNavigationProp<NoticeStackParamList, 'NoticeEdit'>;
}

const NoticeEditScreen = ({ route, navigation }: Props) => {
	const [id, setId] = useState<number>(-1);
	const [titleState, setTitleState] = useState<string>("");
	const [contentsState, setContentsState] = useState<string>("");
	const saveNotice = useSaveNotice();

	useEffect(() => {
		setId(route.params.id);
		setTitleState(route.params.title);
		setContentsState(route.params.contents);
	}, [route.params]);

	const save = () => {
		saveNotice(id, titleState, contentsState);
		navigation.navigate("Notice");
	}

	return (
		<View>
			<View style={Notice.header}>
				<TextInput
					onChangeText={setTitleState}
					value={titleState}
					multiline={true}
					placeholder="제목"
					style={Notice.title}
				/>
				<TouchableHighlight
					style={Notice.buttonPlace}
					onPress={save}
				>
					<ButtonComponent
						size="fit"
						color="mint"
					>
						<Text>저장</Text>
					</ButtonComponent>
				</TouchableHighlight>
			</View>
			<TextInput
				onChangeText={setContentsState}
				value={contentsState}
				multiline={true}
				placeholder="내용을 입력해주세요."
				style={Notice.content}
			/>
		</View>
	);
}

const Notice = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center"
	},
	title: {
		flex: 8,
		fontSize: 20,
		textDecorationLine: 'none',
		borderBottomWidth: 1,
		marginLeft: 20
	},
	buttonPlace: {
		flex: 2,
		marginRight: 20
	},
	content: {
		marginLeft: 20,
		marginRight: 20
	}
})

export default NoticeEditScreen;