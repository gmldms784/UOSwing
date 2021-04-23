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
	box_id: number
}

type authArray = ["admin", "user"]

export type userType = {
	auth: authArray[number] 
	// todo : 속성 더 있을 지 생각
}

export type childrenObj = {
	children : React.ReactChild
}