import axios from "axios";
import {
	UniAdapter
} from "uniapp-axios-adapter";

const request = axios.create({
	baseURL: "http://1.117.61.181:5173/",
	timeout: 10000,
	adapter: UniAdapter,
});

request.interceptors.request.use((config) => {
	// 如果本地又token就在头部携带
	// 获取用户本地存储，判断是否有token
	// if (profile.token) {
	// 	config.headers.Authorization = `${profile.token}`
	// }
	return config;
});

request.interceptors.response.use((response) => {
	// 统一处理响应,返回Promise以便链式调用
	if (response.status === 200) {
		const {
			data
		} = response;
		if (data && data.code === 200) {
			return Promise.resolve(data);
		} else {
			return Promise.reject(data);
		}
	} else {
		return Promise.reject(response);
	}
});

export default request;