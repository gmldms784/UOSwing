import React, { useState, useContext, createContext, Dispatch } from 'react';
import { userType, childrenObj } from '../Type';

const userContext = createContext<userType>({
	auth: "admin"
});

export const UserContextProvider = ({ children }: childrenObj) => {
	const [user, setUser] = useState<userType>({
		auth: "admin"
	});

	return (
		<userContext.Provider value={user}>
			{children}
		</userContext.Provider>
	);
};

export function useUserState() {
	const context = useContext(userContext);
	return context;
}
