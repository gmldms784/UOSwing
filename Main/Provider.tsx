import React from 'react';
import { LogicProvider } from './ViewModel';
import { NoticeContextProvider, PadBoxContextProvider } from './Model';
import { MainRouter } from '../Router';

const Provider = () => {
	const a = 1;
	return (
		<NoticeContextProvider>
			<PadBoxContextProvider>
				<LogicProvider>
					<MainRouter />
				</LogicProvider>
			</PadBoxContextProvider>
		</NoticeContextProvider>
	);
};

export default Provider;
