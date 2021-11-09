<template>
	<view class="wrapper">
		<div class="container">
			<div class="logo">
				
			</div>
			<div class="content">
				<h3 class="title">党建云登录</h3>
				<form action="">
					<van-field
						label="账号:"
						label-class="label"
					    :value="userNumber"
					    placeholder="请输入用户名"
					    :border="true"
					    @change="changeUserNumber"
					  />
					  <van-field
					  	  label="密码:"
						  label-class="label"
						  type="password"
					      :value="password"
					      placeholder="请输入用户名"
					      :border="true"
					      @change="changePassWord"
					    />
						<div class="loginBtn">
							<van-button type="default" :block="true" :round="true" :disabled="disabled" color="#C70C15" @click.stop="handleLogin">登录</van-button>
						</div>
				</form>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userNumber:'',
				password:''
			}
		},
		computed:{
			disabled(){
				return this.userNumber && this.userNumber!='' && this.password && this.password!='' ? false : true
			},
			currenStamp(){
				return new Date().getTime();
			}
		},
		onShow() {
			let localTime = uni.getStorageSync('timeStamp');
			let differTime = this.currenStamp - localTime;
			let stamp30time = 30 * 60 * 100;
			if(differTime<=stamp30time){
				uni.switchTab({
					url:'../tabbbar/index/index'
				})
			}else {
				this.$tui.toast({
					text:'已超时，请重新登录！'
				})
			}
			console.log(localTime,this.currenStamp)
			
		},
		methods: {
			changeUserNumber(e){
				this.userNumber = e.detail;
			},
			changePassWord(e){
				this.password = e.detail;
			},
			handleLogin(){
				let timeStamp = new Date().getTime();
				uni.setStorageSync('timeStamp',timeStamp);
				uni.switchTab({
					url:'../tabbbar/index/index'
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
		.logo{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background: #C70C15;
			margin: 100rpx auto 0;
		}
		.content{
			padding: 0 50rpx;
			.van-cell__title{
				min-width: 100rpx!important;
				max-width: 100rpx!important;
				margin: 0!important;
				padding: 0 !important;
			}
			.label{
				min-width: 80rpx;
			}
			.title{
				text-align: center;
				font-size: 32rpx;
				color: #333333;
				font-weight: bold;
				padding: 30rpx 0;
			}
			.loginBtn{
				margin-top: 100rpx;
			}
		}
	}
}
</style>
