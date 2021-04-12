import React, { createContext, useContext } from 'react';
import { childrenObj } from './Type';
import { usePadBoxState, usePadBoxDispatch } from './Model/PadBoxModel';

const SavePadBoxContext = createContext<(id: number, name: string, padAmount: number, temperature: number, humidity: number)=> void>((id: number, name: string, padAmount: number, temperature: number, humidity: number) => {});
const DeletePadBoxContext = createContext<(id:number)=> void>((id:number) => {});

const GetPadBoxContext = createContext<()=>void>(() => {});

export const PadBoxLogicProvider = ({ children } : childrenObj) => {
	const padBox = usePadBoxState();
	const padBoxDispatch = usePadBoxDispatch();

	const getPadBox = () => {
		// todo : get api call
		console.log("get and set pad box info");
	}

	const savepadBox = (id: number, name: string, padAmount: number, temperature: number, humidity: number, boxId: number, latitude: number, longitude: number, address: string) => {
		if(id === -1){
			padBoxDispatch([
				...padBox,
				{
					id: 3,
					boxId,
					latitude,
					longitude,
					name,
					address,
					padAmount,
					temperature,
					humidity,
					updatedStateDate: new Date(Date.now())
				}
			]);
		}else{
			const padBoxExcept = padBox.filter((value,index) => value.id !== id);
			padBoxDispatch([
				...padBoxExcept,
				{
					id: 3,
					name,
					address,
					padAmount,
					temperature,
					humidity,
					boxId,
					latitude,
					longitude,
					updatedStateDate: new Date(Date.now())
				}
			]);
		}
	}

	const deletepadBox = (id:number) => {
		padBoxDispatch(padBox.filter((value, index) => value.id !== id));
	}

	return (
		<GetPadBoxContext.Provider value={getPadBox}>
			<SavePadBoxContext.Provider value={getPadBox}>
				<DeletePadBoxContext.Provider value={deletepadBox}>
					{children}
				</DeletePadBoxContext.Provider>
			</SavePadBoxContext.Provider>
		</GetPadBoxContext.Provider>
	);
}

export function useSavePadBox() {
	const context = useContext(SavePadBoxContext);
	return context;
}
export function useDeletePadBox() {
	const context = useContext(DeletePadBoxContext);
	return context;
}

export function useGetPadBox() {
	const context = useContext(GetPadBoxContext);
	return context;
}