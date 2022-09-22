<template>
	<view class="wrapper">
		<div class="listWrap">
			<div class="itemBox">
				<div class="title">
					“全民国防教育日相关知识”专项答题
				</div>
				<div class="time">
					2022/09/17
				</div>
				<div class="options">
					<button class="btn">继续答题</button>
				</div>
			</div>
			<div class="itemBox">
				<div class="title">
					“全民国防教育日相关知识”专项答题
				</div>
				<div class="time">
					2022/09/17
				</div>
				<div class="options">
					<button class="btn">开始答题</button>
				</div>
			</div>
			<div class="itemBox">
				<div class="title">
					“全民国防教育日相关知识”专项答题
				</div>
				<div class="time">
					2022/09/17
				</div>
				<div class="options">
					<button class="btn">开始答题</button>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.listWrap{
		padding: 30rpx;
		.itemBox{
			width: 100%;
			min-height: 200rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 20rpx 30rpx;
			box-sizing: border-box;
			box-shadow: 0 2rpx 10rpx rgba(255,255,255,.6);
			margin: 30rpx 0;
			.title{
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}
			.time{
				color: #999999;
				font-size: 28rpx;
				line-height: 2;
			}
			.options{
				width: 100%;
				text-align: right;
				margin-top: 20rpx;
				.btn{
					height: 80rpx;
					line-height: 80rpx;
					display: inline-block;
					background: #D03A28;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
