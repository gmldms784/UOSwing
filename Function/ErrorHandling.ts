import { AxiosError } from "axios";
import { Alert } from "react-native";

// 200 : 정상
// 400 : 문법 오류
// 401 : 인증 오류
// 404 : 리소스 없음

// 통신 오류를 다루는 클래스
export class ErrorHandle{
	private static _callNum: number;

	static initializeCallNum(){
		this._callNum = 0;
	}
	
	static errorHandle(error : AxiosError, alertOn : boolean, callback? : Function){
		if(error.response) {
			// 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
			console.log("error catch");
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
			if(alertOn){ // alert를 수행할 지 결정
				switch(error.response.status){
					case 400:
						Alert.alert("죄송합니다. 서비스에 문제가 생겼습니다. 신고하기를 통해 관리자에게 문의해주세요.");
						break;
					case 401:
						Alert.alert("권한 인증에 실패하였습니다.");
						break;
					case 403:
					case 404:
						Alert.alert("잘못된 접근입니다. 관리자에게 문의해주세요.");
						break;
					case 500:
						Alert.alert("서버의 응답이 없습니다. 잠시 후 다시 시도해주세요.");
						break;
				}
			}
		}
		else if(error.request) {
			// 요청이 이루어 졌으나 응답을 받지 못했습니다.
			// `error.request`는 XMLHttpRequest 인스턴스입니다.
			if(ErrorHandle._callNum < 1){
				// 1번 더 서버에 요청!
				Alert.alert("서버에 다시 요청합니다...");
				callback?.();
				this._callNum++;
			}else{
				this.initializeCallNum();
			}
			console.log("error catch");
			console.log(error.request);
		}
		else {
		// 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
		console.log('Error', error.message);
		}
		console.log(error.config);
	}
}