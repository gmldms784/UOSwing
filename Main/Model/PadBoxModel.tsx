import React, { useState, useContext, createContext, Dispatch } from 'react';
import { padBoxType, padBoxAddressType, childrenObj } from '../Type';

const padBoxAddress = createContext<Array<padBoxAddressType>>([]);
const padBoxState = createContext<Array<padBoxType>>([]);
const padBoxDispatch = createContext<Dispatch<Array<padBoxType>>>(()=>{});

export const PadBoxContextProvider = ({ children }: childrenObj) => {
	const [padBoxData, setPadBoxData] = useState<Array<padBoxType>>([]);
	const padBoxAddressData:Array<padBoxAddressType> = [{
		latitude: 37.5842410,
		longitude: 127.0562571,
		address: "서울시립대학교 미래관",
	},{
		latitude: 37.5847995,
		longitude: 127.0621226,
		address: "서울시립대학교 중앙도서관",
	},{
		latitude: 37.5830739,
		longitude: 127.0608094,
		address: "서울시립대학교 정보기술관",
	},{
		latitude: 37.5839009,
		longitude: 127.0611105,
		address: "서울시립대학교 인문학관",
	},{
		latitude: 37.5841705,
		longitude: 127.0619669,
		address: "서울시립대학교 음악관",
	},{
		latitude: 37.5855821,
		longitude: 127.0629398,
		address: "서울시립대학교 생활관",
	},{
		latitude: 37.58387082374851,
		longitude: 127.06005064001766,
		address: "서울시립대학교 학생회관",
	},{
		latitude: 37.58416573831463,
		longitude: 127.05564125536117,
		address: "서울시립대학교 100주년 기념관",
	},]; // 전농관, 경농관, 웰니스, 21세기관, 건공관, 제1공, 제2공, 배봉관, 대강당, 자과관, 경상관, 과학기술관,

	return (
		<padBoxState.Provider value={padBoxData}>
			<padBoxDispatch.Provider value={setPadBoxData}>
				<padBoxAddress.Provider value={padBoxAddressData}>
					{children}
				</padBoxAddress.Provider>
			</padBoxDispatch.Provider>
		</padBoxState.Provider>
	);
};

export function usePadBoxAddress() {
	const context = useContext(padBoxAddress);
	return context;
}

export function usePadBoxState() {
	const context = useContext(padBoxState);
	return context;
}

export function usePadBoxDispatch() {
	const context = useContext(padBoxDispatch);
	return context;
}