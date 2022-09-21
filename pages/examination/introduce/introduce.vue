<template>
	<view class="wrapper">
		<div class="container">
			<div class="content">
				<div class="row">
					<p class="label">考试题目</p>
					<p class="val">{{name || ''}}</p>
				</div>
				<div class="row">
					<p class="label">考题数量</p>
					<p class="val"><span class="num">30</span>题目</p>
				</div>
				<div class="row">
					<p class="label">考试时间</p>
					<p class="val"><span class="num">30</span>分钟</p>
				</div>
				<div class="row">
					<p class="label">合格标准</p>
					<p class="val">满分100分，60分及格</p>
				</div>
				<div class="row">
					<p class="label">出题规则</p>
					<p class="val">按规定比例随机抽取</p>
				</div>
			</div>
		</div>
		<div class="footer">
			<div class="box" @click="handleHref">
				<div class="btn" :class="{'active':isPhoneX}">
					在线考试
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isPhoneX:this.$tui.isPhoneX(),
				id: '',
				name: ''
			}
		},
		onLoad(options) {
			this.name = options.name;
			this.id = options.id;
		},
		methods: {
			handleHref(){
				uni.navigateTo({
					url:'../subject/subject?id='+this.id
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #FFFFFF;
}
.wrapper{
	.container{
		.content{
			padding: 200rpx 80rpx;
			.row{
				display: flex;
				font-size: 28rpx;
				line-height: 2;
				.val{
					color: #999999;
					margin-left: 20rpx;
					span{
						color: #d03a28;
					}
				}
			}
		}
	}
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		background: #fff;
		box-shadow: 0 2rpx 10rpx 0 rgba(0,0,0,.3);
		.box{
			display: flex;
			.btn{
				flex: 1;
				line-height: 100rpx;
				font-size: 32rpx;
				text-align: center;
				background: #d03a28;
				color: #FFFFFF;
			}
			.btn.active{
				padding-bottom: 50rpx;
			}
		}
	}
}
</style>
