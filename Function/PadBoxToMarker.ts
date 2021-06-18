import { padBoxType, markerType } from '../Main/Type';

export default function padboxToMarker(padBoxArr : padBoxType[]) : markerType{
	// 생리대함을 마커로 변환하는 함수

	// address가 같으면 id는 array로 관리하기
	// padAmount는 같은 위치의 생리대함에서 합친 양으로 바꾸기
	// isReported는 하나라도 on이면 on 시키기
	
	const markers: markerType = {};
	padBoxArr.forEach((padBox) => {
		if(markers[padBox.address] === undefined) { // 없으면
			markers[padBox.address] = {
				number: 1,
				isReported: padBox.isReported,
				latitude: padBox.latitude,
				longitude: padBox.longitude,
				name: padBox.address,
				padAmount: padBox.padAmount
			}	
		}else{ // 겹치는 게 있으면
			markers[padBox.address].number++;
			markers[padBox.address].padAmount += padBox.padAmount;
			markers[padBox.address].isReported = markers[padBox.address].isReported || padBox.isReported;
		}
	});
	return markers;
}