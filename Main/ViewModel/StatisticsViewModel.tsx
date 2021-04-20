import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../CommonVariable';

import { ErrorHandle } from '../../Function/ErrorHandling';
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
		.catch(error => {
			ErrorHandle.errorHandle(error, true, getStatisticsData);
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
