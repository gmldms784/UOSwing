import React, { useState, useContext, createContext, Dispatch } from 'react';
import { statisticsType, childrenObj } from '../Type';

const statisticsContext = createContext<statisticsType[]>([]);

export const StatisticsContextProvider = ({ children }: childrenObj) => {
	const [statistics, setStatistics] = useState<statisticsType[]>([{
		padBoxId: 1,
		padBoxName: "미래관 2층",
		amount: 5
	}, {
		padBoxId: 2,
		padBoxName: "도서관 1층",
		amount: 8
	}, {
		padBoxId: 3,
		padBoxName: "전농관",
		amount: 16
	}, {
		padBoxId: 4,
		padBoxName: "학관 2층",
		amount: 6
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

