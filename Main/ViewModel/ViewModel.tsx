
import React, { createContext, useContext } from 'react';
import { childrenObj } from '../Type';
import { NoticeLogicProvider } from '.';
import { usePadBoxState, usePadBoxDispatch } from '../Model/PadBoxModel';

export const LogicProvider = ({ children } : childrenObj) => (
	<NoticeLogicProvider>
		<PadBoxLogicProvider>
			{children}
		</PadBoxLogicProvider>
	</NoticeLogicProvider>
);

const GetPadBoxContext = createContext<()=>void>(() => {});

const PadBoxLogicProvider = ({ children } : childrenObj) => {
	const padBox = usePadBoxState();
	const padBoxDispatch = usePadBoxDispatch();

	const getPadBox = () => {
		// todo : get api call
		console.log("get and set pad box info");
	}

	return (
		<GetPadBoxContext.Provider value={getPadBox}>
			{children}
		</GetPadBoxContext.Provider>
	);
}

export function useGetPadBox() {
	const context = useContext(GetPadBoxContext);
	return context;
}