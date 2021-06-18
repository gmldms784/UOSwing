export type noticeType = {
	id: number,
	title: string,
	createdDate: String,
	content: string
};

export type padBoxType = {
	address: string,
	humidity: number,
	id: number,
	isReported: boolean,
	latitude: number,
	longitude: number,
	name: string,
	padAmount: number,
	temperature: number,
};

// marker를 합쳐서 표현하기 위해 type 추가
export type markerType = {
	[address : string ] : markerValueType
};
//

export type markerValueType = {
	number: number, // 생리대 함 몇 개가 해당 건물에 속해있는지
	isReported: boolean,
	latitude: number,
	longitude: number,
	name: string,
	padAmount: number
}

export type padBoxAddressType = {
	address: string,
	latitude: number,
	longitude: number
}

export type statisticsType = {
	padBoxId: number,
	padBoxName: string,
	amount: number
}

export type reportType = {
	id: number,
	tag: string,
	content: string,
	isResolved: boolean,
	createdDate: Date,
	padBoxId: number
}

// <--- ReportByTag
export type reportbyTagType = {
	[tag : string] : reportValueType
};

export type reportValueType = {
	amount : number
}
// ReportByTag --->

type authArray = ["admin", "user"]

export type userType = {
	auth: authArray[number]
}

export type childrenObj = {
	children : React.ReactChild
}