import React, { useState } from 'react';

import {
	StyleSheet,
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { BoxLayout } from '.';
import { dateToString } from '../Function/DateToString';
import { mint, borderColor } from '../StyleVariable';
import { NoticeStackParamList } from '../Router/NoticeRouter';
import { useUserState } from '../Main/Model/UserModel';
import { useDeleteNotice } from '../Main/ViewModel';

import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import ArrowDownIcon from '../assets/arrow-down.svg';
import ArrowUpIcon from '../assets/arrow-up.svg';

type Props = {
	navigation?: StackNavigationProp<NoticeStackParamList, 'NoticeEdit'>;
	title: string;
	date: Date;
	contents: string;
	id: number;
}

const NoticeCard = ({ navigation, title, date, contents, id }: Props) => {
	const [textHide, setTextHide] = useState<boolean>(true);
	const user = useUserState();
	const deleteNotice = useDeleteNotice();

	const handleDelete = () => {
		deleteNotice(id);
	};

	return (
		<BoxLayout>
			<View
				style={Notice.wrap}
			>
				<View
					style={user.auth === "admin"?Notice.header:Notice.userHeader}
				>
					<Text
						style={Notice.title}
					>{title}</Text>
					<Text
						style={Notice.date}
					>
						{dateToString(date)}
					</Text>
				</View>
				{
					user.auth === "admin" &&
					<View
						style={Notice.btnContainer}
					>
						<TouchableHighlight
							onPress={() => navigation?.navigate('NoticeEdit', {
								title: title,
								contents: contents,
								id
							})}
							style={Notice.editBtn}
						>
							<EditIcon width={20} height={20} fill="black" />
						</TouchableHighlight>
						<TouchableHighlight
							onPress={handleDelete}
							style={Notice.deleteBtn}
						>
							<DeleteIcon width={20} height={20} fill="black" />
						</TouchableHighlight>
					</View>
				}
			</View>
			<View>
				<Text>{textHide ? contents.substr(0, 50) + "..." : contents}</Text>
			</View>
			{
				contents.length>50 &&
				<View
					style={Notice.arrowContainer}
				>
					<TouchableHighlight
						onPress={() => setTextHide(!textHide)}
					>
						{
							textHide ?
								<ArrowDownIcon width={20} height={20} fill="black" />
								: <ArrowUpIcon width={20} height={20} fill="black" />
						}
					</TouchableHighlight>
				</View>
			}
		</BoxLayout>
	);
}

const Notice = StyleSheet.create({
	wrap: {
		display: 'flex',
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	header: {
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		width: '75%',
		marginBottom: 10
	},
	userHeader: {
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		width: '100%',
		marginBottom: 10
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		width: '100%',
		marginBottom: 10
	},
	date: {
		paddingTop: 3,
		paddingBottom: 3,
		paddingLeft: 10,
		backgroundColor: mint,
		borderRadius: 4,
		width: 97
	},
	btnContainer: {
		width: '20%',
		flexDirection: 'row',
		alignItems: 'flex-start'
	},
	editBtn: {
		padding: 6,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: borderColor,
		borderRadius: 6
	},
	deleteBtn: {
		padding: 6,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: borderColor,
		borderRadius: 6,
		marginLeft: 6
	},
	arrowContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20
	}
})

export default NoticeCard;