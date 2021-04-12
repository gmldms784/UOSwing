import React, { createContext, useContext } from 'react';
import { childrenObj } from '../Type';
import { useReportState, useReportDispatch } from '../Model/ReportModel';

const SaveReportContext = createContext<(id: number, tag: string, content: string, box_id: number)=> void>((id: number, tag: string, content : string, box_id: number) => {});
const DeleteReportContext = createContext<(id: number)=> void>((id: number) => {});

export const ReportLogicProvider = ({ children } : childrenObj) => {
	const report = useReportState();
	const reportDispatch = useReportDispatch();

	const saveReport = (id: number, tag: string, content : string, box_id: number) => {
		if(id === -1){
			// todo : add new report api call
			// todo : get api call

			// 임시코드
			reportDispatch([
				...report,
				{
					id: 3,
					tag,
					content,
					createdDate: new Date(Date.now()),
					isResolved: false,
					box_id
				}
			]);
		}else{
			// todo : add update report api call
			// todo : get api call

			// 임시코드
			const reportExcept = report.filter((value, index) => value.id !== id);
			reportDispatch([
				...reportExcept,
				{
					id: id,
					tag,
					content,
					createdDate: new Date(Date.now()),
					isResolved: false,
					box_id
				}
			]);
		}
	}

	const deleteReport = (id : number) => {
		// todo : delete report api call
		// todo : get api call

		// 임시코드
		reportDispatch(report.filter((value, index) => value.id !== id));
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
