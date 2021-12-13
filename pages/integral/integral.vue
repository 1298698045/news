<template>
	<view class="wrapper">
		<div class="header">
			<div class="row">
				<div class="tips" @click="handleTips">
					<van-icon name="service-o" />
					<span>
						提示警告
					</span>
				</div>
				<p class="text">成长总积分</p>
				<div class="explain" @click="handleExplain">积分说明 <van-icon name="arrow" /></div>
			</div>
			<div class="cont">
				<p class="num">100</p>
				<p class="desc">段位：积分不足，暂无段位</p>
			</div>
		</div>
		<div class="center">
			<div class="container">
				<div class="row">
					<h2 class="name">积分规则</h2>
					<p class="right_text">
						今日已积累 <span>1积分</span>
					</p>
				</div>
				<div class="content">
					<div class="box" v-for="item in 9">
						<div class="left">
							<p class="name">登录</p>
							<p class="desc">1分/每日首次登录</p>
							<div class="cel">
								<span class="speed"></span>
								已获1分/每日上线1分
							</div>
						</div>
						<div class="right">
							<p class="statusBtn">
								已完成
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					
				]
			}
		},
		methods: {
			handleTips(){
				uni.navigateTo({
					url:'tips'
				})
			},
			handleExplain(){
				uni.navigateTo({
					url:'explain'
				})
			}
		},
		onPullDownRefresh () {
		    wx.stopPullDownRefresh()
		},
		onReachBottom(e) {
			console.log(e)
		},
	}
</script>

<style lang="scss">
	page{
		background: #FFFFFF;
	}
.wrapper{
	.header{
		width: 100%;
		background: #d24941;
		color: #FFFFFF;
		padding-left: 30rpx;
		box-sizing: border-box;
		padding-bottom: 30rpx;
		.row{
			display: flex;
			justify-content: space-between;
			padding: 20rpx 0;
			.tips{
				border-radius: 30rpx;
				padding: 10rpx 20rpx;
				background: #FFFFFF;
				color: #d24941;
				font-weight: bold;
				display: flex;
				align-items: center;
				span{
					padding-left: 20rpx;
				}
			}
			.text{
				padding-right: 90rpx;
			}
			.explain{
				font-size: 24rpx;
				background: #FFFFFF;
				border-top-left-radius: 30rpx;
				border-bottom-left-radius: 30rpx;
				color: #d24941;
				width: 80px;
				height: 50rpx;
				line-height: 50rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.cont{
			text-align: center;
			padding-right: 20rpx;
			box-sizing: border-box;
			.num{
				margin: 0 auto;
				line-height: 2;
			}
		}
	}
	.center{
		.container{
			padding: 0 30rpx;
			.row{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #e2e3e5;
				padding: 30rpx 0;
				h2{
					font-size: 32rpx;
					font-weight: bold;
					color: #333333;
				}
				.right_text{
					color: #333333;
					font-size: 24rpx;
					span{
						color: #d24941;
						padding-left: 10rpx;
					}
				}
			}
			.content{
				.box{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 30rpx 0;
					border-bottom: 1rpx solid #e2e3e5;
					.left{
						.name{
							font-size: 28rpx;
							color: #333333;
							font-weight: bold;
						}
						.desc{
							font-size: 24rpx;
							color: #767676;
							line-height: 2;
						}
						.cel{
							font-size: 22rpx;
							color: #767676;
							display: flex;
							align-items: center;
							.speed{
								display: inline-block;
								width: 100rpx;
								height: 10rpx;
								background: #dedede;
								border-radius: 10rpx;
								margin-right: 20rpx;
							}
							.speed.active{
								background: #d24941;
							}
						}
					}
					.right{
						.statusBtn{							
							width: 120rpx;
							height: 50rpx;
							line-height: 50rpx;
							text-align: center;
							font-size: 28rpx;
							color: #999999;
							background: #dedede;
						}
						.statusBtn.active{
							color: #FFFFFF;
							background: #d24941;
						}
					}
				}
			}
		}
	}
}
</style>
