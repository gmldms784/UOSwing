import React, { useState, useContext, createContext, Dispatch } from 'react';
import { userType, childrenObj } from '../Type';

const userContext = createContext<userType>({
	auth: "user"
});
const loginContext = createContext<(key: string) => boolean>((key: string) => { return true });
const userLoginContext = createContext<() => void>(() => {});

export const UserContextProvider = ({ children }: childrenObj) => {
	const [user, setUser] = useState<userType>({
		auth: "user"
	});

	const login = (key: string): boolean => {
		// todo : key를 체크하는 api 호출해서 체크 필요
		// api response가 오면 token에 jwt token 저장됨
		// return은 key가 맞는지 아닌지 표시

		// 임시코드
		if (key === "admin") {
			setUser({
				...user,
				auth: "admin"
			});
			return true;
		} else {
			return false;
		}
	};

	const userLogin = () => {
		setUser({
			...user,
			auth: "user"
		});
	};

	return (
		<userContext.Provider value={user}>
			<loginContext.Provider value={login}>
				<userLoginContext.Provider value={userLogin}>
					{children}
				</userLoginContext.Provider>
			</loginContext.Provider>
		</userContext.Provider>
	);
};

export function useUserState() {
	const context = useContext(userContext);
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

