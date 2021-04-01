import React, { useState, useContext, createContext, Dispatch } from 'react';
import { noticeType, childrenObj } from '../Type';

const noticeState = createContext<Array<noticeType>>([]);
const noticeDispatch = createContext<Dispatch<Array<noticeType>>>(()=>{});

export const NoticeContextProvider = ({ children }: childrenObj) => {
	const initialState : Array<noticeType> = [{
		id: 1,
		title: "💙날개 세 번째 활동 공지💙",
		content: "안녕하세요! 날개 3차 신입부원 여러분! 첫 활동 오리엔테이션을 공지 드리고자 합니다! 일시는 투표를 통해서 자유롭게 투표해주시면 감사하겠습니다😊 만약 참여가능한 날짜가 없다면, 아래 댓글로 불참이라고 남겨주시면 감사하겠습니다😊\n\n✔활동대상 : 1, 2차 신입부원 중 OT에 참여하지 않은 팀원, 3차 신입부원  \n✔활동내용 : 오리엔테이션, 신입부원 프로그램, 앞으로의 진행 활동, 현재 진행중인 TF팀 소개",
		created: new Date("2021-03-28")
	}, {
		id: 2,
		title: "💙상생연대 동아리 지원사업 참여 팀원 모집💙",
		content: "안녕하세여:) “상생연대 동아리 지원사업” 참여 TF팀 팀원을 모집합니다!\n자세한 사항은 해당 포스터에 적혀있는 사항을 참고하시거나 혹은 제 개인톡으로 문의주시면 감사하겠습니다😊 같이하고자 하시는 분은 제 개인톡으로 연락주시면 감사하겠습니다😊 단톡은 이번주 내로 개설되고 활동은 3월 4번째부터 예정입니다!\n\n날개의 더 큰 도약을 함께 고민하고 이뤄내고자 하는 팀원 여러분의 많은 지원 부탁드립니다!\n감사합니다!✊",
		created: new Date("2021-04-01")
	}];

	const [noticeData, setNoticeDate] = useState<Array<noticeType>>(initialState);

	return (
		<noticeState.Provider value={noticeData}>
			<noticeDispatch.Provider value={setNoticeDate}>
				{children}
			</noticeDispatch.Provider>
		</noticeState.Provider>
	);
};

export function useNoticeState() {
	const context = useContext(noticeState);
	return context;
}

export function useNoticeDispatch() {
	const context = useContext(noticeDispatch);
	return context;
}