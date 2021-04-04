import React from 'react';
import { LogicProvider } from './ViewModel';
import { NoticeContextProvider, PadBoxContextProvider, StatisticsContextProvider, UserContextProvider } from './Model';
import { MainRouter } from '../Router';

const Provider = () => {
	const a = 1;
	return (
		<NoticeContextProvider>
			<PadBoxContextProvider>
				<StatisticsContextProvider>
					<UserContextProvider>
						<LogicProvider>
							<MainRouter />
						</LogicProvider>
					</UserContextProvider>
				</StatisticsContextProvider>
			</PadBoxContextProvider>
		</NoticeContextProvider>
	);
};

export default Provider;
