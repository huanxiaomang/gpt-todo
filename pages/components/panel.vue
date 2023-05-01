<template>
	<view class="panel">
		<template v-if="history.role=='user'">
			<view class="time">
				{{history.time}}
			</view>
			<view class="avatar">
				<view class="img" style="margin-left: 550rpx;">
					<image src="../../static/user.png" style="width: 30px; height: 30px;"></image>
				</view>
			</view>
			<view class="content">
				<uni-card :is-shadow="false">
					{{history.content}}
				</uni-card>
			</view>
		</template>
		<template v-else>
			<view class="time">
				{{history.time}}
			</view>
			<view class="avatar">
				<view class="img">
					<image src="../../static/assistant.png" style="width: 30px; height: 30px;"></image>
				</view>
			</view>
			<view class="content">
				<uni-card :is-shadow="false" style="background-color: #8fcbff;">
					{{history.content}}
				</uni-card>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: ['history'],
	}
</script>

<style lang="scss" scoped>
	.panel {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.time {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: -55rpx;
	}
</style>