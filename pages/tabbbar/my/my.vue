<template>
	<view class="wrapper">
		<view class="header">
			<view class="headPortrait" @click="!isLogin&&getLogin()">
				<image class="img" v-if="isLogin" :src="userInfo.avatarUrl" mode="widthFix" />
			</view>
			<view class="userInfo">
				<view class="name">{{isLogin?userInfo.nickName:'登录'}}</view>
				<view class="tag">党员认证</view>
			</view>
			<view class="arrow_icon">
				<tui-icon name="arrowright" color="#ffffff"></tui-icon>
			</view>
		</view>
		<view class="row">
			<view class="box">
				<view class="icon">
					<image src="../../../static/images/news/1-a.png" mode="widthFix"></image>
				</view>
				<view>我的收藏</view>
			</view>
			<view class="box">
				<view class="icon">
					<image src="../../../static/images/news/1-b.png" mode="widthFix"></image>
				</view>
				<view>我的评论</view>
			</view>
			<view class="box">
				<view class="icon">
					<image src="../../../static/images/news/1-c.png" mode="widthFix"></image>
				</view>
				<view>浏览历史</view>
			</view>
		</view>
		<div class="content">
			<tui-list-view color="#777">
				<tui-list-cell class="cell" arrow>
					<image src="../../../static/images/news/2-a.png" mode="widthFix"></image>
					<!-- <tui-icon name="send" color="#C70C15" size="24"></tui-icon> -->
					<view class="text">
						我的历程
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell" arrow>
					<image src="../../../static/images/news/2-b.png" mode="widthFix"></image>
					<!-- <tui-icon name="people" color="#C70C15" size="24"></tui-icon> -->
					<view class="text">
						党员承诺
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell" arrow>
					<image src="../../../static/images/news/2-c.png" mode="widthFix"></image>
					<!-- <tui-icon name="kefu" color="#C70C15" size="24"></tui-icon> -->
					<view class="text">
						在线客服
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell" arrow @click="handleIntegral">
					<image src="../../../static/images/news/2-d.png" mode="widthFix"></image>
					<!-- <tui-icon name="redpacket" color="#C70C15" size="24"></tui-icon> -->
					<view class="text">
						学习积分
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell" arrow @click="handleLeavingMessage">
					<image src="../../../static/images/news/2-e.png" mode="widthFix"></image>
					<!-- <tui-icon name="evaluate" color="#C70C15" size="24"></tui-icon> -->
					<view class="text">
						我要留言
					</view>
				</tui-list-cell>
			</tui-list-view>
		</div>
		<div class="outBtn">
			<van-button type="default" :block="true" :round="true" color="#d24941" @click.stop="handleOut">退出登录</van-button>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLogin:false,
				userInfo:{
					avatarUrl:'',
					nickName: ''
				}
			}
		},
		onShow(){
			let userInfo = uni.getStorageSync('userInfo')
			if(userInfo){
				userInfo = JSON.parse(userInfo);
				this.userInfo = userInfo.userInfo;
				this.userInfo.avatarUrl = JSON.parse(userInfo.rawData).avatarUrl;
				this.isLogin = true;
			}
		},
		methods: {
			getLogin(){
				var that = this;
				uni.login({
					provider:'weixin',
					success:res=>{		
						console.log(res.code,'code')
					}
				})
				uni.getUserProfile({
				  desc: '登录',
				  success: function (res) {
					console.log('用户昵称为：', res);
					that.isLogin = true;
					uni.setStorageSync('userInfo',JSON.stringify(res));
					that.userInfo = res.userInfo;
					that.userInfo.avatarUrl = JSON.parse(res.rawData).avatarUrl;
				  }
				});
			},
			handleIntegral(){
				uni.navigateTo({
					url:'../../integral/integral'
				})
			},
			handleLeavingMessage(){
				uni.navigateTo({
					url:'../../my/leavingMessage/leavingMessage'
				})
			},
			handleOut(){
				const callback = (e)=>{
					console.log(e);
					if(e){
						uni.removeStorageSync('timeStamp');
						uni.removeStorageSync('wechatAuthToken');
						uni.reLaunch({
							url:'../../login/login'
						})
					}
				}
				this.$tui.modal('','确定要退出登录吗？',true,callback,'#C70C15')
			}
		}
	}
</script>

<style lang="scss">
.wrapper{
	font-size: 24rpx;
	.header{
		width: 100%;
		padding: 30rpx 20rpx;
		background: #d24941;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.headPortrait{
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			background: #fff;
			.img{
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}
		.userInfo{
			flex: 1;
			padding-left: 20rpx;
			color: #fff;
			.name{
				color: #fff;
				font-weight: bold;
			}
		}
	}
	.row{
		margin: 20rpx 0;
		display: flex;
		justify-content: space-between;
		padding: 20rpx 60rpx;
		box-sizing: border-box;
		background: #fff;
		.box{
			.icon{
				width: 50rpx;
				height: 50rpx;
				text-align: center;
				margin: 0 auto 10rpx;
				image{
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
	.content{
		.tui-list-cell{
			display: flex;
			align-items: center;
			image{
				width: 40rpx;
			}
			.text{
				padding-left: 20rpx;
			}
		}
	}
	.outBtn{
		margin-top: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}
}
</style>
