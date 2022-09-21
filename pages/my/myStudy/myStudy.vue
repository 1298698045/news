<template>
	<view class="wrapper">
		<div class="center">
			<div class="container">
				<div class="panel">
					<CourseBox :list="recommendList" @clickIn="handleClickIn" />
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import CourseBox from '@/components/study/courseBox.vue';
	export default {
		components:{
			CourseBox
		},
		data() {
			return {
				recommendList: [],
				pageNumber: 1,
				pageSize: 10,
				isPage: false
			}
		},
		onLoad() {
			this.getQuery();
		},
		methods: {
			getQuery(){
				this.$httpWX({
					url:'/entity/fetchall',
					method: 'post',
					data:{
						objectTypeCode: 50711,
						filterquery: '\nCourseId\teq-userid',
						PageNumber: this.pageNumber,
						PageSize: this.pageSize
					}
				}).then(res=>{
					console.log(res);
					let total = res.returnValue.totalCount;
					if(this.pageNumber * this.pageSize < total){
						this.isPage = true;
					}else {
						this.isPage = false;
					}
					let result = [];
					if(this.pageNumber==1){
						result = res.returnValue.nodes;
					}else {
						result = this.recommendList.concat(res.returnValue.nodes);
					}
					this.recommendList = result;
				})
			},
			handleClickIn(item,index){
				uni.navigateTo({
					// url:'study?courseId='+item.id
					url:'../../study/study?courseId='+item.id
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
.container{
	padding: 0 30rpx;
	box-sizing: border-box;
	.name{
		font-size: 28rpx;
		color: #333333; 
		font-weight: bold;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.name::before{
		content:'';
		width:6rpx;
		height: 30rpx;
		background: #d03a28;
		display: block;
		border-radius: 5rpx;
		margin-right: 10rpx;
	}
}
</style>
