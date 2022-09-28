<template>
	<view class="wrapper">
		<div class="box">
			<image :src="pathUrl+'/vx/images/loginBG.png'" class="imgBg" lazy-load="true"></image>
		</div>
		<div class="container">
			<h3 class="title">智慧党建平台</h3>
			<div class="content">
				<form action="">
					<van-field
						label="账号"
						label-class="label"
					    :value="userNumber"
					    placeholder="请输入用户名"
					    :border="true"
					    @change="changeUserNumber"
					  />
					  <van-field
					  	  label="密码"
						  label-class="label"
						  :type="isPassword?'text':'password'"
					      :value="password"
					      placeholder="请输入用户名"
					      :border="true"
					      @change="changePassWord"
					    >
							<div slot="right-icon">
								<p v-if="!isPassword" @click="handleShowPas">
									<i class="iconfont icon-mimayincang2"></i>
								</p>
								<p v-else  @click="handleShowPas">
									<i class="iconfont icon-mimaxianshi"></i>
								</p>
							</div>
						</van-field>
						<div class="loginBtn">
							<van-button type="default" :block="true" :round="true" :disabled="disabled" color="#d03a28" @click.stop="handleLogin">登录</van-button>
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
				password:'',
				userInfo:{
					avatarUrl:'',
					nickName: ''
				},
				code:'',
				isPassword: false,
				pathUrl: 'http://112.126.75.65:10002'
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
			let stamp30time = 30 * 60 * 1000;
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
			uni.login({
				provider:'weixin',
				success:res=>{		
					console.log(res.code,'code')
				}
			})
		},
		methods: {
			handleShowPas(){
				this.isPassword = !this.isPassword;
			},
			changeUserNumber(e){
				this.userNumber = e.detail;
			},
			changePassWord(e){
				this.password = e.detail;
			},
			async handleLogin(){
				var that = this;
				this.getUserLogin().then(res=>{
					console.log('res:',res)
					if(res.returnValue){						
						uni.login({
							provider:'weixin',
							success:res=>{		
								console.log(res.code,'code')
								that.code = res.code;
							}
						})
						uni.getUserProfile({
						  desc: '登录',
						  success: function (res) {
							console.log('用户昵称为：', res);
							uni.setStorageSync('userInfo',JSON.stringify(res));
							that.userInfo = res.userInfo;
							that.userInfo.avatarUrl = JSON.parse(res.rawData).avatarUrl;
							that.$http.getLogin({
								js_code:that.code,
								nickName: that.userInfo.nickName,
								PicUrl: that.userInfo.avatarUrl,
								userName: that.userNumber
							}).then(reponse=>{
								console.log(reponse);
								if(reponse.returnValue){									
									const {WechatAuthToken,SystemUserId} = reponse.returnValue;
									uni.setStorageSync('wechatAuthToken', WechatAuthToken)
									uni.setStorageSync('userId', SystemUserId)
									let timeStamp = new Date().getTime();
									uni.setStorageSync('timeStamp',timeStamp);
									uni.switchTab({
										url:'../tabbbar/index/index'
									})
								}
							})
						  }
						});
					}else {
						this.$tui.toast({
							text: '登陆失败！'
						})
					}
				});
				
				
				// let timeStamp = new Date().getTime();
				// uni.setStorageSync('timeStamp',timeStamp);
				// uni.switchTab({
				// 	url:'../tabbbar/index/index'
				// })
			},
			async getUserLogin(){
				let response 
				await this.$http.getUserLogin({
					LoginName: this.userNumber,
					Password: this.password
				}).then(res=>{
					response = res;
				})
				return response;
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #FFFFFF;
}
.wrapper{
	.box{
		width: 100%;
		position: relative;
		.imgBg{
			position: absolute;
			top: 0;
			width: 100%;
			height: 100vh;
		}
	}
	.container{
		width: 100%;
		position: absolute;
		top: 30%;
		.title{
			font-size: 47rpx;
			color: #333333;
			text-align: center;
			font-weight: bold;
		}
		.logo{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background: #d03a28;
			margin: 0 auto 0;
		}
		.content{
			margin-top: 83rpx;
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
			.loginBtn{
				margin-top: 100rpx;
			}
			.van-button{
				height: 88rpx !important;
				line-height: 88rpx !important;
				border-radius: 13rpx !important;
				font-size: 32rpx !important;
			}
		}
	}
	.van-cell{
		background: initial !important;
	}
	.label{
		font-size: 34rpx;
		color: #333333;
	}
	.van-cell__value{
		font-size: 34rpx;
	}
}
</style>
