import React from 'react';
import { LogicProvider } from './ViewModel/ViewModel';
import { NoticeContextProvider, PadBoxContextProvider, StatisticsContextProvider, UserContextProvider } from './Model';
import { MainRouter } from '../Router';

const Provider = () => {
	const a = 1;
	return (
		<UserContextProvider>
			<NoticeContextProvider>
				<PadBoxContextProvider>
					<StatisticsContextProvider>
						<LogicProvider>
							<MainRouter />
						</LogicProvider>
					</StatisticsContextProvider>
				</PadBoxContextProvider>
			</NoticeContextProvider>
		</UserContextProvider>
	);
};

export default Provider;
