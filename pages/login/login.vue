<template>
	<view class="login-box">
		<image class="login-logo" src="/static/logo.png" mode='aspectFit'></image>
		<view class="login-title">LOGO</view>
		
		<view class="login-type">
			<view v-for="(item,index) in loginTypeList" :key="index" @click="loginType = index" :class="{act: loginType === index}"
			 class="login-type-btn">{{item}}</view>
		</view>
		
		<view class="login-form" v-if="loginType === 0">
			<input class="form-input" v-model="formData.mobile" placeholder="请输入手机号码" />
			<view class="form-input-btn">
				<input class="form-input" v-model="formData.code" placeholder="验证码"/>
				<view class="form-checking" @click="checking" v-if="state===false">获取验证码</view>
				<view class="form-checking form-time" v-if="state===true">倒计时{{ currentTime }}s</view>
			</view>
			<button class="form-btn" @tap="bindLogin">立即登录</button>
		</view>
				
		<view class="login-form" v-else>
			<input class="form-input" v-model="formData.username" placeholder="请输入用户名" />
			<input class="form-input" v-model="formData.password" password placeholder="请输入密码"/>
			<button class="form-btn" @tap="bindLogin">立即登录</button>
			<navigator class="form-label" url="../register/register" hover-class="none">还没有账号？点此注册.</navigator>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	import { getDeviceUUID } from '@/common/utils.js'
	
	const captchaOptions = {
		deviceId: getDeviceUUID(),
		scene: 'login'
	}
	
	export default {
		computed: mapState(['forcedLogin', 'hasLogin']),
		
		data() {
			return {
				formData: {
				  "username": "",
				  "password": "",
				  "mobile":"",
				  "code":""
				},
				loginType:0,
				loginTypeList: ['免密登录', '密码登录'],
				loginBtnLoading: false,
				state: false,		//是否开启倒计时
				totalTime: 60,		//总时间，单位秒
				recordingTime: 0, 	//记录时间变量
				currentTime: 0, 	//显示时间变量
			}
		},
		onLoad() {
			
		},
		methods: {
			...mapMutations(['login']),
			bindLogin() {
				//登陆类型:触发登录
				switch (this.loginType) {
					case 0:
						this.loginBySms()
						break;
					case 1:
						this.loginByPwd()
						break;
					default:
						break;
				}
			},
			async loginByPwd() {
				//密码登录
				if (this.formData.username.length < 3) {
					uni.showToast({
						icon: 'none',
						title: '账号最短为 3 个字符'
					});
					return;
				}
				if (this.formData.password.length < 6) {
					uni.showToast({
						icon: 'none',
						title: '密码最短为 6 个字符'
					});
					return;
				}
				const data = {
					username: this.formData.username,
					password: this.formData.password,
					...captchaOptions
				};
				this.loginBtnLoading = true
				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'login',
						params: data
					},
					success: (e) => {
						if (e.result.code == 0) {
							uni.setStorageSync('username', e.result.username)
							this.toMain(this.formData.username);
						} else {
							uni.showModal({
								content: e.result.message,
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
						this.loginBtnLoading = false
					}
				})
			},
			loginBySms() {
				// 免密登录
				if (!/^1\d{10}$/.test(this.formData.mobile)) {
					uni.showModal({
						content: '手机号码填写错误',
						showCancel: false
					})
					return
				}
				if (!/^\d{6}$/.test(this.formData.code)) {
					uni.showModal({
						title: '验证码为6位纯数字',
						showCancel: false
					});
					return;
				}

				uniCloud.callFunction({
					name: 'user-center',
					data: {
						action: 'loginBySms',
						params: {
							mobile: this.formData.mobile,
							code: this.formData.code
						}
					},
					success: (e) => {
						if (e.result.code == 0) {
							const username = e.result.username || '新用户'
							uni.setStorageSync('uni_id_token', e.result.token)
							uni.setStorageSync('username', username)
							uni.setStorageSync('login_type', 'online')
							this.toMain(username);
						} else {
							uni.showModal({
								content: e.result.msg,
								showCancel: false
							})
						}

					},
					fail(e) {
						uni.showModal({
							content: JSON.stringify(e),
							showCancel: false
						})
					}
				})
			},
			toMain(userName) {
				this.login(userName);
				/**
				 * 强制登录时使用reLaunch方式跳转过来
				 * 返回首页也使用reLaunch方式
				 */
				uni.reLaunch({
					url: '../index/index',
				});
			},
		}
	}
</script>

<style lang="less">
.login-box {
	padding: 0 100rpx;
	position: relative;
	.login-type {
		display: flex;
		justify-content: center;
		.login-type-btn {
			line-height: 60rpx;
			margin: 0rpx 30rpx;
			font-size: 32rpx;
			&.act {
				color: #0FAEFF;
				border-bottom: solid 1rpx #0FAEFF;
			}
		}
	}
	.login-logo {
		width: 100%;
		height: 300rpx;
	}
	.login-title {
		width: 100%;
		font-size: 48rpx;
		color: #fff;
		text-align: center;
		position: absolute;
		top: 150rpx;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	.login-form {
		margin-top: 20rpx;
		.form-input {
			background: #dcdcdc;
			border-radius: 100rpx;
			margin: 20rpx 0rpx;
			padding: 20rpx 20rpx;
			font-size: 32rpx;
		}
		.input-placeholder,.form-input {
			//
		}
		.form-label {
			padding: 10rpx 0;
			text-align: center;
			font-size: 32rpx;
			color: #a7b6d0;
		}
		.form-btn {
			background: #0faeff;
			color: #fff;
			border: 0;
			border-radius: 100rpx;
			font-size: 32rpx;
			&::after {
				border: 0;
			}
			&.button-hover{
				transform: translate(1rpx, 1rpx);
			}
		}
		// 验证码输入框
		.form-input-btn {
			position: relative;
			.form-input {
				padding-right: 100rpx;
			}
			.form-checking {
				position: absolute;
				right: 0;
				top: 0;
				background: #0faeff;
				color: #fff;
				border: 0;
				border-radius: 100rpx;
				font-size: 32rpx;
				margin-left: auto;
				margin-right: auto;
				padding: 20rpx 20rpx;
				box-sizing: border-box;
				text-align: center;
				text-decoration: none;
				-webkit-tap-highlight-color: transparent;
				overflow: hidden;
				&.form-time {
					background: #a7b6d0;
				}
			}
		}
	}
}
</style>
