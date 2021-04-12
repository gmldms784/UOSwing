
import React, { createContext, useContext } from 'react';
import { childrenObj } from '../Type';
import { NoticeLogicProvider, PadBoxLogicProvider, ReportLogicProvider } from './';

export const LogicProvider = ({ children } : childrenObj) => (
	<NoticeLogicProvider>
		<PadBoxLogicProvider>
			<ReportLogicProvider>
				{children}
			</ReportLogicProvider>
		</PadBoxLogicProvider>
	</NoticeLogicProvider>
);