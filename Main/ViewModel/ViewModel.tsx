
import React, { createContext, useContext } from 'react';
import { childrenObj } from '../Type';
import { NoticeLogicProvider, PadBoxLogicProvider, ReportLogicProvider, StatisticsLogicProvider } from './';

export const LogicProvider = ({ children } : childrenObj) => (
	<NoticeLogicProvider>
		<PadBoxLogicProvider>
			<ReportLogicProvider>
				<StatisticsLogicProvider>
					{children}
				</StatisticsLogicProvider>
			</ReportLogicProvider>
		</PadBoxLogicProvider>
	</NoticeLogicProvider>
);