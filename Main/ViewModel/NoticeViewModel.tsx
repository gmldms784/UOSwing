import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../CommonVariable';

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
			console.log(res.data);
		})
		.catch(e => {
			if (e.response) {
				// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
				console.log(e.response.data);
				console.log(e.response.status);
				console.log(e.response.headers);
			}
			else if (e.request) {
				// 요청이 이루어 졌으나 응답을 받지 못했습니다.
				// `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
				// Node.js의 http.ClientRequest 인스턴스입니다.
				console.log(e.request);
			}
			else {
				// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
				console.log('Error', e.message);
			}
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
				console.log(res);
				fetchNotice();
			})
			.catch(e => {
				if (e.response) {
					// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
					console.log(e.response.data);
					console.log(e.response.status);
					console.log(e.response.headers);
				}
				else if (e.request) {
					// 요청이 이루어 졌으나 응답을 받지 못했습니다.
					// `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
					// Node.js의 http.ClientRequest 인스턴스입니다.
					console.log(e.request);
				}
				else {
					// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
					console.log('Error', e.message);
				}
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
			.catch(e => {
				if (e.response) {
					// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
					console.log(e.response.data);
					console.log(e.response.status);
					console.log(e.response.headers);
				}
				else if (e.request) {
					// 요청이 이루어 졌으나 응답을 받지 못했습니다.
					// `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
					// Node.js의 http.ClientRequest 인스턴스입니다.
					console.log(e.request);
				}
				else {
					// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
					console.log('Error', e.message);
				}
			});
		}
	}

	const deleteNotice = (id : number) => {
		axios.delete(`${API_URL}/api/v1/notice/${id}`,{
			headers : header
		})
		.then(res => {
			console.log(res);
			fetchNotice();
		})
		.catch(e => {
			if (e.response) {
				// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
				console.log(e.response.data);
				console.log(e.response.status);
				console.log(e.response.headers);
			}
			else if (e.request) {
				// 요청이 이루어 졌으나 응답을 받지 못했습니다.
				// `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
				// Node.js의 http.ClientRequest 인스턴스입니다.
				console.log(e.request);
			}
			else {
				// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
				console.log('Error', e.message);
			}
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
