<template>
	<view class="content">
		<el-timeline class="timeline">
		    <el-timeline-item v-for="(item,index) in timelineItem" :key="item"
				:timestamp="item.date+' '+item.master" 
				placement="top">
				<el-card>
					<h4>{{item.name}}</h4>
					<p>{{item.remark}}</p>
				</el-card>
		    </el-timeline-item>
		</el-timeline>
	</view>
</template>

<script>
	export default {
		components:{},
		data(){
			return {
				timelineItem:[{
					date:"2020-06-30",
					name:"出生",
					master:"奶茶",
					remark:"劈天一声雷，就这样诞生了"
				},{
					date:"2020-09-21",
					name:"出生",
					master:"可可",
					remark:"劈天一声雷，就这样诞生了"
				},{
					date:"2020-11-04",
					name:"疫苗日",
					master:"奶茶",
					remark:"无"
				},{
					date:"2020-11-08",
					name:"接回家",
					master:"可可",
					remark:"无"
				},{
					date:"2020-11-11",
					name:"驱虫一次",
					master:"奶茶",
					remark:"无"
				},{
					date:"2020-11-12",
					name:"驱虫一次",
					master:"可可",
					remark:"无"
				},{
					date:"2020-12-04",
					name:"接回家",
					master:"奶茶",
					remark:"无"
				},{
					date:"2020-12-20",
					name:"洗澡一次",
					master:"奶茶",
					remark:"无"
				},{
					date:"2020-12-26",
					name:"疫苗第一针",
					master:"可可",
					remark:"无"
				},{
					date:"2021-01-04",
					name:"驱虫一次",
					master:"可可奶茶",
					remark:"无"
				},{
					date:"2021-01-16",
					name:"疫苗第二针",
					master:"可可",
					remark:"无"
				},{
					date:"2021-01-30",
					name:"绝育",
					master:"奶茶",
					remark:"苦逼的孩子"
				},{
					date:"2021-02-06",
					name:"疫苗第三针",
					master:"可可奶茶",
					remark:"无"
				},{
					date:"2021-02-23",
					name:"驱虫日",
					master:"可可奶茶",
					remark:"无"
				},{
					date:"2021-02-27",
					name:"疫苗狂犬针",
					master:"可可",
					remark:"无"
				},{
					date:"2021-03-13",
					name:"洗澡一次",
					master:"可可奶茶",
					remark:"无"
				}]
			}
		},
		watch:{
			// 属性状态监听
		},
		onLoad() {
			// 监听页面加载
		},
		created(){
			// 实例被创建时候执行
		},
		mounted(){
			// 页面加载完成后执行的方法
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.content {
		width: calc(100% - 60rpx);
		margin: 10rpx 0rpx;
	}
	.timeline /deep/ .el-timeline-item__timestamp, 
	.timeline /deep/ .el-timeline-item__content {
		font-size: 18px;
	}
</style>
