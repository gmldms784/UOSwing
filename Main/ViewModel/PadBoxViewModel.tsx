import React, { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../CommonVariable';

import { childrenObj, padBoxParmeter } from '../Type';
import { useHeader } from '../Model/UserModel';
import { usePadBoxState, usePadBoxDispatch } from '../Model/PadBoxModel';

const GetPadBoxContext = createContext<()=>void>(() => {});
const SavePadBoxContext = createContext<(
	address: string,
	id: number,
	latitude: number,
	longitude: number,
	name: string,)=> void>((
		address: string,
		id: number,
		latitude: number,
		longitude: number,
		name: string,) => {});
const DeletePadBoxContext = createContext<(id:number)=> void>((id:number) => {});

export const PadBoxLogicProvider = ({ children } : childrenObj) => {
	const padBox = usePadBoxState();
	const padBoxDispatch = usePadBoxDispatch();
	const header = useHeader();

	useEffect(()=>{
		// padBox 데이터 읽어오기
		fetchPadBox();

	}, [])

	const errorCatch = (e:any) => {
		if(e.response) {
			console.log("error catch");
			console.log(e.response.data);
			console.log(e.response.status);
			console.log(e.response.headers);
		}
		else if(e.request) {
			console.log("error catch");
			console.log(e.request);
		}
		else { console.log('Error', e.message); }
	}

	const fetchPadBox = () => {
		axios.get(`${API_URL}/api/v1/padbox`)
		.then(res => {
			padBoxDispatch(res.data)
			console.log("padBoxDispatch --------- " + res.data);
		})
		.catch(e => errorCatch(e))
	}

	const getpadBox = () => {
		fetchPadBox();
	}

	const savepadBox = (
		address: string,
		id: number,
		latitude: number,
		longitude: number,
		name: string,
		) => {
		if(id === -1){
			// 새로운 padbox
			axios.post(`${API_URL}/api/v1/padbox`, {
				"address": address,
				"humidity": 0,
				"id": id,
				"latitude": latitude,
				"longitude": longitude,
				"name": name,
				"padAmount": 0,
				"temperature": 0
			},{
				headers : header
			})
			.then(res => {
				console.log(res);
				fetchPadBox();
			})
			.catch(e=>errorCatch(e))
		}else{
			axios.patch(`${API_URL}/api/v1/padbox/${id}`, {
				"address": address,
				"latitude": latitude,
				"longitude": longitude,
				"name": name
			},{
				headers: header
			})
			.then(res => {
				console.log(res);
				fetchPadBox();
			})
			.catch(e=>errorCatch(e))
		}
	}

	const deletepadBox = (id:number) => {
		axios.delete(`${API_URL}/api/v1/padbox/${id}`,{
			headers: header
		})
		.then(res => {
			console.log(res);
			fetchPadBox();
		})
		.catch(e=>errorCatch(e))
	}

	return (
		<GetPadBoxContext.Provider value={getpadBox}>
			<SavePadBoxContext.Provider value={savepadBox}>
				<DeletePadBoxContext.Provider value={deletepadBox}>
					{children}
				</DeletePadBoxContext.Provider>
			</SavePadBoxContext.Provider>
		</GetPadBoxContext.Provider>
	);
}

export function useGetPadBox() {
	const context = useContext(GetPadBoxContext);
	return context;
}
export function useSavePadBox() {
	const context = useContext(SavePadBoxContext);
	return context;
}
export function useDeletePadBox() {
	const context = useContext(DeletePadBoxContext);
	return context;
}