<template>
	<view class="wrapper" v-cloak>
		<div class="container">
			<div class="article" v-html="content"></div>
		</div>
		<div class="likeBox">
			<p>
				<tui-icon name="agree" size="24" color="#fff"></tui-icon>
			</p>
			<p class="likeNum">1000</p>
		</div>
		<div class="borderBox next">
			<div class="l">
				<p class="nextText">下一页</p>
				<p class="chapterName">买卖股票的最佳时机</p>
			</div>
			<div class="r">
				<tui-icon name="arrowright" color="#666666" size="24"></tui-icon>
			</div>
		</div>
		<div class="borderBox prev">
			<div class="r">
				<tui-icon name="arrowleft" color="#666666" size="24"></tui-icon>
			</div>
			<div class="l">
				<p class="nextText" style="text-align: right;">下一页</p>
				<p class="chapterName">买卖股票的最佳时机</p>
			</div>
		</div>
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">
			<div class="flexBox">
				<div class="box" @click="handleBack">
					<p class="icon"></p>
					<p class="name">目录</p>
				</div>
				<div class="box">
					<p class="icon"></p>
					<p class="name">进度</p>
				</div>
				<div class="box">
					<p class="icon"></p>
					<p class="name">深色</p>
				</div>
				<div class="box" @click="toComment">
					<p class="icon"></p>
					<p class="name">讨论</p>
				</div>
				<div class="box">
					<p class="icon"></p>
					<p class="name">分享</p>
				</div>
			</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				chapterId: '',
				content: '',
				courseId: '',
				catalogueList: [],
				level: '',
				index: 0
			}
		},
		onLoad(options) {
			this.courseId = options.courseId;
			this.chapterId = options.id;
			this.level = options.level - 1;
			this.index = options.index;
			this.getDetail();
			this.getCatalogue();
		},
		methods: {
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			getCatalogue(){
				this.$httpWX({
					url: '/course/'+ this.courseId +'/chapter/fetchall',
					method:'get',
					data:{
						search: ''
					}
				}).then(res=>{
					this.catalogueList = res.returnValue;
					// const rowIndex = this.catalogueList.findIndex(item=>item.chapterId==this.chapterId);
					// console.log(rowIndex)
					if(index == 0 && this.level == 0){
						
					}
				})
			},
			toComment(){
				uni.navigateTo({
					url:'studyCommont?chapterId='+this.chapterId + '&courseId='+this.courseId
				})
			},
			getDetail(){
				this.$httpWX({
					url: '/entity/detail/'+this.chapterId,
					method:'get',
					data:{
						objectTypeCode:50701,
						layoutId: '44a60d26-4f8d-4136-bc66-87356c6ef5bd'
					}
				}).then(res=>{
					console.log('res',res)
					this.content = res.returnValue.record.Description.value;
				})
			}
		}
	}
</script>
<style>
	@import "../../colorui/main.css";
	@import "../../colorui/icon.css";
</style>
<style lang="scss">
	page{
		background: #fff;
	}
	.container{
		padding: 20rpx;
	}
	.likeBox{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		background: #d24941;
		text-align: center;
		line-height: 100rpx;
		color: #fff;
		margin: 100rpx auto;
	}
	.likeNum{
		color:#d24941;
	}
	.borderBox{
		margin: 20rpx;
		border-radius: 10rpx;
		border:1rpx solid #e2e3e5;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.nextText{
			color:#666666;
			font-size: 20rpx;
		}
		.chapterName{
			font-size: 24rpx;
			font-weight: bold;
			color: #333;
			line-height: 2;
		}
	}
	.flexBox{
		width: 100%;
		display: flex;
		padding: 0 20rpx;
		justify-content: space-around;
		.box{
			.name{
				font-size: 24rpx;
				color: #333333;
			}
		}
	}
</style>
