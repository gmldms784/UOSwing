
import React, { createContext, useContext } from 'react';
import { userType, childrenObj } from './Type';
import { useNoticeState, useNoticeDispatch } from './Model/NoticeModel';
import { Value } from 'react-native-reanimated';

const SaveNoticeContext = createContext<(id: number, title: string, content : string)=> void>((id: number, title: string, content : string) => {});

export const LogicProvider = ({ children } : childrenObj) => {
	const notice = useNoticeState();
	const noticeDispatch = useNoticeDispatch();

	const saveNotice = (id: number, title: string, content : string) => {
		if(id === -1){
			// todo : add new notice api call

			// 임시코드
			noticeDispatch([
				...notice,
				{
					id: 3,
					title,
					content,
					createdDate: new Date(Date.now())
				}
			]);
		}else{
			// todo : add update notice api call

			// 임시코드
			const noticeExcept = notice.filter((value, index) => value.id !== id);
			noticeDispatch([
				...noticeExcept,
				{
					id: id,
					title,
					content,
					createdDate: new Date(Date.now())
				}
			]);
		}
	}

	return (
		<SaveNoticeContext.Provider value={saveNotice}>
			{children}
		</SaveNoticeContext.Provider>
	);
};

export function useSaveNotice() {
	const context = useContext(SaveNoticeContext);
	return context;
}