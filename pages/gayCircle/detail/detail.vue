<template>
	<view class="wrapper" v-cloak>
		<div class="header">
			<div class="title">{{detail.title || ''}}</div>
			<div class="row">
				<div class="radius" @click="handlePersonalHome">
					<image :src="detail.ThumbnailPath"></image>
				</div>
				<div class="info">
					<p class="name">{{detail.UserName || ''}}</p>
					<p class="time">{{detail.ModifiedOn}}</p>
				</div>
				<div class="fllow" :class="{'active':isFllow}" @click="handleFllow">
					<tui-icon name="plus" size="12" color="#fff" v-if="!isFllow"></tui-icon>&nbsp;&nbsp;关注
				</div>
			</div>
		</div>
		<div class="container">
			<div class="desc">
				{{detail.Description}} 
			</div>
			<div class="business">
				<div class="opreation">					
					<div class="like" @click="handleLike">
						<div class="like_icon" :class="{'active':detail.IsPraise}">
							<tui-icon v-if="!detail.IsPraise" name="agree" size="24" color="#d24941"></tui-icon>
							<tui-icon v-if="detail.IsPraise" name="agree" size="24" color="#FFF"></tui-icon>
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
				阅读 {{detail.NumOfForward||0}}
			</div>
		</div>
		<div class="commentWrap">
			<view class="tui-cmt-title">精彩评论（{{commentTotal || 0}}）</view>
			<view class="tui-cmtbox">
				<view class="tui-cmt-cell" v-for="(item, index) in cmtList" :key="index">
					<image :src="item.ThumbnailPath" class="tui-avatar"></image>
					<view class="tui-cmt-detail">
						<view class="tui-header-box">
							<view class="tui-cmt-nickname">{{ item.UserName }}</view>
							<view class="tui-fabulous" :class="[item.IsPraise ? 'tui-primary' : '']" :id="index" @tap="cmtFabulous(item)">
								<text>{{ item.LikeQty == 0 ? '赞' : item.LikeQty }}</text>
								<tui-icon :name="iconName(item.IsPraise)" :size="15" :color="itemIconColor(item.IsPraise)"></tui-icon>
							</view>
						</view>
						<view class="tui-cmt-content">{{ item.Comment }}</view>
						<view class="tui-reply-box" v-if="item.ChatterCommentBases">
							<tui-list-cell
								backgroundColor="#f2f2f2"
								:size="28"
								v-for="(items, index2) in item.ChatterCommentBases"
								:key="index2"
								:unlined="item.ReplayNum < 2 && item.ChatterCommentBases.length - 1 == index"
								@tap="cmtReply(items)"
							>
								<view class="tui-flex-1 tui-reply-nickname">{{ items.UserName }}</view>
								<view class="tui-flex-1">{{ items.Comment }}</view>
							</tui-list-cell>
							<tui-list-cell padding="20rpx 30rpx" backgroundColor="#f2f2f2" :size="28" :unlined="true" v-if="item.ReplayNum > 2" @tap="cmtReply">
								<view class="tui-flex-1  tui-cell-last">
									<text>共{{ item.ReplayNum }}条回复</text>
									<tui-icon name="arrowright" :size="22" color="#d24941"></tui-icon>
								</view>
							</tui-list-cell>
						</view>
						<view class="tui-footer">
							{{ item.ModifiedOn }}
							<view class="tui-primary tui-ml" hover-class="opcity" :hover-start-time="150" @tap="cmtReply(item)">回复</view>
						</view>
					</view>
				</view>
			</view>
		</div>
		<div class="footer">
			<div class="comment" :class="{'active':isPhoneX}">
				<div class="inp" @click="handleComment">
					我来说两句
				</div>
				<div class="collection">
					<p @click="handleCollection">
						<tui-icon name="star" size="20" v-if="!isCollect"></tui-icon>
						<tui-icon name="star-fill" color="#d24941" size="20" v-if="isCollect"></tui-icon>
					</p>
					<!-- <p class="num" :class="{'active':isCollect}">{{detail.numOfForward}}</p> -->
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
				isCollect:false, // 是否收藏
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
				isLike:false,
				id:'',
				detail:{},
				page:{
					isPage: false,
					pageNum: 1,
					pageSize: 10
				},
				commentTotal:''
			}
		},
		computed: {
			iconColor() {
				return this.isFabulous ? '#d24941' : '#333'
			},
			itemIconColor() {
				return function(isFabulous) {
					return isFabulous ? '#d24941' : '#9a9a9a'
				}
			},
			iconName() {
				return function(isFabulous) {
					return isFabulous ? 'agree-fill' : 'agree'
				}
			},
			token(){
				return uni.getStorageSync('wechatAuthToken')
			}
		},
		onShow(){
			wx.onKeyboardHeightChange(res => { //监听键盘高度变化
				console.log(res.height,'res');
				this.keyboardHeight = res.height;
			})
			this.getCommentList();
		},
		onLoad(options){
			this.id = options.id;
			this.getDetail();
			
		},
		methods: {
			getDetail(){
				this.$http.getCircleDetail({
					MomentsId: this.id
				}).then(res=>{
					this.detail = res.returnValue;
					this.detail.ModifiedOn = this.$tui.formData(this.detail.ModifiedOn);
					this.isCollect = this.detail.IsCollect;
				})
			},
			handleCollection(){
				if(!this.isCollect){
					this.$http.getCircleCollection({
						ChatId: this.id,
						token: this.token
					}).then(res=>{
						if(res.returnValue!=''){
							this.isCollect = true;
						}
					})
				}else {
					this.$http.getCircleCancelCollection({
						ChatId: this.id,
						token: this.token
					}).then(res=>{
						if(res.returnValue!=''){
							this.isCollect = false;
						}
					})
				}
			},
			// 评论列表
			getCommentList(){
				this.$http.getCircleCommentList({
					ChatterId:this.id,
					Pagenum: this.page.pageNum,
					Pagesize: this.page.pageSize
				}).then(res=>{
					this.cmtList = res.returnValue.ChatterCommentBaseList;
					this.cmtList.map(item=>{
						item.ModifiedOn = this.$tui.formData(item.ModifiedOn);
					})
					this.commentTotal = res.returnValue.Total;
				})
			},
			handleComment(){
				uni.navigateTo({
					url:'../sendComment/sendComment?id='+this.id
				})
			},
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
					this.$tui.modal('','确定不再关注啤酒泡沫？',true,callback,'#d24941')
				}else {
					this.isFllow = !this.isFllow;
				}
			}, 
			handleShare(){
				const callback = function(res){
					console.log(123123)
				}
				this.$tui.modal('','抱歉，苹果不支持分享到朋友圈',false,callback,'#d24941');
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
			// 评论点赞
			cmtFabulous: function(item) {
				if(!item.isPraise){
					this.$http.setCircleCmtLike({
						token: this.token,
						ChatCommentId: item.CommentId
					}).then(res=>{
						item.IsPraise = true
						item.LikeQty = item.LikeQty+1
					})
				}else {
					this.$http.delCircleCmtLike({
						token: this.token,
						ChatCommentId: item.CommentId
					}).then(res=>{
						item.IsPraise = false
						item.LikeQty = item.LikeQty-1
					})
				}
			},
			collection: function() {
				this.isCollection = !this.isCollection
				if (this.isCollection) {
					this.tui.toast("收藏成功！");
				}
			},
			cmtReply: function(item) {
				uni.navigateTo({
					url: '../reply/reply?id='+this.id+'&commentId='+item.CommentId+'&userName='+item.UserName+'&comment='+item.Comment+'&time='+item.ModifiedOn
				})
			},
			handleLike(){
				if(!this.detail.IsPraise){
					this.$http.setLikeGayCircle({
						Token: this.token,
						ChatterId: this.id
					}).then(res=>{
						console.log('点赞',res)
						this.detail.IsPraise = true;
					})
				}else {
					this.$http.cancelLikeGayCircle({
						Token: this.token,
						ChatterId: this.id
					}).then(res=>{
						console.log('取消点赞',res)
						this.detail.IsPraise = false;
					})
				}
			},
			handlePersonalHome(){
				uni.navigateTo({
					url:'../PersonalHome/PersonalHome?createdBy='+this.detail.CreatedBy
				})
			}
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			this.loadding = true
			if(this.page.isPage){
				this.page.pageNum++;
				this.getCommentList();
			}
			this.loadding = false;
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
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
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
				background: #d24941;
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
					border: 1rpx solid #d24941;
					margin: 0rpx auto;
				}
				.like_icon.active{
					border: 1rpx solid transparent;
					background: #d24941;
				}
				.text{
					font-size: 24rpx;
					color: #333333;
					line-height: 2;
				}
				.text.active{
					color: #d24941;
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
					color: #d24941;
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
						background: #d24941;
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
	background: #d24941;
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
	color: #d24941;
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
	color: #d24941;
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
	color: #d24941 !important;
}

.tui-ml {
	margin-left: 16rpx;
}
</style>
