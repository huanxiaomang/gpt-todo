<template>
	<view class="login">
		<view class="form-aside">
			<uni-forms :modelValue="formData" label-position="top">
				<uni-forms-item label="姓名" name="name">
					<uni-easyinput type="text" v-model="formData.username" placeholder="请输入用户名" />

				</uni-forms-item>
				<uni-forms-item label="密码" name="password">

					<uni-easyinput type="password" v-model="formData.password" placeholder="请输入密码" />
				</uni-forms-item>
			</uni-forms>
			<button class="login-button" @click="submitForm">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: ''
				}
			};
		},
		methods: {
			submitForm() {}
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

		.form-aside {
			margin-top: -400rpx;
			height: 500rpx;
			width: 90vw;

			.login-button {
				width: 480rpx;

			}
		}
	}
</style>