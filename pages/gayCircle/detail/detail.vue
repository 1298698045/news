<template>
	<view class="wrapper" v-cloak>
		<div class="header">
			<div class="title">标题标题标题标题标题！</div>
			<div class="row">
				<div class="radius" @click="handlePersonalHome">
					
				</div>
				<div class="info">
					<p class="name">啤酒泡沫</p>
					<p class="time">2小时前</p>
				</div>
				<div class="fllow" :class="{'active':isFllow}" @click="handleFllow">
					<tui-icon name="plus" size="12" color="#fff" v-if="!isFllow"></tui-icon>&nbsp;&nbsp;关注
				</div>
			</div>
		</div>
		<div class="container">
			<div class="desc">
				描述信息 
			</div>
			<div class="business">
				<div class="opreation">					
					<div class="like" @click="handleLike">
						<div class="like_icon" :class="{'active':isLike}">
							<tui-icon v-if="!isLike" name="agree" size="24" color="#C70C15"></tui-icon>
							<tui-icon v-if="isLike" name="agree" size="24" color="#FFF"></tui-icon>
						</div>
						<p class="text">
							点赞
						</p>
					</div>
					<div class="share">
						<button open-type="share" class="btn">
							发送给朋友
						</button>
						<button class="btn" @click="handleShare">
							分享到朋友圈
						</button>
					</div>
				</div>
			</div>
			<div class="read">
				阅读 999
			</div>
		</div>
		<div class="commentWrap">
			<view class="tui-cmt-title">精彩评论（20）</view>
			<view class="tui-cmtbox">
				<view class="tui-cmt-cell" v-for="(item, index) in cmtList" :key="index">
					<image :src="'/static/images/news/' + item.avatar" class="tui-avatar"></image>
					<view class="tui-cmt-detail">
						<view class="tui-header-box">
							<view class="tui-cmt-nickname">{{ item.nickname }}</view>
							<view class="tui-fabulous" :class="[item.isFabulous ? 'tui-primary' : '']" :id="index" @tap="cmtFabulous">
								<text>{{ item.fabulous == 0 ? '赞' : item.fabulous }}</text>
								<tui-icon :name="iconName(item.isFabulous)" :size="15" :color="itemIconColor(item.isFabulous)"></tui-icon>
							</view>
						</view>
						<view class="tui-cmt-content">{{ item.content }}</view>
						<view class="tui-reply-box" v-if="item.replayNum > 0">
							<tui-list-cell
								backgroundColor="#f2f2f2"
								:size="28"
								v-for="(items, index2) in item.reply"
								:key="index2"
								:unlined="item.replayNum < 2 && item.reply.length - 1 == index"
								@tap="cmtReply"
							>
								<view class="tui-flex-1 tui-reply-nickname">{{ items.nickname }}</view>
								<view class="tui-flex-1">{{ items.content }}</view>
							</tui-list-cell>
							<tui-list-cell padding="20rpx 30rpx" backgroundColor="#f2f2f2" :size="28" :unlined="true" v-if="item.replayNum > 2" @tap="cmtReply">
								<view class="tui-flex-1  tui-cell-last">
									<text>共{{ item.replayNum }}条回复</text>
									<tui-icon name="arrowright" :size="22" color="#C70C15"></tui-icon>
								</view>
							</tui-list-cell>
						</view>
						<view class="tui-footer">
							{{ item.time }}
							<view class="tui-primary tui-ml" hover-class="opcity" :hover-start-time="150" @tap="cmtReply">回复</view>
						</view>
					</view>
				</view>
			</view>
		</div>
		<div class="footer">
			<div class="comment" :class="{'active':isPhoneX}">
				<div class="inp" @click="isShow = true">
					我来说两句
				</div>
				<div class="collection">
					<p @click="isCollection=!isCollection">
						<tui-icon name="star" size="20" v-if="!isCollection"></tui-icon>
						<tui-icon name="star-fill" color="#C70C15" size="20" v-if="isCollection"></tui-icon>
					</p>
					<p class="num" :class="{'active':isCollection}">0</p>
				</div>
			</div>
		</div>
		<div class="reply" catchtouchmove="true" v-if="isShow" @tap="handleClose">
			<div class="content" :style="{'bottom':keyboardHeight+'px'}" @click.stop>
				<div class="bd">
					<div class="rowText">
						<p class="text">回复楼主</p>
						<p class="text" @click.stop="handleClose">取消</p>
					</div>
					<div class="cont">
						<textarea class="textarea" @input.stop="handleInp" v-model="comment" fixed="true"  confirm-hold="true" :adjust-position="false" :show-confirm-bar="false" cursor-spacing='140' placeholder="我来说两句..." :auto-focus="true" name="" id="" maxlength="500" cols="30" rows="10"></textarea>
					</div>
					<div class="send">
						<button class="btn" @click.stop="handleSend()">发送</button>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import {shareMixins,shareWechat} from '@/mixins/shareMixins.js';
	export default {
		mixins:[shareMixins,shareWechat],
		data() {
			return {
				isPhoneX:this.$tui.isPhoneX(), // 判断是否是iPhoneX以上机型
				isCollection:false, // 是否收藏
				isFllow: false, // 是否关注
				isIphone:this.$tui.isIphone, // 是否为iPhone
				shareData: {
					title: '我是分享标题',
					path: '/pages/gayCircle/detail/detail' // 分享的页面路径
				},
				share: {
					title: '我是分享标题',
					path: '/pages/gayCircle/detail/detail' // 分享的页面路径
				},
				isFocus:true,
				comment:'',
				isShow:false,
				keyboardHeight:'',
				cmtList: [{
					avatar: "list_2.jpg",
					nickname: "米兰的卡先生",
					fabulous: 123,
					isFabulous: false,
					content: "我一直没懂赛前问一个主教练如何评价对手的主教练， 记者究竟是想得到什么答案？",
					reply: [{
						nickname: "Mesaldo",
						content: "汉军威武!卓尔不凡!火炉德比，热力四射！场上争胜，场下朋友☺ ☻"
					}, {
						nickname: "月牙",
						content: "新政实行后，大小摩托轮流冲，不用经常上迪力了，杨帅该拿下就拿下☺"
					}],
					replayNum: 44,
					time: "昨天 22:12"
				}, {
					avatar: "avatar_1.jpg",
					nickname: "月牙",
					fabulous: 2,
					content: "力帆有杨帅，迪力木来提，尹聪耀，完全可以应付。尤其是杨帅坐稳主力后卫。",
					reply: [{
						nickname: "thorui",
						content: "汉军威武!卓尔不凡!火炉德比，热力四射！场上争胜，场下朋友"
					}, {
						nickname: "Mr卡卜斯",
						content: "说实话，武汉重庆还真的是一家，但是比赛还是要分出个胜负来的，我卓尔球迷肯定是要为我武汉加油了，按照目前两队现在这个状态来看武汉重庆应该是五五开，所以我想说武汉加油！卓尔加油！"
					}],
					replayNum: 2,
					time: "昨天 21:09"
				}, {
					avatar: "avatar_2.jpg",
					nickname: "thorui",
					fabulous: 0,
					content: "小克鲁伊夫带的球队",
					reply: [],
					replayNum: 0,
					time: "昨天 17:30"
				}],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				isLike:false
			}
		},
		computed: {
			iconColor() {
				return this.isFabulous ? '#C70C15' : '#333'
			},
			itemIconColor() {
				return function(isFabulous) {
					return isFabulous ? '#C70C15' : '#9a9a9a'
				}
			},
			iconName() {
				return function(isFabulous) {
					return isFabulous ? 'agree-fill' : 'agree'
				}
			}
		},
		onShow(){
			wx.onKeyboardHeightChange(res => { //监听键盘高度变化
				console.log(res.height,'res');
				this.keyboardHeight = res.height;
			})
		},
		methods: {
			handleFllow(){
				if(this.isFllow){
					var that = this;
					const callback = function (res){
						if(res){
							that.isFllow = false;
						}else {
							that.isFllow = true;
						}
					}
					this.$tui.modal('','确定不再关注啤酒泡沫？',true,callback,'#C70C15')
				}else {
					this.isFllow = !this.isFllow;
				}
			}, 
			handleShare(){
				const callback = function(res){
					console.log(123123)
				}
				this.$tui.modal('','抱歉，苹果不支持分享到朋友圈',false,callback,'#C70C15');
			},
			changeKeyBoard(e){
				console.log(e);
			},
			handleClose(){
				this.isShow = false;
			},
			handleInp(){
				
			},
			handleSend(){
				this.isShow = false;
			},
			btnFabulous: function() {
				this.fabulous = this.isFabulous ? 123 : 124;
				this.isFabulous = !this.isFabulous
			},
			cmtFabulous: function(e) {
				let index = e.currentTarget.id;
				let fabulousObj = this.cmtList[index];
				let isFabulous = this.cmtList[index].isFabulous;
				let fabulous = this.cmtList[index].fabulous;
				let fabulousNum = isFabulous ? fabulous - 1 : fabulous + 1;
				this.$set(fabulousObj, "fabulous", fabulousNum);
				this.$set(fabulousObj, "isFabulous", !isFabulous);
			},
			collection: function() {
				this.isCollection = !this.isCollection
				if (this.isCollection) {
					this.tui.toast("收藏成功！");
				}
			},
			cmtReply: function() {
				uni.navigateTo({
					url: '/pages/news/reply/reply'
				})
			},
			handleLike(){
				this.isLike = !this.isLike;
			},
			handlePersonalHome(){
				uni.navigateTo({
					url:'../PersonalHome/PersonalHome'
				})
			}
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true
			if (this.pageIndex == 3) {
				this.loadding = false;
				this.pullUpOn = false
			} else {
				let arr = JSON.parse(JSON.stringify(this.cmtList));
				this.cmtList = this.cmtList.concat(arr);
				this.pageIndex = this.pageIndex + 1;
				this.loadding = false
			}
		}
	}
