import React, { useState, useContext, createContext, Dispatch } from 'react';
import { padBoxType, padBoxAddressType, childrenObj } from '../Type';

const padBoxAddress = createContext<Array<padBoxAddressType>>([]);
const padBoxState = createContext<Array<padBoxType>>([]);
const padBoxDispatch = createContext<Dispatch<Array<padBoxType>>>(()=>{});

// 생리대함 저장 모델
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
	},{
		latitude: 37.58368320415692,
		longitude: 127.05659395536105,
		address: "서울시립대학교 전농관",
	},{
		latitude: 37.582959063488225,
		longitude: 127.05661576585634,
		address: "서울시립대학교 경농관",
	},{
		latitude: 37.5822190395178,
		longitude: 127.05679360272518,
		address: "서울시립대학교 법학관"
	},{
		latitude: 37.58247002661221,
		longitude: 127.05651692902639,
		address: "서울시립대학교 웰니스센터",
	},{
		latitude: 37.58321075722608,
		longitude: 127.05870788562348,
		address: "서울시립대학교 21세기관",
	},{
		latitude: 37.58395740619673,
		longitude: 127.05792273053224,
		address: "서울시립대학교 건설공학관"
	},{
		latitude: 37.584964777860634,
		longitude: 127.05849103326494,
		address: "서울시립대학교 제1공학관"
	},{
		latitude: 37.5847870073811,
		longitude: 127.05906681366517,
		address: "서울시립대학교 제2공학관"
	},{
		latitude: 37.58478108169115,
		longitude: 127.05968746007065,
		address: "서울시립대학교 배봉관"
	},{
		latitude: 37.582659654372854,
		longitude: 127.05911915733793,
		address: "서울시립대학교 자연과학관"
	},{
		latitude: 37.58316927650815,
		longitude: 127.05974728141094,
		address: "서울시립대학교 대강당"
	},{
		latitude: 37.58537672548861,
		longitude: 127.05753824879079,
		address: "서울시립대학교 과학기술관"
	},{
		latitude: 37.584654147121405,
		longitude: 127.06067332999642,
		address: "서울시립대학교 창공관"
	},{
		latitude: 37.58415854184297,
		longitude: 127.05622774683799,
		address: "서울시립대학교 조형관"
	}];

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