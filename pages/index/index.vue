<template>
	<view class="content">
		<view v-if="hasLogin" class="hello">
			<index-home></index-home>
		</view>
		<view v-if="!hasLogin" class="hello">
			<view class="title">
				您好 游客。
			</view>
			<view class="ul">
				<view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import indexHome from './index-home'
	
	export default {
		computed: {
			...mapState(['forcedLogin', 'hasLogin', 'userName'])
		},
		components:{
			indexHome
		},
		onLoad() {
			let uniIdToken = uni.getStorageSync('username')
	
			if (uniIdToken) {
				this.login(uni.getStorageSync('username'))
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'checkToken',
					},
					success: (e) => {
						if (e.result.code > 0) {
							uni.navigateTo({
								url: '../login/login'
							});
						}
					},
					fail(e) {
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						})
					}
				})
			} else {
				this.guideToLogin()
			}
		},
		methods: {
			...mapMutations(['login']),
			guideToLogin() {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '../login/login'
							});
						}
					}
				});
			}
		}
	}
</script>

<style>
	.hello {
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
		margin-top: 25rpx;
	}
	.ul {
		font-size: 15rpx;
		color: #8f8f94;
		margin-top: 25rpx;
	}

	.ul>view {
		line-height: 25rpx;
	}
</style>
