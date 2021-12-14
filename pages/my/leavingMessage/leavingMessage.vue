<template>
	<view class="container">
		<view class="title top64">留言</view>
		<view class="tui-cells">
			<textarea class="tui-textarea" placeholder="请输入问题描述" maxlength="500" placeholder-class="phcolor"
			 v-model="desc" />
			<view class="textarea-counter">{{descNum}}/500</view>
	    </view> 
	    <view class="title top64">联系电话</view>
	    <input class="tui-input"  placeholder-class="phcolor" placeholder="请输入手机号" v-model="telPhone" maxlength="11"></input>
	     <view class="tui-ptop">
			 <tui-button type="danger" shadow height="88rpx" shape="circle" @click="submit">提交</tui-button>
	    </view>
	</view>

</template>

<script>
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		computed:{
			descNum:function(){
				return this.desc.length
			}
		},
		onLoad(options) {
			
		},
		data() {
			return {
				desc:"",
				email:"",
				telPhone:""
			}
		},
		methods: {
			submit(){
				if(this.desc==''){
					this.$tui.toast({
						text: '描述不能为空!'
					})
					return false;
				}else {		
					this.$http.submitFeedback({
						Content: this.desc,
						ContactInfo: this.telPhone
					}).then(res=>{
						if(res.returnValue){
							this.$tui.toast({
								text: '提交成功',
								success:(res)=>{
									uni.navigateBack({
										delta: 1
									})
								}
							})
						}
					})
				}
			}
		}
	}
</script>

<style>
page {
  background: #fff;
}

.container {
  background-color: #fff;
  margin-top: 22rpx;
  padding: 30rpx;
  box-sizing: border-box;
  padding-bottom: 162rpx
}

.title {
  font-size: 30rpx;
  color: #666;
  padding-bottom: 32rpx;
}

.tui-cells {
  border: 1rpx solid #e6e6e6;
  border-radius: 4rpx;
  height: 280rpx;
  box-sizing: border-box;
  padding: 20rpx 20rpx 0 20rpx;
}

.tui-textarea {
  height: 210rpx;
  width: 100%;
  color: #666;
  font-size: 28rpx;
}

.pholder {
  color: #ccc;
}

.textarea-counter {
  font-size: 24rpx;
  color: #999;
  text-align: right;
  height: 40rpx;
  line-height: 40rpx;
  padding-top: 4rpx;
}

.top64 {
  margin-top: 64rpx;
}

.tui-input {
  font-size: 30rpx;
  height: 88rpx;
  border: 1rpx solid #e6e6e6;
  border-radius: 4rpx;
  padding: 0 25rpx;
  box-sizing: border-box;
}
.tui-ptop{
	padding-top: 80rpx;
}

</style>