</script>

<style lang="scss">
	page{
		background: #FFFFFF;
	}
.wrapper{
	.header{
		padding: 30rpx;
		.title{
			font-size: 32rpx;
			font-weight: bold;
			color: #333333;
		}
		.row{
			display: flex;
			align-items: center;
			margin: 20rpx 0;
			.radius{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				border: 1rpx solid #CCCCCC;
			}
			.info{
				flex: 1;
				margin-left: 10rpx;
				.name{
					font-size: 28rpx;
					color: #333333;
				}
				.time{
					font-size: 24rpx;
					color: #999;
				}
			}
			.fllow{
				font-size: 28rpx;
				color: #FFFFFF;
				background: #C70C15;
				border-radius: 50rpx;
				width: 120rpx;
				height: 60rpx;
				line-height: 60rpx;
				text-align: center;
			}
			.fllow.active{
				background: #EEEEEE;
				color: #999999
			}
		}
	}
	.container{
		padding: 0 30rpx;
		.desc{
			font-size: 28rpx;
			border-bottom: 1rpx solid #e2e3e5;
			padding-bottom: 30rpx;
		}
		.business{
			display: flex;
			justify-content: center;
			.like{
				text-align: center;
				margin: 30rpx 0;
				.like_icon{
					width: 100rpx;
					height: 100rpx;
					line-height: 100rpx;
					text-align: center;
					border-radius: 50%;
					border: 1rpx solid #C70C15;
					margin: 0rpx auto;
				}
				.like_icon.active{
					border: 1rpx solid transparent;
					background: #C70C15;
				}
				.text{
					font-size: 24rpx;
					color: #333333;
					line-height: 2;
				}
				.text.active{
					color: #C70C15;
				}
			}
			.share{
				display: flex;
				justify-content: center;
				margin: 10rpx 0;
				.btn{
					width: 200rpx;
					text-align: center;
					max-width: 200rpx;
					border: 1rpx solid #e2e3e5;
					font-size: 24rpx;
					padding: 10rpx 20rpx;
					border-radius: 50rpx;
					box-sizing: border-box;
				}
				.btn:first-child{
					margin-right: 10rpx;
				}
				button{
					line-height: initial !important;
				}
			}
		}
		.read{
			font-size: 28rpx;
			color: #999999;
			margin-top: 50rpx;
		}
	}
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		border-top: 1rpx solid #e2e3e5;
		background: #FFFFFF;
		.comment{
			margin: 20rpx 30rpx;
			display: flex;
			align-items: center;
			.inp{
				flex: 1;
				width: 100%;
				border-radius: 50rpx;
				background: #EDEDED;
				color: #999999;
				font-size: 24rpx;
				padding-left: 20rpx;
				line-height: 60rpx;
				height: 60rpx;
			}
			.collection{
				width: 80rpx;
				text-align: right;
				font-size: 24rpx;
				.num{
					padding-right: 12rpx;
					color: #999999;
				}
				.num.active{
					color: #C70C15;
				}
			}
		}
		.comment.active{
			padding-bottom: 50rpx;
		}		
	}
	.reply{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999;
		background: rgba(0,0,0,.6);
		.content{
			width: 100%;
			// min-height: 500rpx;
			background: #fff;
			position: absolute;
			bottom: 0;
			.bd{
				padding: 20rpx;
				box-sizing: border-box;
				.rowText{
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					color: #333333;
				}
				.cont{
					background: #d4d4d4;
					border-radius: 5rpx;
					padding: 20rpx;
					box-sizing: border-box;
					margin: 20rpx 0;
					textarea{
						width: 100%;
						height: 300rpx;
					}
				}
				.send{
					text-align: right;
					.btn{
						border: none;
						color: #FFFFFF;
						background: #C70C15;
						font-size: 28rpx;
						width: 150rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						display: inline-block;
					}
				}
			}
		}
	}
}
.commentWrap{
	padding: 40rpx 30rpx 200rpx 30rpx;
	box-sizing: border-box;
}
.tui-cmt-title {
	font-size: 30rpx;
	font-weight: bold;
	position: relative;
	margin-left: 20rpx;
}
.tui-cmt-title::after {
	content: '';
	position: absolute;
	left: -18rpx;
	top: 18%;
	width: 6rpx;
	height: 64%;
	background: #C70C15;
}
.tui-cmtbox {
	padding-bottom: 20rpx;
}
.tui-cmt-cell {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding-top: 44rpx;
}
.tui-avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 32rpx;
	display: block;
	flex-shrink: 0;
}

