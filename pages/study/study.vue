<template>
	<view class="wrapper">
		<div class="header">			
			<div class="cover">
				<div class="title">
					<span class="tag">专栏</span>
					{{detail.name}}
				</div>
				<div class="duty">
					<span class="name">昵称</span>
					架构师
				</div>
				<!-- <div class="introduce">
					免费课学习 1小时40分·409人学·10.0分
				</div> -->
			</div>
			<div class="d-tabs" :class="{'fixedActive':isFixed}" id="d-tabs">
				<p class="d-tab" :class="{'active':currIndex==0}" @click="handleTab(0)">
					<span>
						简介
					</span>
				</p>
				<p class="d-tab" :class="{'active':currIndex==1}" @click="handleTab(1)">
					<span>
						目录
					</span>
				</p>
				<p class="d-tab" :class="{'active':currIndex==2}" @click="handleTab(2)">
					<span>
						评价
					</span>
				</p>
				<p class="d-tab" :class="{'active':currIndex==3}" @click="handleTab(3)">
					<span>
						推荐
					</span>
				</p>
			</div>
		</div>
		<div class="center">
			<div class="container">
				<swiper class="d-swiper-box" :current="currIndex" @change="changeSwiper" :style="{height:swiperHeight}">
					<swiper-item>
						<Introduce class="catalogue_0" :description='detail.description' :courseId="courseId" v-if="currIndex==0" />
					</swiper-item>
					<swiper-item>
						<Catalogue class="catalogue_1" v-if="currIndex==1" :list="detail.courseChapterBases" />
					</swiper-item>
					<swiper-item>
						<Evaluate class="catalogue_2" v-if="currIndex==2" :detail="detail.courseScoreBaseTotal"  />
					</swiper-item>
					<swiper-item>
						<Recommend class="catalogue_3" v-if="currIndex==3" :list="detail.courseBases" />
					</swiper-item>
				</swiper>
			</div>
		</div>
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">
			<view class="icon" @click="FavorSubject">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-favor" :class="[userFavor?'text-red':'text-gray']"></text>
				</view>
				<view  :class="[userFavor?'text-red':'text-gray']">收藏</view>
			</view>
			<div class="submit">
				<p class="btn">立即学习</p>
			</div>
		</view>
	</view>
</template>

<script>
	import Introduce from '@/components/study/introduce.vue';
	import Catalogue from '@/components/study/catalogue.vue';
	import Evaluate from '@/components/study/evaluate.vue';
	import Recommend from '@/components/study/recommend.vue';
	export default {
		components:{
			Introduce,
			Catalogue,
			Evaluate,
			Recommend
		},
		data() {
			return {
				currIndex:0,
				swiperHeight:'',
				isFixed: false,
				userFavor:'',
				tempHeight:'',
				courseId: '',
				detail:{}
			}
		},
		onLoad(options) {
			this.courseId = options.courseId;
			var tempHeight = 800;
			var that = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {                  
					tempHeight = res.windowHeight;
					uni.createSelectorQuery().select(".header").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						tempHeight -= data.height;
						that.swiperHeight = tempHeight + 'px';
						uni.createSelectorQuery().select("#foot-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							// console.log("减掉底部后的高度 " + tempHeight);
							that.swiperHeight = tempHeight + 'px';
							that.tempHeight = tempHeight;
							// console.log("滑屏最后高度 " + that.swiperHeight);
						}).exec();
			
					}).exec();
				}
			});
		},
		onReady() {
			this.getHeight('.catalogue_'+0);
			this.getQuery();
		},
		methods: {
			getQuery(){
				this.$http.getStudyInterface({
					CourseId:this.courseId
				}).then(res=>{
					this.detail = res.returnValue;
					if(this.detail.courseScoreBaseTotal && this.detail.courseScoreBaseTotal.itemList){
						this.detail.courseScoreBaseTotal.itemList.map(item=>{
							item.modifiedOn = this.$tui.formData(item.modifiedOn);
						})
					}
				})
			},
			getStudyFavor(){
				this.$http.getStudyFavor({
					CourseId: this.courseId
				}).then(res=>{
					console.log(res);
				})
			},
			async handleTab(index){
				this.currIndex = index;
				let className = '.catalogue_'+index;				
				this.getHeight(className)
			},
			changeSwiper(e){
				this.currIndex = e.detail.current;
				let className = '.catalogue_'+this.currIndex;
				this.getHeight(className)
			},
			getHeight(className){
				var that = this;
				const query = uni.createSelectorQuery()
				let height = this.swiperHeight;
				setTimeout(()=>{					
					query.select(className).boundingClientRect(rect=>{
						height = rect.height + 'px';
						if(rect.height>=that.tempHeight){
							that.swiperHeight = height;
						}else {
							that.swiperHeight = that.tempHeight + 'px'
						}
					}).exec()
				},100)
				return height;
			},
			FavorSubject(){
				// this.userFavor = !this.userFavor;
				if(!this.userFavor){					
					this.$http.getStudyCollection({
						CourseId: this.courseId
					}).then(res=>{
						if(res.returnValue!=''){
							this.userFavor = true;
						}
					})
				}else {
					this.$http.getStudyCancelCollection({
						CourseId: this.courseId
					}).then(res=>{
						if(res.returnValue!=''){
							this.userFavor = false;
						}
					})
				}
			}
		},
		onPageScroll(e) {
			var that = this;
			var top = e.scrollTop;
			if(e.scrollTop<=80){
				that.isFixed = false;
			}else {				
				wx.createSelectorQuery().select('#d-tabs').boundingClientRect(rect=>{
					if(rect.top<=0){
						that.isFixed = true;
					}
				}).exec()
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
		background: #FFFFFF;
	}
.wrapper{
	.cover{
		width: 100%;
		background: #d24941;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		box-shadow: 0 10rpx 10rpx rgba(255,255,255,.5);
		.title{
			font-size: 28rpx;
			color: #FFFFFF;
			font-size: 32rpx;
			font-weight: bold;
			display: flex;
			align-items: center;
			.tag{
				display: inline-block;
				width: 60rpx;
				height: 30rpx;
				line-height: 30rpx;
				text-align: center;
				font-size: 20rpx;
				color: #FFFFFF;
				border-top-right-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
				border: 1rpx solid #FFFFFF;
				margin-right: 10rpx;
			}
		}
		.duty{
			line-height: 2;
			font-size: 28rpx;
			color: #FFFFFF;
			.name{
				padding-right: 10rpx;
			}
		}
		.introduce{
			line-height: 1.5;
			font-size: 28rpx;
			color: #FFFFFF;
		}
	}
	.d-tabs{
		display: flex;
		background: #FFFFFF;
		// box-shadow: 0 15rpx 20rpx 10rpx #fff;
		font-size: 28rpx;
		padding: 20rpx 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #e2e3e5;
		box-sizing: border-box;
		.d-tab{
			color: #666666;
			font-weight: bold;
			border-bottom: 5rpx solid transparent;
			span{
				display: inline-block;
				padding-bottom: 10rpx;
			}
		}
		.d-tab.active{
			color: #d24941;
			border-bottom: 5rpx solid #d24941;
		}
	}
	.d-tabs.fixedActive{
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	.center{
		.container{
			.d-swiper-box{
				height: 100%;
			}
		}
	}
	#foot-box{
		.icon{
			width: 100rpx;
			text-align: center;
		}
		.submit{
			flex: 1;
			.btn{
				width: 90%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #d24941;
				font-size: 28rpx;
				color: #FFFFFF;
				border-radius: 50rpx;
			}
		}
	}
}
</style>
