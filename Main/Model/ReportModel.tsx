import React, { useState, useContext, createContext, Dispatch } from 'react';
import { reportType, childrenObj } from '../Type';

const reportState = createContext<Array<reportType>>([]);
const reportDispatch = createContext<Dispatch<Array<reportType>>>(()=>{});

export const ReportContextProvider = ({ children }: childrenObj) => {
	const initialState : Array<reportType> = [{
		id: 1,
		tag: "생리대함 파손",
		content: "생리대함이 빠개졌어요",
		isResolved: false,
		createdDate: new Date("2021-03-27"),
		box_id: 1
	}, {
		id: 2,
		tag: "열쇠 분실",
		content: "열쇠가 없네용",
		isResolved: false,
		createdDate: new Date("2021-04-08"),
		box_id: 2
	},{
		id: 3,
		tag: "열쇠 분실",
		content: "열쇠가 없네용 구구구 십십십 십이십 십삼삼 십사사 십오오 십육육 십칠칠 열하나 열두울 열세엣 열네엣",
		isResolved: false,
		createdDate: new Date("2021-04-08"),
		box_id: 3
	}];

	const [reportData, setReportData] = useState<Array<reportType>>(initialState);

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