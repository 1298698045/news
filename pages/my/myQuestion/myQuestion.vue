<template>
	<view class="wrapper">
		<div class="center" v-for="(item,index) in list" :key="index">
			<div class="content">
				<div class="row">
					<div class="Avatar">{{item.CreatedBy.userValue.DisplayName || ''}}</div>
					<div class="info_r">
						<p class="name">
							{{item.CreatedBy.userValue.DisplayName || ''}}
						</p>
						<p class="text">
							{{item.OwningBusinessUnit.value || ''}}   {{item.CreatedOn.dateTime || ''}}
						</p>
					</div>
				</div>
				<div class="title">{{item.Name.value || ''}}</div>
				<div class="box">
					<p class="time">
						<i class="iconfont icon-shijian-copy"></i>
						{{item.FinishedOn.dateTime || ''}} 截止</p>
					<p class="num">
						<i class="iconfont icon-canyuren"></i>
						<span class="active">{{item.NumOfResponses.value || ''}}</span>
						<span>&nbsp;/&nbsp;{{item.NumOfInvitationsSent.value || ''}}</span>
					</p>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNumber:1,
				pageSize:10,
				list:[
					{
						CreatedByName: '张三',
						newName: '张三',
						DeptName: '信息科',
						time: '2022-9-9',
						endTime: '2022-9-9',
						NumOfResponses: 1,
						NumOfInvitationsSent: 2,
						Name: '问卷名称'
					}
				],
				isPage: false,
				isMoreShow: false
			}
		},
		onLoad() {
			this.getQuery();
		},
		methods: {
			getQuery(){
				var filterQuery = '\nContactId\teq-userid';
				this.$httpWX({
					url: '/entity/fetchall',
					method: "post",
					data: {
						objectTypeCode: 30303,
						filterquery: filterQuery,
						pageNumber: this.pageNumber,
						pageSize: this.pageSize
					}
				}).then(res=>{
					console.log(res);
					let total = res.total;
					if(this.pageNumber * this.pageSize < total){
						this.isPage = true;
					}else {
						this.isPage = false;
					}
					let result = [];
					if(this.pageNumber==1){
						result = res.returnValue.nodes;
					}else {
						result = this.list.concat(res.returnValue.nodes);
					}
					this.list = result;
				})
			},
			changeTab(e){
				this.currentTab = e.index;
				this.scope = this.tabs[e.index].scope;
				this.getQuery();
			},
			getDetail(){
				uni.navigateTo({
					url:"detail"
				})
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageNumber = 1;
			this.getQuery();
			wx.stopPullDownRefresh();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
		   if(this.isPage){
			   this.pageNumber++;
			   this.getQuery();
		   }
		}
	}
</script>

<style lang="scss">
.center{
	.content{
		padding: 0 33rpx 34rpx 33rpx;
		background: #fff;
		margin-top: 21rpx;
		.row{
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			.Avatar{
				width: 75rpx;
				height: 75rpx;
				line-height: 75rpx;
				text-align: center;
				border-radius: 50%;
				background: #d03a28;
				color: #fff;
				font-size: 24rpx;
			}
			.info_r{
				flex: 1;
				margin-left: 25rpx;
				.name{
					font-size: 29rpx;
					color: #333333;
					padding-bottom: 21rpx;
				}
				.text{
					font-size: 22rpx;
					color: #999999;
				}
			}
		}
		.title{
			font-size: 33rpx;
			color: #333333;
			font-weight: bold;
		}
		.box{
			display: flex;
			padding: 28rpx 21rpx;
			align-items: center;
			background: #f8f8f8;
			margin-top: 28rpx;
			justify-content: space-between;
			p{
				font-size: 24rpx;
				color: #999999;
				display: flex;
				align-items: center;
				i{
					margin-right: 10rpx;
				}
			}
			.num{
				display: flex;
				margin-left: 20rpx;
				align-items: center;
				span{
					font-size: 24rpx;
					color: #999999;
				}
				.active{
					font-size: 35rpx;
					color: #d03a28;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
