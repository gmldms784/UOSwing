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
	navigation?: StackNavigationProp<NoticeStackParamList, 'NoticeEdit'>;
	type? : string;
}

const NoticeScreen = ({ navigation, type } : Props) => {
	const noticeData = useNoticeState();

	return (
		<ScrollView>
			{
				noticeData.map((notice : noticeType, index: number) => 
					<NoticeCard
						key={notice.id}
						type={type}
						navigation={navigation}
						title={notice.title}
						date={notice.createdDate}
						contents={notice.content}
						id={notice.id}
					/>
				)
			}
		</ScrollView>
	);
}

export default NoticeScreen;