<template>
	<view class="wrapper" v-cloak>
		
		<div class="header">
			<div class="title">{{detail.title || ''}}</div>
			<div class="row">
				<div class="radius" @click="handlePersonalHome">
					<image v-if="detail.ThumbnailPath" :src="detail.ThumbnailPath"></image>
					<span v-else>{{detail.nikeName || ''}}</span>
				</div>
				<div class="rightInfo">					
					<div class="info">
						<p class="name">{{detail.UserName || ''}}</p>
						<p class="time">{{detail.ModifiedOn}}</p>
					</div>
					<div class="dept">
						{{detail.OwningBusinessUnit || ''}}
					</div>
				</div>
				<!-- <div class="fllow" :class="{'active':isFllow}" @click="handleFllow">
					<tui-icon name="plus" size="12" color="#fff" v-if="!isFllow"></tui-icon>&nbsp;&nbsp;关注
				</div> -->
			</div>
			<div class="detailContent">				
				<div class="desc">
					<span class="theme" v-if="detail.SubjectIdName">{{detail.SubjectIdName || ''}}</span>
					{{detail.Description}} 
				</div>
				<view class="imgTemplate">
					<!-- <div class="max_img">
						<image class="img" src="/static/images/news/banner_1.jpg" mode="widthFix"></image>
					</div>
					<div class="min_img">
						<image class="img" src="/static/images/news/banner_1.jpg" mode="widthFix"></image>
					</div> -->
					<view class="list_img">
						<view class="box" v-for="(row,idx) in detail.Listpic" :key="idx" @click.stop="handleOpenImg(detail,idx)">
							<image class="img" :src="pathUrl+row.Path.replace(/\\/g,'/')" mode="aspectFill"></image>
						</view>
						<view class="fake_item"></view>
						<view class="fake_item"></view>
					</view>
				</view>
			</div>
			
		</div>
		<div class="container">
			<!-- <div class="business">
				<div class="opreation">					
					<div class="like" @click="handleLike">
						<div class="like_icon" :class="{'active':detail.IsPraise}">
							<tui-icon v-if="!detail.IsPraise" name="agree" size="24" color="#d03a28"></tui-icon>
							<tui-icon v-if="detail.IsPraise" name="agree" size="24" color="#FFF"></tui-icon>
						</div>
						<p class="text">
							{{detail.IsPraise?'取消点赞':'点赞'}} {{detail.NumOfLike || ''}}
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
			</div> -->
		</div>
		<div class="commentWrap">
			<div class="tabContainer">
				<div class="tabs">
					<!-- <div class="tab" :class="{'active':currentTab==1}" :style="{'--left':leftTab1}" @click="handleTab(1)">
						<p class="tabName">
							点赞 <span class="num">{{detail.NumOfLike || 0}}</span>
						</p>
						<span class="xian" v-if="currentTab==1"></span>
					</div> -->
					<div class="tab" :class="{'active':currentTab==2}" :style="{'--left':leftTab2}" @click="handleTab(2)">
						<p class="tabName">
							评论 <span class="num">{{ commentTotal || 0}}</span>
						</p>
						<span class="xian" v-if="currentTab==2"></span>
					</div>
					<div class="tab" :class="{'active':currentTab==3}" :style="{'--left':leftTab3}">
						<p class="tabName">
							阅读 <span class="num">0</span>
						</p>
						<span class="xian" v-if="currentTab==3"></span>
					</div>
				</div>
			</div>
			<!-- <view class="tui-cmt-title">精彩评论（{{commentTotal || 0}}）</view> -->
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
									<tui-icon name="arrowright" :size="22" color="#d03a28"></tui-icon>
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
				<div class="likeIcon" @click="handleLike">
					<i class="iconfont icon-weizan" v-if="!detail.IsPraise" style="color:#a4a4a4;"></i>
					<i class="iconfont icon-yizan" v-if="detail.IsPraise" style="color: #d03a28;"></i>
					<span>
						{{detail.NumOfLike || '赞'}}
					</span>
				</div>
				<div class="moreIcon" @click.stop="hanldeMore(detail)">
					<i class="iconfont icon-gengduo" style="color:#a4a4a4;"></i>
				</div>
				<!-- <div class="collection">
					<p @click="handleCollection">
						<tui-icon name="star" size="20" v-if="!isCollect"></tui-icon>
						<tui-icon name="star-fill" color="#d03a28" size="20" v-if="isCollect"></tui-icon>
					</p>
				</div> -->
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
		<tui-actionsheet
		  :show="showActionSheet" 
		  :item-list="itemList" 
		  @click="handleItem" 
		  @cancel="closeActionSheet">
		</tui-actionsheet>
	</view>
