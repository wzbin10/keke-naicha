<template>
	<view class="content">
		<view class="center">
			<view class="logo" @click="bindLogin" :hover-class="!hasLogin ? 'logo-hover' : ''">
				<image class="logo-img" :src="avatarUrl"></image>
				<view class="logo-title">
					<text class="uer-name">Hi，{{hasLogin ? userName : '您未登录'}}</text>
				</view>
			</view>
			
			<view class="center-list">
				<view class="center-list-item">
					<text class="text-color iconfont-data-view"></text>
					<text class="list-text">我的数据</text>
					<text class="text-color text-layout iconfont-arrow-right-bold"></text>
				</view>
				<view class="center-list-item">
					<text class="text-color iconfont-help"></text>
					<text class="list-text">帮助与反馈</text>
					<text class="text-color text-layout iconfont-arrow-right-bold"></text>
				</view>
				<view class="center-list-item">
					<text class="text-color iconfont-more"></text>
					<text class="list-text">关于</text>
					<text class="text-color text-layout iconfont-arrow-right-bold"></text>
				</view>
			</view>
			
			<button v-if="hasLogin" class="form-btn" type="primary" :loading="logoutBtnLoading" @tap="bindLogout">退出登录</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName'])
		},
		data() {
			return {
				avatarUrl: "../../static/logo.png",
				logoutBtnLoading: false,
			}
		},
		methods: {
			...mapMutations(['logout']),
			bindLogin() {
				if (!this.hasLogin) {
					univerifyLogin().catch(err => {
						if (err === false) return;
						
						uni.navigateTo({
							url: '../login/login',
						});
					})
				}
			},
			bindLogout() {
				this.logoutBtnLoading = true
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'logout'
					},
					success: (e) => {
						if (e.result.code == 0) {
							this.logout();
							uni.removeStorageSync('uni_id_token')
							uni.removeStorageSync('username')
							uni.removeStorageSync('uni_id_has_pwd')
							/**
							 * 如果需要强制登录跳转回登录页面
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login',
								});
							}
						} else {
							uni.showModal({
								content: e.result.msg,
								showCancel: false
							})
						}

					},
					fail: (e) => {
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						})
					},
					complete: () => {
						this.logoutBtnLoading = false
					}
				})
			},
			
		}
	}
</script>

<style lang="less">
.content {
	display: flex;
}
.text-color {
	color: #0faeff;
	margin: 0 10rpx;
	font-size: 40rpx;
	vertical-align: middle;
}
.text-layout {
	float: right;
	color: #cccccc;
}
.center {
	flex-direction: column;
	.logo {
		width: 750rpx;
		height: 240rpx;
		padding: 20rpx;
		box-sizing: border-box;
		background-color: #0faeff;
		flex-direction: row;
		align-items: center;
		text-align: center;
		.logo-hover {
			opacity: 0.8;
		}
	
		.logo-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 150rpx;
		}
		.logo-title {
			height: 150rpx;
			flex: 1;
			align-items: center;
			justify-content: space-between;
			flex-direction: row;
			margin-left: 20rpx;
		}
		.uer-name {
			height: 60rpx;
			line-height: 60rpx;
			color: #FFFFFF;
		}
	}
	
	.center-list {
		background-color: #FFFFFF;
		margin-top: 20rpx;
		width: 750rpx;
		flex-direction: column;
		.center-list-item {
			height: 90rpx;
			width: 750rpx;
			line-height: 90rpx;
			box-sizing: border-box;
			flex-direction: row;
			padding: 0rpx 20rpx;
			border-bottom:1rpx solid #c8c7cc;
		}
		.list-text {
			height: 90rpx;
			line-height: 90rpx;
			color: #555;
			flex: 1;
			text-align: left;
		}
	}
	.form-btn {
		background: #0faeff;
		color: #fff;
		border: 0;
		border-radius: 50rpx;
		font-size: 36rpx;
		margin: 10rpx 0 ;
		&::after {
			border: 0;
		}
		&.button-hover{
			transform: translate(1rpx, 1rpx);
		}
	}
}
</style>
