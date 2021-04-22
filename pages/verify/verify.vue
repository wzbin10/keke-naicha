<template>
	<view class="login-box">
		<image class="login-logo" src="/static/logo.png" mode='aspectFit'></image>
		<view class="login-title">LOGO</view>
		<view class="login-form">
			<input class="form-input" placeholder="请输入手机号码" />
			<view class="form-input-btn">
				<input class="form-input" placeholder="验证码"/>
				<view class="form-checking" @click="checking" v-if="state===false">获取验证码</view>
				<view class="form-checking form-time" v-if="state===true">倒计时{{ currentTime }}s</view>
			</view>
			<input class="form-input" password placeholder="请输入密码"/>
			<button class="form-btn">立即注册</button>
			<navigator class="form-label" url="../login/login" open-type='navigateBack' hover-class="none">已有账号，点此去登录.</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state: false,		//是否开启倒计时
				totalTime: 60,		//总时间，单位秒
				recordingTime: 0, 	//记录时间变量
				currentTime: 0, 	//显示时间变量
			}
		},
		onLoad() {
			
		},
		methods: {
			checking() {
				//把显示时间设为总时间
				this.currentTime = this.totalTime;
				//开始倒计时
				this.state = true;
				//执行倒计时
				this.checkingTime();
			},
			checkingTime(){
				const _this = this;
				//判断是否开启
				if(this.state){
					//判断显示时间是否已到0，判断记录时间是否已到总时间
					if(this.currentTime > 0 && this.recordingTime <= this.totalTime){
						//记录时间增加 1
						this.recordingTime = this.recordingTime + 1;
						//显示时间，用总时间 - 记录时间
						this.currentTime = this.totalTime - this.recordingTime;
						//1秒钟后，再次执行本方法
						setTimeout(() => { 	
							//定时器内，this指向外部，找不到vue的方法，所以，需要用_this变量。
							_this.checkingTime();
						}, 1000)
					}else{
						//时间已完成，还原相关变量
						this.state = false;		//关闭倒计时
						this.recordingTime = 0;	//记录时间为0
						this.currentTime = this.totalTime;	//显示时间为总时间
					}
				}else{
					//倒计时未开启，初始化默认变量
					this.state = false;
					this.recordingTime = 0;
					this.currentTime = this.totalTime;
				}
			}
		}
	}
</script>

<style lang="less">
.login-box {
	padding: 0 100rpx;
	position: relative;
	.login-logo {
		width: 100%;
		height: 300rpx;
	}
	.login-title {
		position: absolute;
		top: 150rpx;
		left: 50%;
		transform: translate(-50%,-50%);
		font-size: 48rpx;
		color: #fff;
		text-align: center;
		width: 100%;
	}
	.login-form {
		margin-top: 40rpx;
		.form-input {
			background: #dcdcdc;
			margin: 20rpx 0rpx;
			border-radius: 100rpx;
			padding: 20rpx 40rpx;
			font-size: 32rpx;
		}
		.input-placeholder,.form-input {
			color: #94afce;
		}
		.form-label {
			padding: 60rpx 0;
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
