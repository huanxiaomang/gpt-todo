<template>
	<view class="chatgpt">
		<view class="container">
			<uni-card class="main">
				<!-- 页面滚动 -->
				<scroll-view scroll-y="true">
					<!-- 如果有对话就显示 -->
					<view v-if="history.length!=0">
						<Panel v-for="his in history" :history='his'></Panel>
					</view>
					<!-- 否则显示空状态 -->

					<view v-else>
						<view class="empty">
							<text>有什么需要我帮助吗？</text>
							<text>可以尝试向我提问。</text>
						</view>
					</view>
					<!-- 最后加一个垫底的节点 -->
					<view class="last-view">

					</view>
				</scroll-view>
			</uni-card>
			<view class="input">
				<uni-easyinput type="text" autoHeight v-model.trim="input" placeholder="请输入您的问题"></uni-easyinput>
				<view class="img" @click="send">
					<image src="../../static/send.png" style="width: 30px; height: 30px;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		questionToGpt
	} from '../../apis/chat'
	import {
		dateTimeTOString
	} from '../../utlis/hooks'
	import Panel from './panel.vue'

	export default {
		components: {
			Panel
		},
		data() {
			return {
				// 用户输入问题
				input: '',
				//  存储历史记录的数组
				history: [],

			}
		},
		methods: {
			// 点击发送后执行的函数
			send() {
				if (this.input == '') {
					return
				}
				let newHistory = []
				// 获取用户token
				let token = uni.getStorageSync('token')
				// 获取用户问题
				let question = this.input
				// 将用户问题存储到数组中
				newHistory.push({
					role: 'user',
					content: question,
					time: dateTimeTOString(new Date()),
					id: question
				})
				// 存储到本地

				let oldHistory = uni.getStorageSync('history')
				if (oldHistory) {
					newHistory = [...oldHistory, ...newHistory]
				}
				uni.setStorageSync('history', newHistory)
				this.history = uni.getStorageSync('history')
				// 清空input
				this.input = ''
				questionToGpt({
					question,
					token
				}).then(res => {
					let newHistory = []
					// 将回答存储到数组对象中
					newHistory.push({
						role: res.choices[0].message.role,
						content: res.choices[0].message.content,
						time: dateTimeTOString(new Date()),
						id: res.id
					})
					// 存储到本地

					let oldHistory = uni.getStorageSync('history')
					if (oldHistory) {
						newHistory = [...oldHistory, ...newHistory]
					}
					uni.setStorageSync('history', newHistory)
					this.history = uni.getStorageSync('history')
				})
			}
		},
		computed: {

		},
		mounted() {
			// 如果存在老的历史， 则加载
			let oldHistory = uni.getStorageSync('history')
			if (oldHistory) {
				this.history = oldHistory
			}
			// uni.removeStorageSync('history')
		}
	}
</script>

<style lang="scss" scoped>
	.chatgpt {
		height: 94vh;
		width: 100vw;

		.container {
			padding-top: 30rpx;
			width: 100vw;

			.main {
				width: 86vw;
				height: 80vh;
				overflow: auto;


			}

			.input {
				width: 93vw;
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				height: 7vh;
				padding: 0 40rpx;

				.img {
					width: 16vw;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
	}

	.empty {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 400rpx;
		font-size: 30rpx;
	}
</style>