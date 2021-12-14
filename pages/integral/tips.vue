<template>
	<view class="wrapper">
		<div class="container" v-for="item in list">
			<div class="content">
				{{item.content}}
			</div>
			<div class="time">
				{{item.modifiedOn}}
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getIntegralInfo();
		},
		methods: {
			getIntegralInfo(){
				this.$http.getIntegralInfo({
					
				}).then(res=>{
					this.list = res.returnValue.integraWarningRulesList.filter(item=>item.integraType==0);
					this.list.map(item=>{
						item.modifiedOn = this.$tui.formData(item.modifiedOn);
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
