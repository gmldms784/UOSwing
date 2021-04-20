import React, { useState, useContext, createContext, Dispatch } from 'react';
import axios from 'axios';
import { API_URL } from '../../CommonVariable';
import { ErrorHandle } from '../../Function/ErrorHandling';
import { userType, childrenObj } from '../Type';

const userContext = createContext<userType>({
	auth: "user"
});
const headerContext = createContext<{"X-AUTH-TOKEN": string}>({"X-AUTH-TOKEN": ""}); // 관리자 api 호출 시 사용할 header
const loginContext = createContext<(key: string) => boolean>((key: string) => { return true });
const userLoginContext = createContext<() => void>(() => { });

export const UserContextProvider = ({ children }: childrenObj) => {
	const [user, setUser] = useState<userType>({
		auth: "user"
	});
	const [header, setHeader] = useState<{"X-AUTH-TOKEN": string }>({ "X-AUTH-TOKEN": "" });

	const login = async (key: string): boolean => {
		const status = await axios.post(`${API_URL}/api/v1/admin/login`, {
			"email": "samsam-uos@gmail.com",
			"password": key
		})
			.then(res => {
				const resKey: string = res.data;
				setHeader({
					"X-AUTH-TOKEN" : resKey
				});
				setUser({
					...user,
					auth: "admin"
				});
				return true;
			})
			.catch(error => {
				ErrorHandle.errorHandle(error, false, login);
				return false;
			});
		return status;
	};

	const userLogin = () => {
		setUser({
			...user,
			auth: "user"
		});
		setHeader({ "X-AUTH-TOKEN": "" });
	};

	return (
		<userContext.Provider value={user}>
			<headerContext.Provider value={header}>
				<loginContext.Provider value={login}>
					<userLoginContext.Provider value={userLogin}>
						{children}
					</userLoginContext.Provider>
				</loginContext.Provider>
			</headerContext.Provider>
		</userContext.Provider>
	);
};

export function useUserState() {
	const context = useContext(userContext);
	return context;
}

export function useHeader() {
	const context = useContext(headerContext);
	return context;
}

export function useLogin() {
	const context = useContext(loginContext);
	return context;
}

export function useUserLogin() {
	const context = useContext(userLoginContext);
	return context;
}

