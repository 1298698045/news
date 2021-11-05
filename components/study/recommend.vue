<template>
	<view class="recommend">
		<div class="container">
			<div class="name">
				推荐课程
			</div>
			<div class="curriculum">
				<div class="box" v-for="(item,index) in recommendList" :key="index">
					<div class="left_cover">
						
					</div>
					<div class="right_info">
						<h3 class="title">
							{{item.name}}
						</h3>
						<div class="position">
							<span class="tag">{{item.post}}</span>
							<span class="tag">{{item.duty}}</span>
						</div>
						<div class="nums">
							<span class="color">58</span>讲 | &nbsp;&nbsp;<span class="color">20000</span> 人已学习
						</div>
						<div class="desc">
							{{item.desc}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		name:'Recommend',
		data(){
			return {
				recommendList:[
					{
						name:'数据结构与算法之美',
						post:'架构师',
						duty:'前百度研发部负责人',
						imgUrl:'',
						desc:`
						作为一名合格党员要政治素质过硬、要有强烈的使命感，党员更应该严格自我要求。
						`
					},
					{
						name:'数据结构与算法之美',
						post:'架构师',
						duty:'前百度研发部负责人',
						imgUrl:'',
						desc:`
						作为一名合格党员要政治素质过硬、要有强烈的使命感，党员更应该严格自我要求。
						`
					},
					{
						name:'数据结构与算法之美',
						post:'架构师',
						duty:'前百度研发部负责人',
						imgUrl:'',
						desc:`
						作为一名合格党员要政治素质过硬、要有强烈的使命感，党员更应该严格自我要求。
						`
					},
					{
						name:'数据结构与算法之美',
						post:'架构师',
						duty:'前百度研发部负责人',
						imgUrl:'',
						desc:`
						作为一名合格党员要政治素质过硬、要有强烈的使命感，党员更应该严格自我要求。
						`
					},
					{
						name:'数据结构与算法之美',
						post:'架构师',
						duty:'前百度研发部负责人',
						imgUrl:'',
						desc:`
						作为一名合格党员要政治素质过硬、要有强烈的使命感，党员更应该严格自我要求。
						`
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.recommend{
		padding-bottom: 100rpx;
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
