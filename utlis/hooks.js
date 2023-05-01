// 工具函数
//从dateTime转化为string类型，结果格式：YYYY-mm-DD HH:MM:SS
export const dateTimeTOString = (dateTime) => {
	let source = new Date(dateTime);
	let yy = source.getFullYear().toString();
	let mm = source.getMonth() + 1;
	mm = mm < 10 ? ('0' + mm.toString()) : mm.toString();
	let dd = source.getDate();
	dd = dd < 10 ? ('0' + dd.toString()) : dd.toString();
	let hh = source.getHours();
	hh = hh < 10 ? ('0' + hh.toString()) : hh.toString();
	let MM = source.getMinutes();
	MM = MM < 10 ? ('0' + MM.toString()) : MM.toString();
	let ss = source.getSeconds();
	ss = ss < 10 ? ('0' + ss.toString()) : ss.toString();
	let aa = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + MM + ':' + ss;
	return aa;
}