</template>

<script>
	import {shareMixins,shareWechat} from '@/mixins/shareMixins.js';
	export default {
		mixins:[shareMixins,shareWechat],
		data() {
			return {
				pathUrl: 'http://182.92.221.64:10002',
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
				commentTotal:'',
				showActionSheet: false,
				itemList: [
					{
					text: "收藏",
					color: "#2B2B2B"
				},
				{
					text: "删除",
					color: "#d03a28"
				}],
				currentTab: 2,
				leftTab1: '',
				leftTab2: '',
				leftTab3: ''
			}
		},
		computed: {
			iconColor() {
				return this.isFabulous ? '#d03a28' : '#333'
			},
			itemIconColor() {
				return function(isFabulous) {
					return isFabulous ? '#d03a28' : '#9a9a9a'
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
		watch:{
			isCollect:{
				handler(newVal,oldVal){
					if(newVal){
						this.itemList[0].text = '取消收藏';
					}else {
						this.itemList[0].text = '收藏';
					}
				}
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
		mounted(){
			// this.$nextTick(()=>{	
			// 	const query = uni.createSelectorQuery().in(this)
			// 	query.select('.tab1').boundingClientRect()
			// 	query.exec((res)=>{
			// 		console.log(res)
			// 		if(res[0].width<44){
			// 			this.leftTab1 = '-'+ res[0].width / 2 + 'rpx';
			// 		}else {
			// 			this.leftTab1 = res[0].width / 2 + 'rpx';
			// 		}
			// 	})
			// 	query.select('.tab2').boundingClientRect()
			// 	query.exec((res)=>{
			// 		console.log(res)
			// 		if(res[1].width<44){
			// 			this.leftTab2 = '-'+ res[1].width / 2 + 'rpx';
			// 		}else {
			// 			this.leftTab2 = res[1].width / 2 + 'rpx';
			// 		}
			// 	})
			// 	query.select('.tab3').boundingClientRect()
			// 	query.exec((res)=>{
			// 		console.log(res)
			// 		if(res[2].width<44){
			// 			this.leftTab3 = '-'+ res[2].width / 2 + 'rpx';
			// 		}else {
			// 			this.leftTab3 = res[2].width / 2 + 'rpx';
			// 		}
			// 	})
			// })
		},
		methods: {
			handleTab(index){
				this.currentTab = index;
				if(this.currentTab == 2){
					this.getCommentList();
				}
			},
			handleItem(e){
				let index = e.index;
				switch(index){
					case 0:
						if(!this.isCollect){
							this.$http.getCircleCollection({
								ChatId: this.id,
								token: this.token
							}).then(res=>{
								if(res.returnValue!=''){
									this.isCollect = true;
									uni.showToast({
										title:'收藏成功!',
										icon:'success',
										duration:2000
									})
									setTimeout(()=>{
										this.getDetail();
									},1000)
								}
							})
						}else {
							this.$http.getCircleCancelCollection({
								ChatId: this.id,
								token: this.token
							}).then(res=>{
								if(res.returnValue!=''){
									uni.showToast({
										title:'取消收藏成功!',
										icon:'success',
										duration:2000
									})
									this.isCollect = false;
									setTimeout(()=>{
										this.getDetail();
									},1000)
								}
							})
						}
						this.showActionSheet = false;
						break;
					case 1:
						const callback = (res)=>{
							console.log(res);
							if(res){
								this.handleDelete();
							}
						}
						this.$tui.modal('','是否要删除该同志圈？',true,callback,'#d03a28')
						break;
				}
			},
			handleDelete(){
				this.$http.deleteCircle({
					token: this.token,
					ChatterId: this.id
				}).then(res=>{
					if(res.returnValue)
					this.showActionSheet = false;
					uni.navigateBack({
						delta:1
					})
				})
			},
			closeActionSheet(){
				this.showActionSheet = false
			},
			hanldeMore(item){
				this.id = item.ChatterId;
				this.isCollect = item.IsCollect;
				this.showActionSheet = true
			},
			getDetail(){
				this.$http.getCircleDetail({
					MomentsId: this.id,
					token: this.token
				}).then(res=>{
					this.detail = res.returnValue;
					this.detail.ModifiedOn = this.$tui.formData(this.detail.ModifiedOn);
					this.isCollect = this.detail.IsCollect;
					this.detail.nikeName = this.detail.UserName.length > 2 ? this.detail.UserName.slice(1) : this.detail.UserName;
				})
			},
			handleOpenImg(item,idx){
				let imgs = [];
				item.Listpic.forEach(item=>{
					imgs.push(this.pathUrl + item.Path.replace(/\\/g,'/'));
				})
				wx.previewImage({
				  current: imgs[idx], // 当前显示图片的http链接
				  urls: imgs // 需要预览的图片http链接列表
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
					Pagesize: this.page.pageSize,
					token: this.token
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
					this.$tui.modal('','确定不再关注啤酒泡沫？',true,callback,'#d03a28')
				}else {
					this.isFllow = !this.isFllow;
				}
			}, 
			handleShare(){
				const callback = function(res){
					console.log(123123)
				}
				this.$tui.modal('','抱歉，苹果不支持分享到朋友圈',false,callback,'#d03a28');
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
				if(!item.IsPraise){
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
				this.getDetail();
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
	@font-face {
	  font-family: "iconfont"; /* Project id 3665209 */
	  src: url('//at.alicdn.com/t/c/font_3665209_j67d1bwpzu9.woff2?t=1663901575608') format('woff2'),
		   url('//at.alicdn.com/t/c/font_3665209_j67d1bwpzu9.woff?t=1663901575608') format('woff'),
		   url('//at.alicdn.com/t/c/font_3665209_j67d1bwpzu9.ttf?t=1663901575608') format('truetype');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-weizan:before {
	  content: "\e7e2";
	}
	
	.icon-yizan:before {
	  content: "\e7e3";
	}
	
	.icon-pinglun:before {
	  content: "\e7e4";
	}
	
	.icon-gengduo:before {
	  content: "\e7e5";
	}
	
	.icon-a-shoucang:before {
	  content: "\e7e6";
	}
	page{
		// background: #FFFFFF;
	}
.wrapper{
	.header{
		padding: 30rpx;
		background: #FFFFFF;
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
			.rightInfo{
				flex: 1;
				display: flex;
				justify-content: space-between;
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
				.dept{
					color: #999999;
					font-size: 20rpx;
					max-width: 320rpx;
				}
			}
			
			.fllow{
				font-size: 28rpx;
				color: #FFFFFF;
				background: #d03a28;
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
		.detailContent{
			padding-left: 75rpx;
			.desc{
				font-size: 30rpx;
				color: #333333;
				line-height: 1.5;
				.theme{
					font-size: 30rpx;
					color: #d93731;
					padding-right: 10rpx;
				}
			}
			.imgTemplate{
				margin-top: 30rpx;
				.max_img{
					width: 100%;
					max-height: 380rpx;
					background: #d4d4d4;
					border-radius: 8rpx;
					margin-bottom: 10rpx;
					.img{
						width: 100%;
						height: 100%;
						vertical-align: top;
						border-radius: 8rpx;
					}
				}
				.min_img{
					width: 460rpx;
					max-height: 274rpx;
					background: #d4d4d4;
					border-radius: 8rpx;
					margin-bottom: 10rpx;
					.img{
						width: 100%;
						height: 100%;
						vertical-align: top;
						border-radius: 8rpx;
					}
				}
				.list_img{
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					.box{
						width: 193rpx;
						height: 180rpx;
						border-radius: 8rpx;
						background: #d4d4d4;
						margin-bottom: 10rpx;
						.img{
							width: 100%;
							height: 100% !important;
							vertical-align: top;
							border-radius: 7rpx;
						}
					}
					.box.active{
						position: relative;
						.mask{
							position: absolute;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							display: flex;
							justify-content: center;
							align-items: center;
							background: rgba(0,0,0,.5);
							font-size: 100rpx;
							border-radius: 8rpx;
							color: #FFFFFF;
						}
					}
					.fake_item{
						flex: 0 0 222rpx;
						height: 0;
					}
				}
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
					border: 1rpx solid #d03a28;
					margin: 0rpx auto;
				}
				.like_icon.active{
					border: 1rpx solid transparent;
					background: #d03a28;
				}
				.text{
					font-size: 24rpx;
					color: #333333;
					line-height: 2;
				}
				.text.active{
					color: #d03a28;
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
				border-radius: 13rpx;
				background: #f4f4f5;
				color: #999999;
				font-size: 29rpx;
				padding-left: 29rpx;
				line-height: 72rpx;
				height: 72rpx;
			}
			.iconfont{
				display: inline-block;
				font-size: 37rpx;
			}
			.likeIcon{
				margin-left: 33rpx;
				span{
					color: #777777;
					font-size: 24rpx;
					padding-left: 10rpx;
				}
			}
			.moreIcon{
				margin-left: 29rpx;
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
					color: #d03a28;
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
						background: #d03a28;
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
	// padding: 34rpx 31rpx 200rpx 31rpx;
	box-sizing: border-box;
	background: #fff;
	margin-top: 16rpx;
	.tabContainer{
		.tabs{
			display: flex;
			border-bottom: 1rpx solid #e2e3e5;
			padding: 0 31rpx;
			box-sizing: border-box;
			.tab{
				font-size: 30rpx;
				color: #7b8187;
				padding-top: 24rpx;
				// border-bottom: 6rpx solid transparent;
				font-size: 30rpx;
				margin-right: 34rpx;
				position: relative;
				text-align: center;
				.tabName{
					padding-bottom: 30rpx;
				}
				span.num{
					padding-left: 10rpx;
				}
				.xian{
					display: block;
					width: 88rpx;
					height: 6rpx;
					background: #d93731;
					border-radius: 3rpx;
					margin: 0 auto;
				}
			}
			.tab.active{
				color: #d93731;
				// border-bottom: 6rpx solid #d93731;
				font-weight: bold;
			}
			// .tab.active::after{
			// 	content: '';
			// 	display: block;
			// 	position: absolute;
			// 	bottom: 0;
			// 	width: 88rpx;
			// 	height: 6rpx;
			// 	background: #d93731;
			// 	border-radius: 3rpx;
			// 	left: var(--left);
			// }
			.tab:last-child{
				margin-left: auto;
				margin-right:0;
			}
		}
	}
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
	background: #d03a28;
}
.tui-cmtbox {
	// padding-bottom: 20rpx;
}
.tui-cmt-cell {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	// padding: 24rpx 32rpx;
	box-sizing: border-box;
}
.tui-cmt-cell:last-child .tui-cmt-detail{
	border-bottom: none;
}
.tui-avatar {
	width: 56rpx;
	height: 56rpx;
	border-radius: 32rpx;
	display: block;
	flex-shrink: 0;
	margin-top: 24rpx;
	margin-left: 32rpx;
}

.tui-cmt-detail {
	width: 100%;
	margin-left: 52rpx;
	box-sizing: border-box;
	border-bottom: 1rpx solid #e2e3e5;
	padding: 34rpx 33rpx 19rpx 0;
}

.tui-header-box {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	font-size: 30rpx;
}

.tui-cmt-nickname {
	color: #606f95;
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
	padding-bottom: 39rpx;
	padding-top: 29rpx;
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
	color: #d03a28;
}
.tui-flex-1 {
	flex: 1;
	width: 100%;
}

.tui-reply-nickname {
	font-size: 28rpx;
	color: #7a7a7a;
	padding-bottom: 8rpx;
}
.tui-footer {
	display: flex;
	align-items: center;
	font-size: 24rpx;
	margin-top: 16rpx;
	color: #999999;
}

.tui-primary {
	color: #d03a28 !important;
}

.tui-ml {
	margin-left: 16rpx;
}
</style>
