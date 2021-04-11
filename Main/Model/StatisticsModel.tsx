import React, { useState, useContext, createContext, Dispatch } from 'react';
import { statisticsType, childrenObj } from '../Type';

const statisticsContext = createContext<statisticsType[]>([]);

export const StatisticsContextProvider = ({ children }: childrenObj) => {
	const [statistics, setStatistics] = useState<statisticsType[]>([{
		id: 1,
		boxName: "미래관 2층",
		usedAmount: 28,
		createdDate: new Date(Date.now())
	}, {
		id: 2,
		boxName: "중앙도서관 1층",
		usedAmount: 14,
		createdDate: new Date(Date.now())
	}, {
		id: 3,
		boxName: "학생회관 2층",
		usedAmount: 25,
		createdDate: new Date(Date.now())
	}, {
		id: 4,
		boxName: "어디여찌",
		usedAmount: 8,
		createdDate: new Date(Date.now())
	}]);

	return (
		<statisticsContext.Provider value={statistics}>
			{children}
		</statisticsContext.Provider>
	);
};

export function useStatisticsState() {
	const context = useContext(statisticsContext);
	return context;
};

