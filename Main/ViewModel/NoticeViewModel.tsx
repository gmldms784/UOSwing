import React, { createContext, useContext } from 'react';
import axios from 'axios';
import { API_URL } from '../../CommonVariable';

import { childrenObj } from '../Type';
import { useNoticeState, useNoticeDispatch } from '../Model/NoticeModel';

const SaveNoticeContext = createContext<(id: number, title: string, content : string)=> void>((id: number, title: string, content : string) => {});
const DeleteNoticeContext = createContext<(id: number)=> void>((id: number) => {});

export const NoticeLogicProvider = ({ children } : childrenObj) => {
	const notice = useNoticeState();
	const noticeDispatch = useNoticeDispatch();

	const saveNotice = (id: number, title: string, content : string) => {
		if(id === -1){
			// todo : add new notice api call
			// todo : get api call

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
			// todo : get api call

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

	const deleteNotice = (id : number) => {
		// todo : delete notice api call
		// todo : get api call

		// 임시코드
		noticeDispatch(notice.filter((value, index) => value.id !== id));
	}

	return (
		<SaveNoticeContext.Provider value={saveNotice}>
			<DeleteNoticeContext.Provider value={deleteNotice}>
				{children}
			</DeleteNoticeContext.Provider>
		</SaveNoticeContext.Provider>
	);
};

export function useSaveNotice() {
	const context = useContext(SaveNoticeContext);
	return context;
}
export function useDeleteNotice() {
	const context = useContext(DeleteNoticeContext);
	return context;
}
