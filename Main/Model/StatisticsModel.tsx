import React, { useState, useContext, createContext, Dispatch } from 'react';
import { statisticsType, childrenObj } from '../Type';

const statisticsWeekContext = createContext<statisticsType[]>([]);
const statisticsWeekDispatch = createContext<Dispatch<statisticsType[]>>(() => {});
const statisticsMonthContext = createContext<statisticsType[]>([]);
const statisticsMonthDispatch = createContext<Dispatch<statisticsType[]>>(() => {});

export const StatisticsContextProvider = ({ children }: childrenObj) => {
	const [statisticsWeek, setStatisticsWeek] = useState<statisticsType[]>([]);
	const [statisticsMonth, setStatisticsMonth] = useState<statisticsType[]>([]);

	return (
		<statisticsWeekContext.Provider value={statisticsWeek}>
			<statisticsWeekDispatch.Provider value={setStatisticsWeek}>
				<statisticsMonthContext.Provider value={statisticsMonth}>
					<statisticsMonthDispatch.Provider value={setStatisticsMonth}>
						{children}
					</statisticsMonthDispatch.Provider>
				</statisticsMonthContext.Provider>
			</statisticsWeekDispatch.Provider>
		</statisticsWeekContext.Provider>
	);
};

export function useStatisticsWeekState() {
	const context = useContext(statisticsWeekContext);
	return context;
};

export function useStatisticsWeekDispatch() {
	const context = useContext(statisticsWeekDispatch);
	return context;
};

export function useStatisticsMonthState() {
	const context = useContext(statisticsMonthContext);
	return context;
};

export function useStatisticsMonthDispatch() {
	const context = useContext(statisticsMonthDispatch);
	return context;
};

