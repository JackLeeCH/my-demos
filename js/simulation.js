"use strict";

var str = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨一二三四五六七八九十";
//随机固定长度的字符串
function randomString(str, num){
	var len = str.length;
	var random_str = "";
	for(var i=0; i<num; i++){
		var index = randomRound(0, len-1);
		var s = str.substr(index, 1);
		random_str += s;
	}
	return random_str;
}

//随机整数
function randomRound(min, max){
	return Math.round(min+Math.random()*(max-min));
}

//随机小数
function randomFloor(min, max, num){
	return (min+Math.random()*(max-min)).toFixed(num);
}