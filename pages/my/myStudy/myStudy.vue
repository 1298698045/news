<template>
	<view class="wrapper">
		<div class="center">
			<div class="container">
				<div class="panel">
					<div class="box" v-for="(item,index) in recommendList" :key="index" @click="handleClick(item,index)">
						<div class="left_cover">
							<image class="img" width="100%" height="100%" :src="pathUrl+item.ImageUrl.value" mode="aspectFill"></image>
						</div>
						<div class="right_info">
							<h3 class="title">
								{{item.CourseId.lookupValue.displayName || ''}}
							</h3>
							<div class="position">
								<span class="tag">{{item.Writer.textValue || ''}}</span>
							</div>
							<div class="nums">
								<span class="color">免费</span>
								<span class="num">{{item.StudyPeopleCount.value || ''}}人学习</span>
							</div>
							<!-- <div class="desc">
								{{item.Description.textValue || ''}}
							</div> -->
						</div>
					</div>
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
						filterquery: '\nuserid\teq-userid',
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
			handleClick(item,index){
				uni.navigateTo({
					// url:'study?courseId='+item.id
					url:'/pages/study/study?courseId='+item.CourseId.lookupValue.value
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
	page{
		background: #fff;
	}
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
	.box{
		display: flex;
		margin-top: 30rpx;
		.left_cover{
			width: 120rpx;
			height: 180rpx;
			// background: #C70C15;
			border-radius: 10rpx;
			background: #f2f2f2;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.right_info{
			flex: 1;
			margin-left: 30rpx;
			.title{
				font-size: 28rpx;
				color: #333333;
				font-weight: bold;
				display: flex;
				align-items: center;
				margin-bottom: 20rpx;
			}
			.position{
				.tag{
					background: #f1f1f1;
					display: inline-block;
					padding: 5rpx;
					font-size: 24rpx;
					color: #767676;
					margin-right: 10rpx;
				}
			}
			.nums{
				padding: 10rpx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx;
				.color{
					color: #C70C15;
				}
				.num{
					color: #666;
				}
			}
			.desc{
				font-size: 24rpx;
				line-height: 1.5;
				overflow: hidden;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
			}
		}
	}
}
</style>
