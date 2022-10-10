<template>
	<view class="wrapper">
		<div class="custom-header-container">
			<image :src="pathUrl+'/vx/images/myNav.png'" class="bgImg"></image>
			<view class="custom-header-status-bar" :style="{height:getStausBarHeight}"></view>
			<view class="custom-header-title" :style="titleStyle">
				我的
			</view>
			<view class="header" @click="gotoInfo" :style="{top:navInfoTop}">
				<view class="headPortrait" @click="!isLogin&&getLogin()">
					<image class="img" v-if="isLogin" :src="userInfo.avatarUrl" mode="widthFix" />
				</view>
				<view class="userInfo">
					<view class="name">{{isLogin?userInfo.nickName:'登录'}}</view>
					<view class="tag">党员认证</view>
				</view>
			</view>
		</div>
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
			<div class="panelBox">
				<tui-list-view color="#777">
					<tui-list-cell class="cell" arrow @click="handleMyCourse">
						<i class="iconfont icon-wodekecheng"></i>
						<!-- <tui-icon name="send" color="#C70C15" size="24"></tui-icon> -->
						<view class="text">
							我的课程
						</view>
					</tui-list-cell>
					<tui-list-cell class="cell" arrow @click="handleMyExam">
						<i class="iconfont icon-wodekaoshi"></i>
						<!-- <tui-icon name="people" color="#C70C15" size="24"></tui-icon> -->
						<view class="text">
							我的考试
						</view>
					</tui-list-cell>
					<tui-list-cell class="cell" arrow @click="handleMyActivity">
						<i class="iconfont icon-wodehuodong"></i>
						<!-- <tui-icon name="kefu" color="#C70C15" size="24"></tui-icon> -->
						<view class="text">
							我的活动
						</view>
					</tui-list-cell>
					<tui-list-cell class="cell" arrow @click="handleMyQuestion">
						<i class="iconfont icon-wodewenjuan"></i>
						<!-- <tui-icon name="redpacket" color="#C70C15" size="24"></tui-icon> -->
						<view class="text">
							我的问卷
						</view>
					</tui-list-cell>
				</tui-list-view>
			</div>
			<div class="panelBox">
				<tui-list-view color="#777">
					<tui-list-cell class="cell" arrow @click="handleIntegral">
						<i class="iconfont icon-wodejifen"></i>
						<!-- <tui-icon name="send" color="#C70C15" size="24"></tui-icon> -->
						<view class="text">
							我的积分
						</view>
					</tui-list-cell>
					<tui-list-cell class="cell" arrow @click="handleMyBranch">
						<i class="iconfont icon-wodezhibu"></i>
						<!-- <tui-icon name="people" color="#C70C15" size="24"></tui-icon> -->
						<view class="text">
							我的支部
						</view>
					</tui-list-cell>
					<tui-list-cell class="cell" arrow @click="handleMyPartyCost">
						<i class="iconfont icon-wodejiaofei"></i>
						<!-- <tui-icon name="kefu" color="#C70C15" size="24"></tui-icon> -->
						<view class="text">
							我的缴费
						</view>
					</tui-list-cell>
				</tui-list-view>
			</div>
			<div class="panelBox">
				<tui-list-view color="#777">
					<tui-list-cell class="cell" arrow @click="handleLeavingMessage">
						<i class="iconfont icon-woyaoliuyan"></i>
						<!-- <image src="../../../static/images/news/2-a.png" mode="widthFix"></image> -->
						<!-- <tui-icon name="send" color="#C70C15" size="24"></tui-icon> -->
						<view class="text">
							我要留言
						</view>
					</tui-list-cell>
				</tui-list-view>
			</div>
		</div>
		<div class="outBtn">
			<van-button type="default" :block="true" :round="true" color="#d03a28" @click.stop="handleOut">退出登录</van-button>
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
				},
				pathUrl: 'http://182.92.221.64:10002'
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
		computed: {
		    getStausBarHeight(){
		    	try {
		    		const res = uni.getSystemInfoSync();
		    		return res.statusBarHeight + 'px';
		    	} catch (e) {
		    	}
		    },
			titleStyle(){
				const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
				return 'height:'+menuButtonInfo.height + 'px;' + 'line-height:'+menuButtonInfo.height+'px';
			},
			navInfoTop(){
				return uni.getSystemInfoSync().statusBarHeight + uni.getMenuButtonBoundingClientRect().height + 32 + 'px';
			},
		},
		methods: {
			// 我的课程
			handleMyCourse(){
				uni.navigateTo({
					url:'../../my/myStudy/myStudy'
				})
			},
			// 我的活动
			handleMyActivity(){
				uni.navigateTo({
					url:'../../my/myActivity/myActivity'
				})
			},
			// 我的问卷
			handleMyQuestion(){
				uni.navigateTo({
					url:'../../my/myQuestion/myQuestion'
				})
			},
			// 我的缴费
			handleMyPartyCost(){
				uni.navigateTo({
					url:"../../partyCost/partyCost"
				})
			},
			// 我的支部
			handleMyBranch(){
				uni.navigateTo({
					url:'/pages/my/myBranch/myBranch'
				})
			},
			// 我的考试
			handleMyExam(){
				uni.navigateTo({
					url:'/pages/my/myExamination/myExamination'
				})
			},
			gotoInfo(){
				uni.navigateTo({
					url:'/pages/my/userInfo/userInfo'
				})
			},
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
			},
			gotoMystudy(){
				uni.navigateTo({
					url:'/pages/my/myStudy/myStudy'
				})
			}
		}
	}
</script>

<style lang="scss">
.wrapper{
	font-size: 24rpx;
	padding-bottom: 100rpx;
	.custom-header-container{
		width: 100%;
		height: 418rpx;
		position: relative;
		overflow: hidden;
		.bgImg{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
		}
		.custom-header-title{
			width: 100%;
			text-align: center;
			color: #fff;
			position: absolute;
			font-size: 34rpx;
			font-weight: bold;
		}
	}
	.header{
		position: absolute;
		width: 100%;
		padding: 0 64rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.headPortrait{
			width: 128rpx;
			height: 128rpx;
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
			padding-left: 31rpx;
			color: #fff;
			.name{
				color: #fff;
				font-size: 36rpx;
			}
			.tag{
				display: inline-block;
				background: rgba(0, 0, 0, 0.2);
				border-radius: 20rpx;
				color: #fff;
				font-size: 24rpx;
				margin-top: 28rpx;
				padding: 2rpx 22rpx;
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
		// padding: 0 20rpx;
		.panelBox{
			background: #fff;
			// border-radius: 20rpx;
			margin-top: 16rpx;
			.tui-list-cell{
				display: flex;
				align-items: center;
				background: transparent !important;
				image{
					width: 40rpx;
				}
				.text{
					padding-left: 20rpx;
				}
				.iconfont{
					color: #D93731;
					font-size: 35rpx;
				}
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
