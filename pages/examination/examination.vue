<template>
	<view class="wrapper">
		<div class="column">
			<div class="box" @click="handleExamination">
				<div class="icon"></div>
				<p class="text">科目一</p>
			</div>
			<div class="box">
				<div class="icon"></div>
				<p class="text">科目二</p>
			</div>
			<div class="box">
				<div class="icon"></div>
				<p class="text">科目三</p>
			</div>
			<div class="box">
				<div class="icon"></div>
				<p class="text">科目四</p>
			</div>
			<div class="box">
				<div class="icon"></div>
				<p class="text">科目五</p>
			</div>
			<div class="box">
				<div class="icon"></div>
				<p class="text">科目六</p>
			</div>
			<div class="fake_item"></div>
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
			handleExamination(){
				uni.navigateTo({
					url:'introduce/introduce'
				})
			}
		}
	}
</script>

<style lang="scss">
.wrapper{
	.column{
		display: flex;
		background: #FFFFFF;
		font-size: 28rpx;
		justify-content: space-between;
		padding:30rpx 0;
		flex-wrap: wrap;
		.box{
			width: 33%;
			text-align: center;
			.icon{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background: #CCCCCC;
				margin: 0 auto;
			}
			.text{
				padding-bottom: 10rpx;
			}
		}
	}
}
</style>
