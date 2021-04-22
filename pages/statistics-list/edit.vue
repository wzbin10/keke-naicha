<template>
	<view class="content">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
			<el-form-item label="名称" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="日期" required>
				<el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;"></el-date-picker>
			</el-form-item>
			<el-form-item label="单价" prop="price">
				<el-input-number v-model="ruleForm.price" :precision="2" :step="0.01" :mix="0"></el-input-number>
			</el-form-item>
			<el-form-item label="数量" prop="number">
				<el-input-number v-model="ruleForm.number" :step="1" :mix="0"></el-input-number>
			</el-form-item>
			<el-form-item label="合计" prop="total">
				<el-input-number v-model="ruleForm.total" :precision="2" :step="0.01" :mix="0" :disabled="true"></el-input-number>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input type="textarea" v-model="ruleForm.remark"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提 交</el-button>
			</el-form-item>
		</el-form>
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
				},
				rules: {
					name: [
						{ required: true, message: '请输入活动名称', trigger: 'blur' },
						{ min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
					],
					date: [
						{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
					],
					price: [
						{ type: 'number', required: true, message: '请填写单价', trigger: 'blur' }
					],
					number: [
						{ type: 'number', required: true, message: '请填写数量', trigger: 'blur' }
					],
					total: [
						{ type: 'number', required: true, message: '请填写合计', trigger: 'blur' }
					],
					remark: [
						{ required: false, message: '', trigger: 'blur' }
					]
				}
			}
		},
		onLoad(e) {
			 this._id = e.id
			 this.getDetail(this._id)
		},
		watch:{
			// 属性状态监听
			'ruleForm.price':function(val,oldVal){
				this.ruleForm.total = this.ruleForm.number * val
			},
			'ruleForm.number':function(val,oldVal){
				this.ruleForm.total = this.ruleForm.price * val
			}
		},
		methods: {
			submitForm(formName) {
				uni.showLoading({mask: true})
				this.$refs[formName].validate((valid,object) => {
					if (valid) {
						const formValue = this.ruleForm
						this.handleFormPush({
							date: formValue.date,
							name: formValue.name,
							price: formValue.price,
							number: formValue.number,
							total: formValue.total,
							remark: formValue.remark,
						})
					} else {
						uni.hideLoading()
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			getDetail(id){//获取表单数据
				uni.showLoading({mask: true})
				db.collection(dbCollectionName).doc(id).field('date,name,price,number,total,remark').get().then(res => {
					const data = res.result.data[0]
					if(data){
						console.log(data)
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
			},
			handleFormPush(value){//使用 clientDB 提交数据
			console.log(value)
				db.collection(dbCollectionName).doc(this._id).update(value).then((res) => {
					uni.showToast({
						icon: 'none',
						title: '修改成功'
					})
					this.getOpenerEventChannel().emit('refreshData')
					setTimeout(() => uni.navigateBack(), 500)
				}).catch((err) => {
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

<style>
	.content {
		width: calc(100% - 60rpx);
		margin: 20rpx 0;
	}
</style>
