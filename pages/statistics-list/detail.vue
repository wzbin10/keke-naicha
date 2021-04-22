<template>
	<view class="content">
		<view class="item">
			<view class="name">名称: </view>
			<view class="value">{{ruleForm.name}}</view>
		</view>
		<view class="item">
			<view class="name">日期: </view>
			<view class="value">{{ruleForm.date}}</view>
		</view>
		<view class="item">
			<view class="name">单价: </view>
			<view class="value">{{ruleForm.price}}</view>
		</view>
		<view class="item">
			<view class="name">数量: </view>
			<view class="value">{{ruleForm.number}}</view>
		</view>
		<view class="item">
			<view class="name">合计: </view>
			<view class="value">{{ruleForm.total}}</view>
		</view>
		<view class="item">
			<view class="name">备注: </view>
			<view class="value">{{ruleForm.remark}}</view>
		</view>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCollectionName = 'daily-table';
	
	export default {
		data(){
			return {
				ruleForm: {
					name: '',
					date: '',
					price: null,
					number: null,
					total: null,
					remark: ''
				}
			}
		},
		onLoad(e) {
			 this._id = e.id
			 this.getDetail(this._id)
		},
		watch:{
			
		},
		methods: {
			getDetail(id){//获取表单数据
				uni.showLoading({mask: true})
				db.collection(dbCollectionName).doc(id).field('date,name,price,number,total,remark').get().then(res => {
					const data = res.result.data[0]
					if(data){
						this.ruleForm = data
					}
				}).catch(err => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style scoped>
	.content {
		width: calc(100% - 60rpx);
		margin: 20rpx 30rpx;
		display: flex;
		flex-direction: column;
	}
	.item {
		height: 80rpx;
		font-size: 32rpx;
		display: flex;
		justify-content: left;
		align-items: baseline;
	}
	.item .name {
		width: 20%;
		text-align: center;
	}
</style>
