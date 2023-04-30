import axios from "axios";
import {
	UniAdapter
} from "uniapp-axios-adapter";
const instance = axios.create({
	baseURL: "http://1.117.61.181:5173",
	timeout: 10000,
	adapter: UniAdapter, // 指定适配器
});
instance.interceptors.request.use((config) => {
	// 如果本地有token就在头部携带
	// 获取用户本地存储，判断是否有token
	const token = uni.getStorageSync('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config;
});

instance.interceptors.response.use((response) => {
	return response.data
}, (error) => {
	// token过期处理，让用户重新登录
});
// 请求工具函数
export default (url, method = 'get', submitData) => {
	// 负责发请求：请求地址，请求方式，提交的数据
	return instance({
		url,
		method,
		// 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
		// 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
		// [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
		// method参数：get,Get,GET  转换成小写再来判断
		// 在对象，['params']:submitData ===== params:submitData 这样理解
		[method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
	})
}