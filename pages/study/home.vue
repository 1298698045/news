<template>
	<view class="wrapper">
		<div class="banner">
			<swiper indicator-dots autoplay circular :interval="5000" :duration="150" indicator-color="rgba(255, 255, 255, 0.9)"
			 indicator-active-color="#C70C15" class="tui-banner-swiper">
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
					<CourseBox :list="recommendList" :desc="'desc1'" />
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
				]
			}
		},
		methods: {
			bannerDetail(){
				uni.navigateTo({
					url:'study'
				})
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
			background: #C70C15;
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
					background: #C70C15;
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
							color: #C70C15;
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
