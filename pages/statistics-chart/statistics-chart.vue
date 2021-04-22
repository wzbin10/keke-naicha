<template>
	<view class="content">
		
		<el-card class="box-card">
			<view class="charts-box">
				<qiun-data-charts 
					type="word" 
					:errorShow="false"
					:chartData="wordData" 
					background="none" 
					:animation="true"/>
			</view>
		</el-card>
		
		<el-card class="box-card">
			<view class="charts-box">
				<qiun-data-charts 
					type="pie" 
					:errorShow="false"
					:chartData="pieData" 
					background="none" 
					:animation="true"
					:ontouch="true"/>
			</view>
		</el-card>
		
		<el-card class="box-card">
			<view class="charts-box">
				<qiun-data-charts 
					type="column" 
					:errorShow="false"
					:chartData="barData" 
					background="none" 
					:animation="true"
					:ontouch="true"/>
			</view>
		</el-card>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	export default {
		components:{},
		props: ['params'],
		data() {
			return {
				barData:{},
				pieData:{},
				wordData:{}
			}
		},
		watch:{
			// 属性状态监听
			'params':function(val,oldVal){
				if(val.date == oldVal.date) return;
				this.getJSONByParams(val);
			}
		},
		onLoad() {
			// 监听页面加载
			this.getJSONByParams({date:'all-year'})
		},
		created(){
			// 实例被创建时候执行
		},
		mounted(){
			// 页面加载完成后执行的方法
		},
		methods: {
			getJSONByParams(params = this.params){
				const params_date = params.date == 'now' ? dbCmd.lt(this.format('yyyy-MM-dd')).and(dbCmd.gt(this.format('yyyy-01-01')))
								: params.date == 'month' ? dbCmd.gt(this.format('yyyy-MM-dd',365/4*24*60*60*1000))
								: params.date == 'year' ? dbCmd.gt(this.format('yyyy-MM-dd',365/2*24*60*60*1000))
								: dbCmd.lte(this.format('yyyy-MM-dd'));
				
				db.collection('daily-table').where({
					date: params_date
				}).field('name,date,total').orderBy('date','asc').get().then(res => {
					uni.showToast({
						icon: 'none',
						title: '成功'
					})
					this.dealData(res.result.data)
				}).catch(err => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			dealData(data){
				//处理接口返回数据
				let defaultMap = new Map()
				let categories = []
				let series = [{"name":"数值","data":[]}]
				let wordSeries = []
				let pieSeries = [{"data":[]}]
				if(data && data.length){
					console.log(data.length)
					//先组装
					data.forEach((item,i) => {
						let dateId = item.date.slice(0,7)
						let total = item.total
						let name = item.name
						let prevItem = defaultMap.get(dateId)
						//文本
						wordSeries.push({
							name: name,
							textSize:Math.round(Math.random()*10 + 10)
						})
						//总计
						if(prevItem){
							total = Number((total + prevItem).toFixed(2))
							defaultMap.set(dateId,total)
							return
						}
						defaultMap.set(dateId,total)
					})
					//后赋值
					defaultMap.forEach((value,key) => {
						if(key && value){
							categories.push(key)
							series[0].data.push(value)
							pieSeries[0].data.push({
								name:key,
								value:value
							})
						}
					})
					this.barData = {
						categories,
						series
					}
					this.pieData = {
						series:pieSeries
					}
					this.wordData = {
						series:wordSeries
					}
				}
			},
			format(fmt,prevTime){//当前时间格式化输出
				let date = new Date();
				if(prevTime) date = new Date(date.getTime() - prevTime);
				let o = {
				    "M+": date.getMonth() + 1, // 月份
				    "d+": date.getDate(), // 日
				    "h+": date.getHours(), // 小时
				    "m+": date.getMinutes(), // 分
				    "s+": date.getSeconds(), // 秒
				    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
				    "S": date.getMilliseconds()
				          // 毫秒
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.box-card {
	    width: calc(100% - 60rpx);
		margin: 0 0 20rpx 0;
	}
	.charts-box {
		width: 100%;
		height: 500rpx;
	}
</style>
