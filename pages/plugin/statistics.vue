<template>
	<view class="content-tabs">
		<view class="tabs">
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="清单管理" name="first">
					<statistics-list ref="alllist" v-bind:params="params"/>
				</el-tab-pane>
			    <el-tab-pane label="今年以来" name="second">
					<statistics-chart  v-bind:params="params"/>
				</el-tab-pane>
			    <el-tab-pane label="最近半年" name="third">
					<statistics-chart  v-bind:params="params"/>
				</el-tab-pane>
			    <el-tab-pane label="最近一年" name="fourth">
					<statistics-chart  v-bind:params="params"/>
				</el-tab-pane>
			</el-tabs>
		</view>
	</view>	
</template>

<script>
	import statisticsChart from '../statistics-chart/statistics-chart'
	import statisticsList from '../statistics-list/statistics-list'
	
	export default {
		components:{
			statisticsChart,
			statisticsList
		},
		data() {
			return {
				activeName: 'first',
				params:{}
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
			this.$refs.alllist.getJsonByDB()
		},
		methods: {
			handleClick(tab, event) {
				// console.log(tab, event);
				switch(this.activeName){
					case 'first':
						this.params = {"date":"all"}
						break;
					case 'second':
						this.params = {"date":"now"}
						break;
					case 'third':
						this.params = {"date":"half-year"}
						break;
					case 'fourth':
						this.params = {"date":"all-year"}
						break;
				}
			}
		},
	}
</script>

<style>
	.content-tabs {
		padding: 10rpx 5rpx;
	}
	.el-tabs__header {
		margin: 0 0 15px;
	}
	.el-card__body {
		padding: 20rpx 40rpx;
	}
</style>
