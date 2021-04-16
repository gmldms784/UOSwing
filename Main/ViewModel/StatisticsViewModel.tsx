import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../CommonVariable';
import { statisticsType, childrenObj } from '../Type';
import { useStatisticsWeekDispatch, useStatisticsMonthDispatch } from '../Model/StatisticsModel';
import { useHeader, useUserLogin, useUserState } from '../Model/UserModel';

const GetStatisticsContext = createContext<(period : number) => void>((period : number)=>{});

export const StatisticsLogicProvider = ({ children } : childrenObj) => {
	const weekDispatch = useStatisticsWeekDispatch();
	const monthDispatch = useStatisticsMonthDispatch();
	const header = useHeader();
	const user = useUserState();

	useEffect(()=>{
		if(user.auth === "user")
			return;
		getStatisticsData(7);
		getStatisticsData(30);
	});

	const getStatisticsData = (period : number) => {
		axios.get(`${API_URL}/api/v1/statistics/${period}`, {
			headers : header
		})
		.then(res => {
			const data : statisticsType[] = res.data;
			if(period === 7){
				weekDispatch(data);
			}else{
				monthDispatch(data);
			}
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
		<GetStatisticsContext.Provider value={getStatisticsData}>
			{children}
		</GetStatisticsContext.Provider>
	);
}

export function useGetStatistics() {
	const context = useContext(GetStatisticsContext);
	return context;
}
