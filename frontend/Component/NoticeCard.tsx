import React, { useState } from 'react';

import {
	View,
	Text,
	TouchableHighlight
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { BoxLayout } from '.';
import { dateToString } from '../Function/DateToString';
import EditIcon from '../assets/edit.svg';
import DeleteIcon from '../assets/delete.svg';
import ArrowDownIcon from '../assets/arrow-down.svg';
import ArrowUpIcon from '../assets/arrow-up.svg';

import { NoticeStackParamList } from '../Router/NoticeRouter';

type Props = {
	navigation: StackNavigationProp<NoticeStackParamList, 'NoticeEdit'>;
	title: string;
	date: Date;
	contents: string;
	index: number;
	deleteNotice: (index: number) => void;
}

const NoticeCard = ({ navigation, title, date, contents, index, deleteNotice } : Props) => {
	const [textHide, setTextHide] = useState<boolean>(true);

	return(
		<BoxLayout>
			<View
				style={{
					display: 'flex',
					flexWrap: 'nowrap',
					flexDirection: 'row',
					justifyContent: 'space-between'
				}}
			>
				<View
					style={{
						flexWrap: 'wrap',
						justifyContent: 'flex-start',
						width: '75%',
						marginBottom: 10
					}}
				>
					<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							width: '100%',
							marginBottom: 10
						}}
					>{title}</Text>
					<Text
						style={{
							paddingTop: 3,
							paddingBottom: 3,
							paddingLeft: 10,
							backgroundColor: "#8bc6c7",
							borderRadius: 4,
							width: 97
						}}
					> 
						{dateToString(date)}
					</Text>
				</View>
				<View
					style={{
						width: '20%',
						flexDirection: 'row',
						alignItems: 'flex-start'
					}}
				>
					<TouchableHighlight
						onPress={() => navigation.navigate('NoticeEdit', {
							title: title,
							contents: contents
						})}
						style={{
							padding: 6,
							borderWidth: 1,
							borderStyle: 'solid',
							borderColor: '#adadad',
							borderRadius: 6
						}}
					>
						<EditIcon width={20} height={20} fill="black" />
					</TouchableHighlight>
					<TouchableHighlight
						onPress={() => deleteNotice(index)}
						style={{
							padding: 6,
							borderWidth: 1,
							borderStyle: 'solid',
							borderColor: '#adadad',
							borderRadius: 6,
							marginLeft: 6
						}}
					>
						<DeleteIcon width={20} height={20} fill="black" />
					</TouchableHighlight>
				</View>
			</View>
			<View>
				<Text>{ textHide ? contents.substr(0,50)+"..." : contents }</Text>
			</View>
			<View
				style={{
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: 20
				}}
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
		</BoxLayout>
	);
}

export default NoticeCard;