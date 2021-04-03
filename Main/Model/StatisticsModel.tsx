import React, { useState, useContext, createContext, Dispatch } from 'react';
import { statisticsType, childrenObj } from '../Type';

const statisticsContext = createContext<statisticsType[]>([]);

export const StatisticsContextProvider = ({ children }: childrenObj) => {
	const [statistics, setStatistics] = useState<statisticsType[]>([{
		id: 1,
		boxName: "미래관 2층",
		usedAmount: 10,
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

