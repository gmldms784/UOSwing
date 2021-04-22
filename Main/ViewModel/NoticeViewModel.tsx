import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../CommonVariable';

import { ErrorHandle } from '../../Function/ErrorHandling';
import { childrenObj } from '../Type';
import { useHeader } from '../Model/UserModel';
import { useNoticeState, useNoticeDispatch } from '../Model/NoticeModel';

const SaveNoticeContext = createContext<(id: number, title: string, content : string)=> void>((id: number, title: string, content : string) => {});
const DeleteNoticeContext = createContext<(id: number)=> void>((id: number) => {});

export const NoticeLogicProvider = ({ children } : childrenObj) => {
	const notice = useNoticeState();
	const noticeDispatch = useNoticeDispatch();
	const header = useHeader();

	useEffect(()=> {
		// 처음에 받아오기
		fetchNotice();
	}, []);

	const fetchNotice = () => {
		// fetch notices
		// todo : api 날짜 받아오는 걸로 고쳐주시면 날짜 ?빼기
		axios.get(`${API_URL}/api/v1/notice`)
		.then(res => {
			noticeDispatch(res.data);
		})
		.catch(error => {
			ErrorHandle.errorHandle(error, true, fetchNotice);
		});
	}

	const saveNotice = (id: number, title: string, content : string) => {
		if(id === -1){
			axios.post(`${API_URL}/api/v1/notice`, {
				"content": content,
				"title": title
			},{
				headers : header
			})
			.then(res => {
				fetchNotice();
			})
			.catch(error => {
				ErrorHandle.errorHandle(error, true, saveNotice)
			});
		}else{
			axios.patch(`${API_URL}/api/v1/notice/${id}`, {
				"content": content,
				"title": title
			},{
				headers : header
			})
			.then(res => {
				console.log(res);
				fetchNotice();
			})
			.catch(error => {
				ErrorHandle.errorHandle(error, true, saveNotice)
			});
		}
	}

	const deleteNotice = (id : number) => {
		axios.delete(`${API_URL}/api/v1/notice/${id}`,{
			headers : header
		})
		.then(res => {
			fetchNotice();
		})
		.catch(error => {
			ErrorHandle.errorHandle(error, deleteNotice);
		});
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
