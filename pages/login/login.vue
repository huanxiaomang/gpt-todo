<template>
	<view class="login">
		<view class="title">GPT-TODO</view>
		<view class="form-aside">
			<uni-forms :model="formData" label-position="top" :rules="formRule" validate-trigger="bind">
				<uni-forms-item label="邮箱" name="username">
					<uni-easyinput type="text" v-model.trim="formData.username" placeholder="请输入邮箱" />

				</uni-forms-item>
				<uni-forms-item label="密码" name="password">

					<uni-easyinput type="password" v-model.trim="formData.password"
						placeholder="请输入6-18位只包含字符、数字和下划线的密码" />
				</uni-forms-item>
			</uni-forms>
			<view class="event">
				<text @click="toRegister">现在注册！</text>
				<button class="login-button" @click="submitForm">登录</button>
			</view>

		</view>
		<!-- 提示消息 -->
		<uni-popup ref="popup0" type="message">
			<uni-popup-message type="error" :message="msg" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="popup1" type="message">
			<uni-popup-message type="success" :message="msg" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="popup2" type="message">
			<uni-popup-message type="error" :message="msg" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="popup3" type="message">
			<uni-popup-message type="error" message="用户名或密码不能为空" :duration="2000"></uni-popup-message>
		</uni-popup>
		<uni-popup ref="popup4" type="message">
			<uni-popup-message type="error" message="当前网络未连接,请开启网络" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script>
	import w_md5 from "../../js_sdk/zww-md5/w_md5.js"
	import {
		userAccountLogin
	} from '../../apis/login';
	export default {
		data() {
			return {
				// 提交的登录数据
				formData: {
					username: '',
					password: ''
				},
				// 表单验证规则
				formRule: {
					username: {
						rules: [{
							required: true,
							format: 'email',
							errorMessage: '请输入正确的邮箱地址',
						}],
					},
					password: {
						rules: [{
							required: true,
							errorMessage: '请输入6-18位只包含字符、数字和下划线的密码',
							pattern: /^[a-zA-Z]\w{5,17}$/
						}]
					}
				},
				msg: ''
			};
		},
		methods: {
			submitForm() {
				// 对密码进行加密
				let username = this.formData.username
				let password = w_md5.hex_md5_32(this.formData.password)
				if (username == '' || password == '') {
					this.$refs.popup3.open('center')
					return
				}
				userAccountLogin({
					username,
					password
				}).then(res => {
					// res.code为0:用户名错误  1:登录成功  2:密码错误，登录失败！

					if (res == undefined) {
						this.$refs.popup4.open('center')
						return
					}
					this.msg = res.msg
					if (res.code == 0) {
						this.$refs.popup0.open('center')
					} else if (res.code == 1) {
						// 登录成功后，本地存储token，跳转首页
						this.$refs.popup1.open('center')
						uni.setStorageSync('token', res.token);
						uni.setStorageSync('username', res.username);
						uni.setStorageSync('count', res.count);
						uni.redirectTo({
							url: '../index/index',
						});
					} else if (res.code == 2) {
						this.$refs.popup2.open('center')
					}
				}).catch(err => {
					console.log(err);
				})
			},
			toRegister() {
				uni.navigateTo({
					url: '../register/register',
					animationType: 'pop-in',
					animationDuration: 200
				});
			}
		},
		mounted() {
			// 判断本地是否存储了token，有的话直接跳转到首页
			const token = uni.getStorageSync('token');
			if (token) {
				uni.redirectTo({
					url: '../index/index',
				});
			}
		}
	}
</script>

<style lang="scss">
	.login {
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 30rpx;

		.title {
			margin-top: -400rpx;
			padding-bottom: 50rpx;
			font-size: 50rpx;
		}

		.form-aside {
			height: 500rpx;
			width: 90vw;

			.login-button {
				width: 480rpx;

			}
		}
	}

	.event {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		text {
			margin-top: -20rpx;
			padding-bottom: 20rpx;
			color: rgb(5, 109, 232);
			cursor: pointer;
		}
	}
</style>