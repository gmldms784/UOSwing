const MAX_PAD = 22;
const BASE = Math.ceil(MAX_PAD / 5);
export function getPadNumber(num : number){
	if(num >= MAX_PAD){
		return `${MAX_PAD}개`;
	}else if (num > BASE*4){
		return `${BASE*4}~${MAX_PAD}개`
	}else if(num > BASE*3){
		return `${BASE*3}~${BASE*4}개`;
	}else if(num > BASE*2){
		return `${BASE*2}~${BASE*3}개`;
	}else if(num > BASE){
		return `${BASE}~${BASE*2}개`;
	}else if(num > 0){
		return `1~${BASE}개`;
	}else{
		return `0개`;
	}
}