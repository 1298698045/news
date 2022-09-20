<template>
	<view class="wrapper">
		<div class="header">
			<div class="avatar">
				{{detail.name || ''}}
			</div>
			<p class="userName">{{detail.FullName.value || ''}}</p>
		</div>
		<div class="panel">
			<div class="cell">				
				<p class="label">姓名</p>
				<p class="val">{{detail.FullName.value || ''}}</p>
			</div>
			<div class="cell">
				<p class="label">部门</p>
				<p class="val">{{detail.DeptId.Name || ''}}</p>
			</div>
			<div class="cell">
				<p class="label">职位</p>
				<p class="val">{{detail.JobTitle.value || ''}}</p>
			</div>
			<div class="cell">
				<p class="label">年龄</p>
				<p class="val">{{detail.Age.value || ''}}</p>
			</div>
			
			<div class="cell">
				<p class="label">状态</p>
				<p class="val">{{detail.EmpPool.value || ''}}</p>
			</div>
		</div>
		<div class="panel">
			<div class="cell">
				<p class="label">手机号</p>
				<p class="val">{{detail.WorkPhone.value || ''}}</p>
			</div>
			<div class="cell">
				<p class="label">邮箱</p>
				<p class="val">{{detail.EmailAddress1.value || ''}}</p>
			</div>
			<div class="cell">
				<p class="label">家庭住址</p>
				<p class="val">{{detail.HomeAddress.value || ''}}</p>
			</div>
			<div class="cell">
				<p class="label">家庭电话</p>
				<p class="val">{{detail.HomePhone.value || ''}}</p>
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
					if(this.detail.FullName.value.length>2){
						this.detail.name = this.detail.FullName.value.slice(1);
					}else {
						this.detail.name = this.detail.FullName.value;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.header{
		background: #fff;
		padding: 30rpx 0;
		text-align: center;
		.avatar{
			width: 208rpx;
			height: 208rpx;
			line-height: 208rpx;
			border-radius: 50%;
			background: #d93731;
			color: #fff;
			font-size: 63rpx;
			text-align: center;
			margin: 0 auto;
		}
		.userName{
			font-size: 42rpx;
			color: #333333;
			padding-top: 21rpx;
		}
	}
.panel{
	margin-top: 16rpx;
	background: #fff;
	.cell{
		margin-left: 40rpx;
		padding: 29rpx 0;
		border-bottom: 1rpx solid #e2e3e5;
		.label{
			color: #999999;
			font-size: 26rpx;
		}
		.val{
			color: #333333;
			font-size: 34rpx;
		}
	}
	.cell:last-child{
		border-bottom: none;
	}
}
</style>
