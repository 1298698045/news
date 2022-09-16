<template>
	<view class="wrapper">
		<div class="panel">
			<div class="cell">				
				<span class="label">姓名：</span>
				<span class="val">{{detail.FullName.value || ''}}</span>
			</div>
			<div class="cell">
				<span class="label">部门：</span>
				<span class="val">{{detail.DeptId.Name || ''}}</span>
			</div>
			<div class="cell">
				<span class="label">职位：</span>
				<span class="val">{{detail.JobTitle.value || ''}}</span>
			</div>
			<div class="cell">
				<span class="label">年龄：</span>
				<span class="val">{{detail.Age.value || ''}}</span>
			</div>
			<div class="cell">
				<span class="label">邮箱：</span>
				<span class="val">{{detail.EmailAddress1.value || ''}}</span>
			</div>
			<div class="cell">
				<span class="label">状态：</span>
				<span class="val">{{detail.EmpPool.value || ''}}</span>
			</div>
			<div class="cell">
				<span class="label">家庭住址：</span>
				<span class="val">{{detail.HomeAddress.value || ''}}</span>
			</div>
			<div class="cell">
				<span class="label">家庭住址：</span>
				<span class="val">{{detail.HomeAddress.value || ''}}</span>
			</div>
			<div class="cell">
				<span class="label">家庭电话：</span>
				<span class="val">{{detail.HomePhone.value || ''}}</span>
			</div>
			<div class="cell">
				<span class="label">手机号：</span>
				<span class="val">{{detail.WorkPhone.value || ''}}</span>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail:{}
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getDetail();
		},
		methods: {
			getDetail(){
				this.$httpWX({
					url: '/entity/detail/'+this.id,
					method:'get',
					data:{
						objectTypeCode: 30020,
						layoutId:'1479f8e2-6bf5-4e15-b612-8d4e5ff40c9a'
					}
				}).then(res=>{
					this.detail = res.returnValue.record;
				})
			}
		}
	}
</script>

<style lang="scss">
.panel{
	margin: 20rpx;
	background: #fff;
	.cell{
		padding: 10rpx ;
		border-bottom: 1rpx solid #e2e3e5;
	}
}
</style>
