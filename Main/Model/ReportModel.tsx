import React, { useState, useContext, createContext, Dispatch } from 'react';
import { reportType, childrenObj } from '../Type';

const reportState = createContext<Array<reportType>>([]);
const reportDispatch = createContext<Dispatch<Array<reportType>>>(()=>{});

export const ReportContextProvider = ({ children }: childrenObj) => {

	const [reportData, setReportData] = useState<Array<reportType>>([]);

	return (
		<reportState.Provider value={reportData}>
			<reportDispatch.Provider value={setReportData}>
				{children}
			</reportDispatch.Provider>
		</reportState.Provider>
	);
};

export function useReportState() {
	const context = useContext(reportState);
	return context;
}

export function useReportDispatch() {
	const context = useContext(reportDispatch);
	return context;
}