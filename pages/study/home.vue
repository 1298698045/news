<template>
	<view class="wrapper">
		<div class="header">
			<van-search v-model="searchVal" placeholder="请输入搜索关键词" @change="changeSearch" />
		</div>
		<div class="tabContainer">
			<!-- <tui-tabs :tabs="tabs" color="#333" sliderBgColor="#d24941" selectedColor="#d24941" :currentTab="currentTab"  @change="changeTab"></tui-tabs> -->
			<view class="tabs">
				<view class="tab" @click="changeTab(item,index)" :class="{'active':currentTab==index}" v-for="(item,index) in tabs" :key="index">
					<span>
						{{item.name}}
					</span>
				</view>
			</view>
		</div>
		<div class="banner">
			<swiper indicator-dots autoplay circular :interval="5000" :duration="150" indicator-color="rgba(255, 255, 255, 0.9)"
			 indicator-active-color="#d24941" class="tui-banner-swiper">
				<swiper-item v-for="(item,index) in banner" :key="index" @tap.stop="bannerDetail">
					<view class="tui-banner-title">{{item.title}}</view>
					<image :src="'/static/images/news/'+item.img" class="tui-slide-image" mode="widthFix" />
				</swiper-item>
			</swiper>
		</div>
		<div class="center">
			<div class="container">
				<div class="panel">
					<div class="name">
						课程
					</div>
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
				banner: [{
					img: "banner_1.jpg",
					title: "课程1"
				}, {
					img: "banner_2.jpg",
					title: "课程2"
				}, {
					img: "banner_3.jpg",
					title: "课程3"
				}],
				recommendList:[
					{
						name:'数据结构与算法之美',
						post:'架构师',
						duty:'前百度研发部负责人',
						imgUrl:'',
						desc1:`
						作为一名合格党员要政治素质过硬、要有强烈的使命感，党员更应该严格自我要求。
						`
					},
					{
						name:'数据结构与算法之美',
						post:'架构师',
						duty:'前百度研发部负责人',
						imgUrl:'',
						desc1:`
						作为一名合格党员要政治素质过硬、要有强烈的使命感，党员更应该严格自我要求。
						`
					},
					{
						name:'数据结构与算法之美',
						post:'架构师',
						duty:'前百度研发部负责人',
						imgUrl:'',
						desc1:`
						作为一名合格党员要政治素质过硬、要有强烈的使命感，党员更应该严格自我要求。
						`
					},
					{
						name:'数据结构与算法之美',
						post:'架构师',
						duty:'前百度研发部负责人',
						imgUrl:'',
						desc1:`
						作为一名合格党员要政治素质过硬、要有强烈的使命感，党员更应该严格自我要求。
						`
					},
					{
						name:'数据结构与算法之美',
						post:'架构师',
						duty:'前百度研发部负责人',
						imgUrl:'',
						desc1:`
						作为一名合格党员要政治素质过硬、要有强烈的使命感，党员更应该严格自我要求。
						`
					}
				],
				pageNumber:1,
				pageSize: 10,
				isPage: false,
				searchVal: '',
				listType: [],
				currentTab: 0,
				tabs:[],
				CourseCategoryId: ''
			}
		},
		onLoad() {
			this.getQuery();
			this.getTypes();
		},
		methods: {
			changeTab(item,index){
				this.currentTab = index;
				this.CourseCategoryId = item.id;
				this.getQuery();
			},
			changeSearch(e){
				console.log(e)
				this.searchVal = e.detail;
				this.getQuery();
			},
			getQuery(){
				// this.$http.getStudyList({
					
				// }).then(res=>{
				// 	this.recommendList = res.returnValue;
				// })
				var filterQuery = '\nCourseCategoryId\teq\t'+this.CourseCategoryId
				this.$httpWX({
					url: '/entity/fetchall',
					method:'post',
					data:{
						objectTypeCode: 50700,
						// filterQuery: filterQuery,
						pageNumber: this.pageNumber,
						pageSize: this.pageSize,
						search: this.searchVal,
						CourseCategoryId: this.CourseCategoryId
					}
				}).then(res=>{
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
			getTypes(){
				this.$httpWX({
					url: '/entity/fetchall',
					method: 'post',
					data:{
						objectTypeCode: 50713
					}
				}).then(res=>{
					console.log(res,'typeList')
					this.listType = res.returnValue.nodes;
					this.listType.unshift({
						Name: {
							textValue:'全部'
						},
						id: ''
					})
					this.tabs = this.listType.map(item=>{
						item.name = item.Name.textValue;
						item.id = item.id;
						return item;
					})
				})
			},
			bannerDetail(){
				uni.navigateTo({
					url:'study'
				})
			},
			handleClickIn(item,index){
				uni.navigateTo({
					url:'study?courseId='+item.id
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
		background: #FFFFFF;
	}
.tui-banner-swiper {
	width: 100%;
	height: 300rpx;
	position: relative;
	border-radius: 20rpx;
}

.tui-slide-image {
	width: 100%;
	height: 300rpx!important;
	display: block;
}

.tui-banner-title {
	width: 100%;
	height: 100rpx;
	position: absolute;
	z-index: 9999;
	color: #fff;
	bottom: 0;
	padding: 0 30rpx;
	padding-top: 25rpx;
	font-size: 34rpx;
	font-weight: bold;
	background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
	box-sizing: border-box;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.wrapper{
	.tabs{
		width: 100%;
		white-space: nowrap;
		overflow: hidden;
		background: #fff;
		.tab{
			padding: 0 20rpx;
			text-align: center;
			line-height: 80rpx;
			color: #333;
			display: inline-block;
			box-sizing: border-box;
			span{
				padding-bottom: 16rpx;
				border-bottom: 5rpx solid transparent;
				font-size: 32rpx;
			}
		}
		.tab.active{
			color: #d24941;
			font-weight: bold;
		}
		.tab.active span{
			border-bottom: 5rpx solid #d24941;
		}
	}
	.banner{
		padding: 30rpx;
		swiper-item{
			border-radius: 10rpx;
		}
	}
	.container{
		padding: 30rpx;
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
			background: #d24941;
			display: block;
			border-radius: 5rpx;
			margin-right: 10rpx;
		}
		.curriculum{
			.box{
				display: flex;
				margin-top: 30rpx;
				.left_cover{
					width: 200rpx;
					height: 300rpx;
					background: #d24941;
					border-radius: 20rpx;
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
						.color{
							color: #d24941;
						}
					}
					.desc{
						font-size: 24rpx;
						line-height: 1.5;
					}
				}
			}
		}
	}
}
</style>
