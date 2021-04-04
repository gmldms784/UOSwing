import React from 'react';
import { NoticeContextProvider, PadBoxContextProvider } from './Model';
import { MainRouter } from '../Router';

const Provider = () => {
	const a = 1;
	return (
		<NoticeContextProvider>
			<PadBoxContextProvider>
				<MainRouter />
			</PadBoxContextProvider>
		</NoticeContextProvider>
	);
};

export default Provider;
