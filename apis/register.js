import request from '../utlis/request'

/**
 * 帐号注册
 * @param {String} account - 用户名
 * @param {String} password - 密码
 * @returns Promise
 */
export const userAccountRegister = ({
	username,
	password
}) => {
	return request('/register', 'post', {
		username,
		password
	})
}