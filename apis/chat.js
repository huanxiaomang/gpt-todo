import request from '../utlis/request'

/**
 * 向gpt发送请求
 * @param {String} account - 用户名
 * @param {String} token - 密匙
 * @returns Promise
 */
export const questionToGpt = ({
	token,
	question
}) => {
	return request('/chat', 'post', {
		token,
		question
	})
}