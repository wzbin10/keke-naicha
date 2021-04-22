<template>
	<view class="login-box">
		<image class="login-logo" src="/static/logo.png" mode='aspectFit'></image>
		<view class="login-title">LOGO</view>
		<view class="login-form">
			<input class="form-input" placeholder="请输入用户名" />
			<input class="form-input" password placeholder="请输入密码"/>
			<input class="form-input" password placeholder="请再输入一次密码"/>
			<button class="form-btn">立即注册</button>
			<navigator class="form-label" url="../login/login" open-type='navigateBack' hover-class="none">已有账号，点此去登录.</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
			padding: 20rpx 20rpx;
			font-size: 32rpx;
		}
		.input-placeholder,.form-input {
			color: #94afce;
		}
		.form-label {
			padding: 60rpx 0;
			text-align: center;
			font-size: 30rpx;
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
	}
}
</style>
