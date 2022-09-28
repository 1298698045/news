<template>
	<view class="wrapper">
		<div class="listWrap">
			<div class="itemBox" v-for="(item,index) in listData" :key="index">
				<div class="title">
					{{item.Name || ''}}
				</div>
				<div class="time">
					{{item.CreatedOn || ''}}
				</div>
				<div class="options" @click="[0,1].includes(item.StatusCode) && gotoExam(item)">
					<button class="btn">{{item.StatusCode == 0 ? '开始答题' : item.StatusCode == 1 ? '继续答题' : '已完成'}}</button>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				listData: [],
				isPage: false,
				pageNumber: 1,
				pageSize: 20
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getQuery();
		},
		methods: {
			gotoExam(item){
				uni.navigateTo({
					url:'../../examination/subject/subject?id='+item.TestId
				})
			},
			getQuery(){
				// var filterquery = '\nCategoryId\teq\t'+this.id;
				this.$httpWX({
					url: '/learningtest/get',
					method: 'get',
					data: {
						categoryId: this.id,
						PageNumber: this.pageNumber,
						PageSize: this.pageSize
					}
				}).then(res=>{
					let total = res.total;
					if(this.pageNumber * this.pageSize < total){
						this.isPage = true;
					}else {
						this.isPage = false;
					}
					let result = [];
					if(this.pageNumber==1){
						result = res.returnValue;
					}else {
						result = this.listData.concat(res.returnValue);
					}
					this.listData = result;
				})
			},
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageNumber = 1;
			this.getQuery()
			wx.stopPullDownRefresh();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
		   if(this.isPage){
			   this.pageNumber++;
			   this.getQuery()
		   }
		}
	}
</script>

<style lang="scss">
	.listWrap{
		padding: 30rpx;
		.itemBox{
			width: 100%;
			min-height: 200rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			box-shadow: 0 2rpx 10rpx rgba(255,255,255,.6);
			margin: 30rpx 0;
			.title{
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}
			.time{
				color: #999999;
				font-size: 28rpx;
				line-height: 2;
			}
			.options{
				width: 100%;
				text-align: right;
				margin-top: 20rpx;
				.btn{
					height: 80rpx;
					line-height: 80rpx;
					display: inline-block;
					background: #D03A28;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
