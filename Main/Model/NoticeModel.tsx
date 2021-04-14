import React, { useState, useContext, createContext, Dispatch, useEffect } from 'react';

import { noticeType, childrenObj } from '../Type';

const noticeState = createContext<Array<noticeType>>([]);
const noticeDispatch = createContext<Dispatch<Array<noticeType>>>(()=>{});

export const NoticeContextProvider = ({ children }: childrenObj) => {
	const [noticeData, setNoticeDate] = useState<Array<noticeType>>([]);

	return (
		<noticeState.Provider value={noticeData}>
			<noticeDispatch.Provider value={setNoticeDate}>
				{children}
			</noticeDispatch.Provider>
		</noticeState.Provider>
	);
};

export function useNoticeState() {
	const context = useContext(noticeState);
	return context;
}

export function useNoticeDispatch() {
	const context = useContext(noticeDispatch);
	return context;
}