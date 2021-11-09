<template>
	<view class="wrapper">
		<tui-notice-bar is-left scrollable color="#f54f46" :content="content">
			<template v-slot:left>
				<view class="tui-padding">
					<tui-icon name="news-fill" :size="48" unit="rpx" color="#f54f46"></tui-icon>
				</view>
			</template>
		</tui-notice-bar>
		<!-- <div class="tips">积分试行期间，积分规则将会适时调整，带来不便敬请谅解</div> -->
		<div class="center">
			<div class="container">
				<div class="content">
					积分试行期间，积分规则将会适时调整，带来不便敬请谅解积分试行期间，积分规则将会适时调整，带来不便敬请谅解积分试行期间，积分规则将会适时调整，
					带来不便敬请谅解积分试行期间，积分规则将会适时调整，带来不便敬请谅解积分试行期间，积分规则将会适时调整，带来不便敬请谅解
				</div>
				<div class="box">
					<div class="title">
						登录
					</div>
					<div class="desc">
						每日首次登录积1分。
					</div>
				</div>
				<div class="box">
					<div class="title">
						我要选读文章
					</div>
					<div class="desc">
						每有效阅读或播报一篇文章积1分，上限6分。有效阅读或播报文章累计1分，上限6分。每日上限积12分。
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
				content:"积分试行期间，积分规则将会适时调整，带来不便敬请谅解"
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #FFFFFF;
	}
.wrapper{
	.tips{
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		padding-left: 30rpx;
		font-size: 24rpx;
		color: #333333;
		background: rgba(255,192,203,.3);
	}
	.center{
		.container{
			padding: 30rpx;
			.content{
				font-size: 28rpx;
				line-height: 1.5;
			}
			.box{
				margin-top: 20rpx;
				margin-bottom: 50rpx;
				.title{
					font-size: 28rpx;
					font-weight: bold;
					color: #333333;
					display: flex;
					align-items: center;
				}
				.title::before{
					content: '';
					width: 8rpx;
					height: 30rpx;
					background: #C70C15;
					display: block;
					margin-right: 20rpx;
				}
				.desc{
					font-size: 24rpx;
					color: #999999;
					line-height: 1.5;
				}
			}
		}
	}
}
</style>
