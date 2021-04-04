import React, { useState } from 'react';
import {
  ScrollView
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useNoticeState } from '../Main/Model/NoticeModel';
import { noticeType } from '../Main/Type';
import { NoticeCard } from '../Component';
import { NoticeStackParamList } from '../Router/NoticeRouter';

type Props = {
	navigation: StackNavigationProp<NoticeStackParamList, 'NoticeEdit'>;
}

const NoticeScreen = ({ navigation } : Props) => {
	const noticeData = useNoticeState();

	const deleteNotice = (index : number) => {
		// todo : custom modal로 confirm 받기
		// todo : viewModel에서 함수 구현해서 delete
		let tmp : Array<noticeType> = noticeData.slice(index, 1);
	}

	return (
		<ScrollView>
			{
				noticeData.map((notice : noticeType, index: number) => 
					<NoticeCard
						key={notice.id}
						navigation={navigation}
						title={notice.title}
						date={notice.created}
						contents={notice.content}
						index={index}
						deleteNotice={deleteNotice}
					/>
				)
			}
		</ScrollView>
	);
}

export default NoticeScreen;