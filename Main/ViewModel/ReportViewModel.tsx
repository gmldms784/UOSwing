import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../CommonVariable';

import { childrenObj } from '../Type';
import { ErrorHandle } from '../../Function/ErrorHandling';

import { useHeader, useUserState } from '../Model/UserModel';
import { useReportState, useReportDispatch } from '../Model/ReportModel';
import { Alert } from 'react-native';

const SaveReportContext = createContext<(id: number, tag: string, content: string, padBoxId: number)=> void>((id: number, tag: string, content : string, padBoxId: number) => {});
const DeleteReportContext = createContext<(id: number)=> void>((id: number) => {});

export const ReportLogicProvider = ({ children } : childrenObj) => {
	const report = useReportState();
	const reportDispatch = useReportDispatch();
	const header = useHeader();

	useEffect(() => {
		if(header['X-AUTH-TOKEN'] != "" )
			fetchReport();
	}, [header])

	const fetchReport = () => {
		axios.get(`${API_URL}/api/v1/report`,{
			headers : header
		})
		.then(res => {
			//console.log(res.data);
			reportDispatch(res.data);
		})
	}

	const saveReport = (id: number, tag: string, content : string, padBoxId: number) => {
		if(id === -1){
			axios.post(`${API_URL}/api/v1/report`, {
				"content": content,
				"isResolved": false,
				"padBoxId": padBoxId,
				"tag": tag
			})
			.then(res => {
				console.log("성공");
			})
			.catch(error => {
				ErrorHandle.errorHandle(error, true, saveReport);
			});
		}else{
			axios.patch(`${API_URL}/api/v1/report/${id}`,{
				"isResolved": true,
			},{
				headers: header
			})
			.then(res => {
				fetchReport();
			})
			.catch(error => {
				ErrorHandle.errorHandle(error, true, saveReport);
			})
		}
	}

	const deleteReport = (id : number) => {
		axios.delete(`${API_URL}/api/v1/report/${id}`,{
			headers: header
		})
		.then(res => {
			console.log(res);
			fetchReport();
			Alert.alert("정상 처리되었습니다. 다른 관리자에게도 해결한 내용을 공유해주세요.")
		})
		.catch(error => {
			ErrorHandle.errorHandle(error, true, deleteReport);
		})
	}

	return (
		<SaveReportContext.Provider value={saveReport}>
			<DeleteReportContext.Provider value={deleteReport}>
				{children}
			</DeleteReportContext.Provider>
		</SaveReportContext.Provider>
	);
};

export function useSaveReport() {
	const context = useContext(SaveReportContext);
	return context;
}
export function useDeleteReport() {
	const context = useContext(DeleteReportContext);
	return context;
}
