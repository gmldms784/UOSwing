import { reportType, reportbyTagType } from '../Main/Type';

export default function reportByTag(reportArr : reportType[], padBoxId:number, tagData:string[]) : reportbyTagType {
	// tag 별 신고 개수 판단 함수
	
	const reportbytag: reportbyTagType = {};

	//reportbytag 초기화
	tagData.map((tag) => {
		reportbytag[tag] = { amount : 0 };
	})

	reportArr.forEach((report) => {
		if(report.padBoxId === padBoxId){
			reportbytag[report.tag].amount++;
		}
	});
	return reportbytag;
}