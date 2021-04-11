import React, { useState, useContext, createContext, Dispatch } from 'react';
import { padBoxType, childrenObj } from '../Type';

const padBoxState = createContext<Array<padBoxType>>([]);
const padBoxDispatch = createContext<Dispatch<Array<padBoxType>>>(()=>{});

export const PadBoxContextProvider = ({ children }: childrenObj) => {
	const initialState : Array<padBoxType> = [{
		id: 1,
		boxId: 1,
		latitude: 37.5842410,
		longitude: 127.0562571,
		name: "미래관 2층",
		address: "서울시립대학교 미래관",
		padAmount: 0,
		temperature: 25,
		humidity: 80,
		updatedStateDate: new Date("2021-03-29T03:30:00")
	}, {
		id: 2,
		boxId: 2,
		latitude: 37.5847995,
		longitude: 127.0621226,
		name: "중앙도서관 1층",
		address: "서울시립대학교 중앙도서관",
		padAmount: 12,
		temperature: 27,
		humidity: 50,
		updatedStateDate: new Date("2021-03-29T03:30:00")
	}, {
		id: 3,
		boxId: 3,
		latitude: 37.5847995,
		longitude: 127.0621226,
		name: "중앙도서관 1층",
		address: "서울시립대학교 중앙도서관",
		padAmount: 12,
		temperature: 27,
		humidity: 50,
		updatedStateDate: new Date("2021-03-29T03:30:00")
	}];

	const [padBoxData, setPadBoxDate] = useState<Array<padBoxType>>(initialState);

	return (
		<padBoxState.Provider value={padBoxData}>
			<padBoxDispatch.Provider value={setPadBoxDate}>
				{children}
			</padBoxDispatch.Provider>
		</padBoxState.Provider>
	);
};

export function usePadBoxState() {
	const context = useContext(padBoxState);
	return context;
}

export function usePadBoxDispatch() {
	const context = useContext(padBoxDispatch);
	return context;
}