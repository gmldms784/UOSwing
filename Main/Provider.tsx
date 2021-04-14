import React from 'react';
import { LogicProvider } from './ViewModel/ViewModel';
import { NoticeContextProvider, PadBoxContextProvider, StatisticsContextProvider, UserContextProvider } from './Model';
import { MainRouter } from '../Router';
import { ReportContextProvider } from './Model/ReportModel';

const Provider = () => {
	const a = 1;
	return (
		<UserContextProvider>
			<NoticeContextProvider>
				<PadBoxContextProvider>
					<ReportContextProvider>
						<StatisticsContextProvider>
							<LogicProvider>
								<MainRouter />
							</LogicProvider>
						</StatisticsContextProvider>
					</ReportContextProvider>
				</PadBoxContextProvider>
			</NoticeContextProvider>
		</UserContextProvider>
	);
};

export default Provider;
