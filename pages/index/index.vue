<template>
	<view class="index">
		<view class="container">
			<view class="main">
				<!-- 组件根据active属性切换添加过渡动画-->
				<!-- chatgpt组件 -->
				<Chatgpt v-show="active=='chat'"></Chatgpt>

				<!-- TODO组件 -->

				<Todo v-show="active=='todo'"></Todo>
			</view>
			<view class="footer">
				<!-- chat图标区域 -->
				<view class="chat" @click='changeChat'>
					<view class="chat-img">
						<uni-transition mode-class="fade" :show="active=='chat'">
							<image style="width: 30px; height: 30px;" src="../../static/select-chat.png">
							</image>
						</uni-transition>
						<uni-transition mode-class="fade" :show="active=='todo'">
							<image style="width: 30px; height: 30px;" src="../../static/chat.png"></image>
						</uni-transition>
					</view>
				</view>
				<!-- todo图标区域 -->
				<view class="todo" @click='changeTodo'>
					<view class="todo-img">
						<uni-transition mode-class="fade" :show="active=='todo'">
							<image style="width: 30px; height: 30px;" src="../../static/select-todolist .png">
							</image>
						</uni-transition>
						<uni-transition mode-class="fade" :show="active=='chat'">
							<image style="width: 30px; height: 30px;" src="../../static/todolist.png"></image>
						</uni-transition>
					</view>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Chatgpt from '../components/chatgpt.vue'
	import Todo from '../components/todo.vue'
	export default {

		data() {
			return {
				active: 'chat'
			}
		},
		components: {
			Chatgpt,
			Todo
		},
		mounted() {
			this.$refs.popup.open()
		},
		methods: {
			changeChat() {
				this.active = 'chat'
			},
			changeTodo() {
				this.active = 'todo'
			},

		},
		mounted() {
			// uni.setStorageSync('token', '')
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
	.index {
		height: 100vh;
		width: 100vw;

		.container {
			height: 100vh;
			width: 100vw;

			.main {
				height: 94vh;
			}

			.footer {
				height: 6vh;
				background-color: rgb(124, 160, 217);
				display: flex;

				.chat {
					width: 50vw;
					display: flex;
					justify-content: center;
					align-items: center;

					.chat-img {
						width: 30px;
						height: 30px;
						overflow: hidden;
					}
				}

				.todo {
					width: 50vw;
					display: flex;
					justify-content: center;
					align-items: center;

					.todo-img {
						width: 30px;
						height: 30px;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>