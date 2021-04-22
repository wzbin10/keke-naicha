<template>
	<view class="content">
		<el-card class="box-card">
			<el-table :data="tables" style="width: 100%" height="912" @current-change="handleCurrentChange">
				<el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
				<el-table-column prop="name" label="物品" width="260"></el-table-column>
				<el-table-column prop="price" label="单价" width="80"></el-table-column>
				<el-table-column prop="number" label="数量" width="80"></el-table-column>
				<el-table-column prop="total" label="合计"  width="80"></el-table-column>
				<el-table-column fixed="right" label="操作" width="80">
					<template slot-scope="scope">
						<el-button @click="handleEdit(scope.$index, scope.row)" type="text" icon="el-icon-edit"></el-button>
						<el-button @click="handleDelete(scope.$index, scope.row)" type="text" icon="el-icon-delete"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination ref="page" class="page"
				@current-change="handleCurrentPageChange"
				:hide-on-single-page="true"
				background
				:page-size="defaultSize"
			    layout="total,pager"
			    :total="defaultTotal">
			</el-pagination>
			  
			<view class="box-button">
			  	<el-button type="primary" icon="el-icon-plus" circle @click="handleAdd"></el-button>
			</view>
		</el-card>
	</view>
</template>

<script>
	const db = uniCloud.database();
	const dbCollectionName = 'daily-table';
	
	export default {
		components:{},
		props: ['params'],
		data() {
			return {
				tables:[],
				defaultPages:[],
				currentRow:null,
				defaultSize:13,
				currentPage:1,
				defaultTotal:0
			}
		},
		watch:{
			// 属性状态监听
			'params':function(val,oldVal){
				if(val == oldVal) return;
				this.getJsonByDB(val);
			}
		},
		onLoad() {
			// 监听页面加载
			this.getJsonByDB()
			
		},
		created(){
			// 实例被创建时候执行
		},
		mounted(){
			// 页面加载完成后执行的方法
		},
		methods: {
			getJsonByDB(params){//使用 clientDB 获取数据
				uni.showLoading({mask: true})
				this.tables = []
				this.defaultPages = []
				db.collection(dbCollectionName).orderBy('date','desc').get().then(res => {
					const data = res.result.data
					if(data){
						this.defaultPages = data
						this.tables = this.defaultPages.slice(0,this.defaultSize)
						// console.log(data.length)
						this.defaultTotal = data.length
					}
				}).catch(err => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			handleCurrentChange(val,oldVal) {//选中
				// this.currentRow = val;
				//打开详情页面
				const _id = val._id
				uni.navigateTo({
					url: '../statistics-list/detail?id=' + _id
				})
			},
			handleEdit(index, row) {
				//打开编辑页面
				const _id = row._id
				uni.navigateTo({
					url: '../statistics-list/edit?id=' + _id
				})
			},
			handleDelete(index, row) {
				// 删除数据
				const _id = row._id
				db.collection(dbCollectionName).doc(_id).remove().then((res) => {
					uni.showToast({
						icon: 'none',
						title: '删除成功'
					})
				}).catch((err) => {
					uni.showModal({
						content: err.message || '请求服务失败',
						showCancel: false
					})
				}).finally(() => {
					uni.hideLoading()
				})
			},
			handleAdd(){
				//打开新增页面
				uni.navigateTo({
					url: '../statistics-list/add',
					events: {
						// 监听新增数据成功后, 刷新当前页面数据
						refreshData: () => {
							this.getJsonByDB()
						}
					}
				})
			},
			handleCurrentPageChange(val) {
				this.currentPage = val
				const from = (this.currentPage-1)*this.defaultSize
				this.tables = this.defaultPages.slice(from,from+this.defaultSize)
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
	.box-card /deep/ .el-table__header,
	.box-card /deep/ .el-table__body,
	.box-card /deep/ .el-table__body,
	.box-card /deep/ .el-pager .number {
		font-size: 18rpx;
	}
	.page {
		padding: 20rpx 6rpx 6rpx 6rpx;
	}
	.box-button {
		padding: 10rpx 0 0 0;
		text-align: center;
	}
</style>
