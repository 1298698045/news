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
				<tui-icon name="arrowright"></tui-icon>
			</view>
		</view>
		<view class="row">
			<view class="box">
				<view class="icon">
					<tui-icon name="star" color="#ff7c0a"></tui-icon>
				</view>
				<view>我的收藏</view>
			</view>
			<view class="box">
				<view class="icon">
					<tui-icon name="message" color="#4ee8ff"></tui-icon>
				</view>
				<view>我的评论</view>
			</view>
			<view class="box">
				<view class="icon">
					<tui-icon name="clock" color="#55ff7f"></tui-icon>
				</view>
				<view>浏览历史</view>
			</view>
		</view>
		<div class="content">
			<tui-list-view color="#777">
				<tui-list-cell class="cell" arrow>
					<tui-icon name="send" color="#C70C15" size="24"></tui-icon>
					<view class="text">
						我的历程
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell" arrow>
					<tui-icon name="people" color="#C70C15" size="24"></tui-icon>
					<view class="text">
						党员承诺
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell" arrow>
					<tui-icon name="kefu" color="#C70C15" size="24"></tui-icon>
					<view class="text">
						在线客服
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell" arrow @click="handleIntegral">
					<tui-icon name="kefu" color="#C70C15" size="24"></tui-icon>
					<view class="text">
						学习积分
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell" arrow @click="handleLeavingMessage">
					<tui-icon name="kefu" color="#C70C15" size="24"></tui-icon>
					<view class="text">
						我要留言
					</view>
				</tui-list-cell>
			</tui-list-view>
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
		background: #C70C15;
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
				text-align: center;
			}
		}
	}
	.content{
		.tui-list-cell{
			display: flex;
			align-items: center;
			.text{
				padding-left: 20rpx;
			}
		}
	}
}
</style>