.tui-cmt-detail {
	width: 100%;
	padding-left: 16rpx;
	box-sizing: border-box;
}

.tui-header-box {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	font-size: 30rpx;
}

.tui-cmt-nickname {
	color: #c70c15;
}

.tui-fabulous {
	color: #9a9a9a;
}

.tui-fabulous text {
	padding-right: 4rpx;
	font-size: 24rpx;
}

.tui-cmt-content {
	font-size: 32rpx;
	color: #333;
	text-align: justify;
	padding-top: 8rpx;
	word-break: break-all;
	word-wrap: break-word;
}

.tui-reply-box {
	border-radius: 8rpx;
	overflow: hidden;
	margin-top: 16rpx;
}

.tui-cell-last {
	display: flex;
	align-items: center;
	word-wrap: break-word;
	color: #C70C15;
}
.tui-flex-1 {
	flex: 1;
	width: 100%;
}

.tui-reply-nickname {
	font-size: 24rpx;
	color: #7a7a7a;
	padding-bottom: 8rpx;
}
.tui-footer {
	display: flex;
	align-items: center;
	font-size: 24rpx;
	margin-top: 16rpx;
	color: #9a9a9a;
}

.tui-primary {
	color: #C70C15 !important;
}

.tui-ml {
	margin-left: 16rpx;
}
</style>
