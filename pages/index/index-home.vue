<template>
	<view>
		<scroll-view scroll-y class="page">
			<view class="sub-title">
				<el-carousel height="200px" :interval="5000">
					<el-carousel-item v-for="item in subtitleBg" :key="item">
						<image :src="item" mode="widthFix" class="response"></image>
					</el-carousel-item>
				</el-carousel>
			</view>
			<view class="nav-list">
				<navigator hover-class="none" :url="'/pages/plugin/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in menulists" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'iconfont-' + item.icon"></text>
				</navigator>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:'index-home',
		data() {
			return {
				subtitleBg:['/static/001.jpg','/static/002.jpg','/static/003.jpg'],
				menulists:[
					{
						title: 'Uchart实例',
						name: 'demo-ucharts',
						color: 'cyan',
						icon: 'chart-bar'
					},
					{
						title: '数据统计',
						name: 'statistics',
						color: 'green',
						icon: 'data-view'
					},
					{
						title: '重要时刻',
						name: 'moment',
						color: 'pink',
						icon: 'history'
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.page {
		height: 100vh;
	}
	.sub-title {
		padding: 10rpx 0 20rpx 0;
	}
	.response {
		width: 100%;
	}
	.nav-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0px 20rpx 0px;
		justify-content: space-between;
	}

	.nav-li {
		padding: 20rpx;
		border-radius: 12rpx;
		width: calc(50% - 40px);
		margin: 0 2.5% 40rpx;
		background-image: url(../../static/assets.png);
		background-size: cover;
		background-position: center;
		position: relative;
		z-index: 1;
	}

	.nav-li::after {
		content: "";
		position: absolute;
		z-index: -1;
		background-color: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: -10%;
		border-radius: 10rpx;
		opacity: 0.2;
		transform: scale(0.9, 0.9);
	}

	.nav-li.cur {
		color: #fff;
		background: rgb(94, 185, 94);
		box-shadow: 4rpx 4rpx 6rpx rgba(94, 185, 94, 0.4);
	}

	.nav-title {
		font-size: 32rpx;
		font-weight: 300;
	}

	.nav-title::first-letter {
		font-size: 40rpx;
		margin-right: 4rpx;
	}

	.nav-name {
		font-size: 28rpx;
		text-transform: Capitalize;
		margin-top: 20rpx;
		position: relative;
	}

	.nav-name::before {
		content: "";
		position: absolute;
		display: block;
		width: 40rpx;
		height: 6rpx;
		background: #fff;
		bottom: 0;
		right: 0;
		opacity: 0.5;
	}

	.nav-name::after {
		content: "";
		position: absolute;
		display: block;
		width: 100rpx;
		height: 1px;
		background: #fff;
		bottom: 0;
		right: 40rpx;
		opacity: 0.3;
	}

	.nav-name::first-letter {
		font-weight: bold;
		font-size: 36rpx;
		margin-right: 1px;
	}

	.nav-li text {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		font-size: 52rpx;
		width: 60rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}
</style>
