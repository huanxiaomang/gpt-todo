<template>
	<view class="content">
		<view class="text-area">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {

		},
		methods: {

		},
		mounted() {
			// 判断本地是否存储了token，没有跳转登录页
			const token = uni.getStorageSync('token');
			if (!token) {
				uni.redirectTo({
					url: '../login/login',
				});
			}
		}
	}
</script>

<style lang="scss">

</style>