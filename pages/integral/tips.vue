<template>
	<view class="wrapper">
		<div class="container" v-for="item in list">
			<div class="content">
				{{item.Content}}
			</div>
			<div class="time">
				{{item.ModifiedOn}}
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				token: uni.getStorageSync('wechatAuthToken')
			}
		},
		onLoad() {
			this.getIntegralInfo();
		},
		methods: {
			getIntegralInfo(){
				this.$http.getIntegralInfo({
					token: this.token
				}).then(res=>{
					this.list = res.returnValue.IntegraWarningRulesList.filter(item=>item.IntegraType==0);
					this.list.map(item=>{
						item.ModifiedOn = this.$tui.formData(item.ModifiedOn);
					})
				})
			},
		}
	}
</script>

<style lang="scss">
.wrapper{
	.container {
		padding: 30rpx;
		.content{
			font-size: 28rpx;
			color: #333333;
			line-height: 1.5;
		}
		.time{
			font-size: 28rpx;
			font-weight: bold;
			text-align: right;
			line-height: 2;
		}
	}
}
</style>
