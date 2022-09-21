<template>
	<view class="wrapper">
		<div class="header">
			<van-search v-model="searchVal" placeholder="请输入搜索关键词" @change="changeSearch" />
		</div>
		<!-- <div class="tabContainer">
			<view class="tabs">
				<view class="tab" @click="changeTab(item,index)" :class="{'active':currentTab==index}" v-for="(item,index) in tabs" :key="index">
					<span>
						{{item.name}}
					</span>
				</view>
			</view>
		</div> -->
		<!-- <div class="banner">
			<swiper indicator-dots autoplay circular :interval="5000" :duration="150" indicator-color="rgba(255, 255, 255, 0.9)"
			 indicator-active-color="#d03a28" class="tui-banner-swiper">
				<swiper-item v-for="(item,index) in banner" :key="index" @tap.stop="bannerDetail">
					<view class="tui-banner-title">{{item.title}}</view>
					<image :src="'/static/images/news/'+item.img" class="tui-slide-image" mode="widthFix" />
				</swiper-item>
			</swiper>
		</div> -->
		<div class="classWrap">
			<!-- <div class="menuItem">
				{{ selectTypeName }}
				<tui-icon name="arrowdown" color="#666" size="20" style="vertical-align: middle;"></tui-icon>
				<tui-icon name="arrowup"></tui-icon>
			</div> -->
			<van-dropdown-menu>
				<van-dropdown-item v-model="currentTab" :options="tabs" @change="changeDrop" >
					
				</van-dropdown-item>
			</van-dropdown-menu>
		</div>
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
			    tabs: [
			    ],
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
				currentTab: '',
				tabs:[],
				CourseCategoryId: '',
				visible: true,
				selectTypeName: '全部',
				dropdownShow: true
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
			changeDrop(e){
				this.currentTab = e.detail;
				this.CourseCategoryId = e.detail;
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
						item.text = item.Name.textValue;
						item.value = item.id;
						return item;
					})
					console.log('this.tabs',this.tabs)
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
			color: #d03a28;
			font-weight: bold;
		}
		.tab.active span{
			border-bottom: 5rpx solid #d03a28;
		}
	}
	.banner{
		padding: 30rpx;
		swiper-item{
			border-radius: 10rpx;
		}
	}
	.classWrap{
		padding: 10rpx 20rpx;
		.menuItem{
			min-width: 100rpx;
			padding: 0 20rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			color: #333;
			font-size: 24rpx;
			display: inline-block;
			background: rgb(249,250,252);
		}
	}
	.van-dropdown-menu{
		min-width: 100rpx !important;
		padding: 0 20rpx !important;
		height: 60rpx !important;
		line-height: 60rpx !important;
		text-align: center !important;
		color: #333 !important;
		font-size: 24rpx !important;
		display: inline-block !important;
		background: rgb(249,250,252) !important;
	}
	.van-dropdown-menu__title{
		line-height: inherit !important;
		font-size: 24rpx !important;
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
	}
}
</style>
