import request from '../utlis/request'

/**
 * 帐号登录
 * @param {String} account - 用户名
 * @param {String} password - 密码
 * @returns Promise
 */
export const userAccountLogin = ({
	username,
	password
}) => {
	return request('/login', 'post', {
		username,
		password
	})
}