<template>
	<div class="wrapper">
		<view class="container">
			<view class="tui-news-title">{{detail.Title || ''}}</view>
			<!-- <view class="tui-sub-info">
				<view class="tui-sub-left">
					<text class="tui-author">早安君</text>
					<text>{{ timeStr }}</text>
				</view>
				<view class="tui-sub-right">阅读 {{detail.ReadCount || ''}}</view>
			</view> -->
			<div class="headRow">
				<div class="radius">
					<image v-if="detail.ThumbnailPath" :src="detail.ThumbnailPath"></image>
					<span v-else>{{detail.nikeName || ''}}</span>
				</div>
				<div class="rightInfo">					
					<div class="info">
						<p class="name">{{detail.CreatedByName || ''}}</p>
						<!-- <p class="time">{{detail.ModifiedOn}}</p> -->
					</div>
					<div class="dept">
						{{detail.BusinessUnitIdName || ''}}
						<span>{{detail.ModifiedOn}}</span>
					</div>
				</div>
			</div>
			<view class="tui-news-content">
				<rich-text :nodes="detail.ContentBody"></rich-text>
				<!-- <view class="tui-article">北京时间6月22日，重庆斯威队召开了赛前新闻发布会，主教练小克鲁伊夫和球员彭欣力出席。</view>
				<view class="tui-article">
					这是一场很重要的比赛，武汉卓尔在中超目前打的还是不错的，现在积分与我们一样。我们面对这个对手做了充分的准备，他们的战术变化很多，我也认为他们是一支训练有素的队伍。虽然这是一场艰难的比赛，我们也充满了动力去拿到我们想要的分数，实现我们的目标。联赛上半程还有两场比赛，我们也会竭尽全力拿到尽量多的分数。
				</view>
				<image src="/static/images/news/banner_2.jpg" class="tui-article-pic" mode="widthFix"></image>
				<view class="tui-article">大家下午好，明天非常重要，这星期我们的备战时间比较充裕，我们针对对手做了有效的布置，希望明天给大家呈现精彩的比赛。</view>
				<view class="tui-article">
					我相信大家比我更了解他，但是就像刚刚提到的一样，这支球队的战术是丰富而多变的，这就意味着他在应对不同比赛时做了充分的准备。我们非常尊重明天的对手，他们最近状态出色，拿到许多分数。
				</view>
				<image src="/static/images/news/banner_1.jpg" class="tui-article-pic" mode="widthFix"></image>
				<view class="tui-article">
					对我而言，我还是想保持沉默，我不打算就这个问题做过多的评论。因为这个政策的变化是马上实施了，我们肯定是尊重它，然后在我们力所能及的范围上找到最好的应对的方案，我个人意见并不重要，我们尊重和遵守相关决定。
				</view> -->
			</view>

			<!-- <view class="tui-news-source">消息参考来源：{{detail.KeyWords || ''}}</view> -->
			<div class="tagPanel filesPanel">
				<div class="label">附件</div>
				<div class="files">
					<div class="fileItem" v-for="(item,index) in files" :key="index" @click="handleOpenFile(item)">
						<i class="iconfont icon-fujian2"></i>
						<span class="fileName">
							{{item.Name || ''}}.{{item.FileExtension || ''}}
						</span>
					</div>
				</div>
			</div>
			<div class="tagPanel">
				<div class="label">标签</div>
				<div class="tabList">
					<div class="tagBtn" v-for="item in detail.KeyWords && detail.KeyWords.split(',')">
						{{item}}
					</div>
				</div>
			</div>
			
			<div class="operateBox">
				<div class="tag" @click="btnFabulous()">
					<i class="iconfont icon-weizan" style="color:#999;" v-if="!isFabulous"></i>
					<i class="iconfont icon-yizan" style="color:#d03a28;" v-if="isFabulous"></i>
					{{!isFabulous && fabulous==0 || fabulous == '' ?'点赞':fabulous}}
				</div>
			</div>
			<!-- <view class="tui-operate-box">
				<tui-tag padding="26rpx 56rpx" :type="isFabulous ? 'primary' : 'gray'" shape="circle" :plain="true" @click="btnFabulous()">
					<tui-icon :name="iconName(isFabulous)" :size="20" :color="iconColor"></tui-icon>
					<text class="tui-black" :class="[isFabulous ? 'tui-primary' : '']">{{ fabulous }}赞</text>
				</tui-tag>
				<button open-type="share" class="tui-share-btn" @tap="btnShare">
					<tui-tag padding="26rpx 60rpx" type="gray" shape="circle" :plain="true">
						<tui-icon name="partake" :size="20" color="#333"></tui-icon>
						<text class="tui-black">分享</text>
					</tui-tag>
				</button>
			</view> -->
		</view>
		<div class="splitBg"></div>
		<div class="">
			<div class="commentWrap">
				<div class="tabContainer">
					<div class="tabs">
						<div class="tab" :class="{'active':currentTab==1}" :style="{'--left':leftTab1}" @click="handleTab(1)">
							<p class="tabName">
								评论 <span class="num">{{commentTotal || 0}}</span>
							</p>
							<span class="xian" v-if="currentTab==1"></span>
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
		</div>
		<div class="container">
			<view class="tui-operation">
				<view class="tui-operation-left tui-col-7"><view class="tui-btn-comment" @tap="btnCmt">发表你的评论...</view></view>
				<view class="tui-operation-right tui-right-flex tui-col-5">
					<view class="operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="cmtAll">
						<view class="pinglun">
							<i class="iconfont icon-pinglun1" style="color:#a4a4a4;"></i>
							<span class="badge">{{ total || 0 }}</span>
						</view>
						<!-- <tui-icon name="message" :size="30" color="#444"></tui-icon> -->
						<!-- <tui-badge absolute type="white_primary" :scaleRatio="0.7">{{ total || 0 }}</tui-badge> -->
					</view>
					<view class="operation-item" @tap="collection">
						<i class="iconfont icon-shoucang1" style="color:#d03a28;" v-if="isCollection"></i>
						<i class="iconfont icon-shoucang" style="color:#a4a4a4;" v-else></i>
						<!-- <tui-icon :name="isCollection ? 'star-fill' : 'star'" :size="29" :color="isCollection ? '#d03a28' : '#444'"></tui-icon> -->
					</view>
					<view class="operation-item" @click="btnFabulous()">
						<i class="iconfont icon-weizan" style="color:#999;" v-if="!isFabulous"></i>
						<i class="iconfont icon-yizan" style="color:#d03a28;" v-if="isFabulous"></i>
						<span>
							{{!isFabulous && fabulous==0 || fabulous == '' ?'点赞':fabulous}}
						</span>
					</view>
					<view class="operation-item" @click="handleMore">
						<i class="iconfont icon-gengduo" style="color:#a4a4a4;"></i>
						<!-- <tui-icon :name="isCollection ? 'star-fill' : 'star'" :size="29" :color="isCollection ? '#d03a28' : '#444'"></tui-icon> -->
					</view>
					<!-- <view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="btnShare">
						<button open-type="share" class="tui-share-btn"><tui-icon name="share" :size="31" color="#444"></tui-icon></button>
					</view> -->
				</view>
			</view>
		</div>
		<!-- <tui-actionsheet
		  :show="showActionSheet" 
		  :item-list="itemList" 
		  @click="handleItem" 
		  @cancel="closeActionSheet">
		</tui-actionsheet> -->
		<van-action-sheet :show="showActionSheet" z-index="999999" @close="closeActionSheet">
			<div class="sheetList">
				<div class="sheetItem">
					<button open-type="share">分享</button>
				</div>
				<div class="sheetItem del" @click="handleDelNews">
					<button>删除</button>
				</div>
				<div class="sheetItem cancel" @click="closeActionSheet">
					<button>取消</button>
				</div>
			</div>
		</van-action-sheet>
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore v-if="!pullUpOn" backgroundColor="#fff" text="没有更多评论"></tui-nomore>
		<!--加载loadding-->
		<view class="tui-safearea-bottom"></view>
	</div>
</template>

<script>
import getOpenFiles from '@/utils/openFiles';
export default {
	data() {
		return {
			fabulous: 0, // 点赞数量
			isFabulous: false, // 是否点赞
			isCollection: false, // 是否收藏
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
			id:'',
			detail:{},
			commentPage:{
				isPage: false,
				pageNum: 1,
				pageSize: 10
			},
			total:'',
			currentTab: 1,
			commentTotal: 0,
			showActionSheet: false,
			files: [],
			pathUrl: 'http://182.92.221.64:10002'
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
			return uni.getStorageSync('wechatAuthToken');
		},
		timeStr(){
			return this.detail.modifiedOn ? this.formDateStr(this.detail.modifiedOn) : ''
		},
		openImgs(){
			let temp = [];
			this.files.forEach(item=>{
				if(item.FileExtension.indexOf('jpg')!=-1||item.FileExtension.indexOf('png')!=-1||item.FileExtension.indexOf('webp')!=-1){
					temp.push(this.pathUrl + item.DownloadLinkUrl);
				}
			})
			return temp;
		}
	},
	onLoad(options) {
		console.log(options,'options')
		this.id = options.id;
		this.typeId = options.typeId;
		if(this.typeId==''){
			this.setNot();
		}
		this.getDetail();
		this.getCmtsList(); 
	},
	onShow(){
		const curren = getCurrentPages();
		console.log(curren,'====')
		this.getCmtsList();
		this.getFiles();
	},
	methods: {
		setNot(){
			this.$httpWX({
				url:'/NewsContent/Content/Read',
				method: 'get',
				data:{
					Token: this.token,
					contentId: this.id
				}
			}).then(res=>{
				console.log(res);
			})
		},
		handleOpenFile(item){
			item.link = this.pathUrl + item.DownloadLinkUrl;
			item.fileExtension = item.FileExtension;
			let openImgs = JSON.stringify(this.openImgs);
			getOpenFiles(item,openImgs);
		},
		getFiles(){
			this.$httpWX({
				url: '/NewsContent/file/get',
				method: 'get',
				data:{
					id: this.id
				}
			}).then(res=>{
				console.log(res);
				this.files = res.returnValue.listData;
			})
		},
		handleDelNews(){
			var that = this;
			const callback = function(e){
				console.log(e);
				if(e){
					that.deleteNews();
				}
			}
			this.$tui.modal('','是否确定删除该新闻！',false,callback,'#C70C15','确定')
		},
		deleteNews(){
			this.$httpWX({
				url: '/entity/delete',
				method: 'delete',
				data: {
					objectTypeCode: 100201,
					id: this.id
				}
			}).then(res=>{
				uni.navigateBack({
					delta: 1
				})
			})
		},
		handleMore(){
			this.showActionSheet = true;
		},
		closeActionSheet(){
			this.showActionSheet = false;
		},
		// 详情
		getDetail(){
			this.$http.getNewsDetail({
				Token:this.token,
				NewsId:this.id
			}).then(res=>{
				this.detail = res.returnValue;
				this.detail.nikeName = this.detail.CreatedByName && this.detail.CreatedByName.length > 2 ? this.detail.CreatedByName.slice(1) : this.detail.CreatedByName;
				this.fabulous = this.detail.LikeCount;
				this.isFabulous = this.detail.IsPraise;
				this.isCollection = this.detail.IsCollect;
			})
		},
		// 评论列表
		getCmtsList(){
			this.$http.getCmtsList({
				Token:this.token,
				NewsId: this.id,
				Pagesize: this.commentPage.pageSize,
				Pagenum: this.commentPage.pageNum
			}).then(res=>{
				console.log(res);
				let total = res.returnValue.Total;
				this.total = total;
				this.commentTotal = total; 
				if(this.commentPage.pageNum*this.commentPage.pageSize<total){
					this.commentPage.isPage = true;
				}else {
					this.commentPage.isPage = false;
				}
				let temp = [];
				if(this.commentPage.pageNum==1){
					temp = res.returnValue.CommentsList;
				}else {
					temp = this.cmtList.concat(res.returnValue.CommentsList);
				}
				this.cmtList = temp;
				if(this.cmtList){					
					this.cmtList.map(item=>{
						item.time = this.$tui.formData(item.ModifiedOn);
						return item;
					})
				}
			})
		},
		formDateStr(time){
			let str = time.replace(/T/g,' ')
			return str;
		},
		btnFabulous: function() {
			// this.fabulous = this.isFabulous ? 123 : 124;
			// this.isFabulous = !this.isFabulous
			if(this.isFabulous){
				this.$http.delNewsLike({
					Token:this.token,
					NewsId:this.id
				}).then(res=>{
					console.log(res);
					this.getDetail();
				})
			}else {				
				this.$http.getNewsLike({
					Token:this.token,
					NewsId:this.id
				}).then(res=>{
					console.log(res);
					this.getDetail();
				})
			}
		},
		cmtFabulous: function(item) {
			// let index = e.currentTarget.id;
			// let fabulousObj = this.cmtList[index];
			// let isFabulous = this.cmtList[index].isFabulous;
			// let fabulous = this.cmtList[index].fabulous;
			// let fabulousNum = isFabulous ? fabulous - 1 : fabulous + 1;
			// this.$set(fabulousObj, "fabulous", fabulousNum);
			// this.$set(fabulousObj, "isFabulous", !isFabulous);
			if(!item.IsPraise){
				this.$http.commentLike({
					Token: this.token,
					NewsCommentId: item.CommentId
				}).then(res=>{
					item.IsPraise = true
					item.LikeQty = item.LikeQty+1
				})
			}else {
				this.$http.commentCancelLike({
					Token: this.token,
					NewsCommentId: item.CommentId
				}).then(res=>{
					item.IsPraise = false
					item.LikeQty = item.LikeQty-1
				})
			}
		},
		collection: function() {
			// this.isCollection = !this.isCollection
			// if (this.isCollection) {
			// 	this.tui.toast("收藏成功！");
			// }
			if(!this.isCollection){				
				this.$http.setNewsCollection({
					Token: this.token,
					NewsId: this.id
				}).then(res=>{
					console.log(res);
					this.getDetail()
				})
			}else{
				this.cancelCollection();
			}
		},
		// 取消收藏
		cancelCollection(){
			this.$http.delNewsCollection({
				Token: this.token,
				NewsId: this.id
			}).then(res=>{
				console.log(res);
				this.getDetail()
			})
		},
		btnCmt: function() {
			uni.navigateTo({
				url: '/pages/news/sendComment/sendComment?NewsId='+this.id
			})
		},
		cmtAll: function() {
			uni.navigateTo({
				url: '../commentList/commentList'
			})
		},
		cmtReply: function() {
			uni.navigateTo({
				url: '/pages/news/reply/reply'
			})
		},
		btnShare(){
			// #ifdef H5
			location.href = 'https://www.thorui.cn/';
			// #endif

			//#ifdef APP-PLUS
			plus.share.sendWithSystem(
				{
					content: 'ThorUI组件库',
					href: 'https://www.thorui.cn/'
				},
				function() {
					console.log('分享成功');
				},
				function(e) {
					console.log('分享失败：' + JSON.stringify(e));
				}
			);
			//#endif
		}
	},
	// 页面上拉触底事件的处理函数
	onReachBottom: function() {
		// if (!this.pullUpOn) return;
		this.loadding = true
		if(this.commentPage.isPage){
			this.commentPage.pageNum++;
			this.getCmtsList();
		}
		this.loadding = false;
		// if (this.pageIndex == 3) {
		// 	this.loadding = false;
		// 	this.pullUpOn = false
		// } else {
		// 	let arr = JSON.parse(JSON.stringify(this.cmtList));
		// 	this.cmtList = this.cmtList.concat(arr);
		// 	this.pageIndex = this.pageIndex + 1;
		// 	this.loadding = false
		// }
	}
}
</script>

<style lang="scss">
page {
	background: #fff;
	color: #333;
}

.container {
	padding: 40rpx 30rpx 110rpx 30rpx;
	box-sizing: border-box;
}

.tui-news-title {
	font-size: 48rpx;
	font-weight: bold;
	text-align: justify;
}

.tui-sub-info {
	padding-top: 30rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 28rpx;
	color: #999;
}

.tui-author {
	color: #d03a28;
	padding-right: 20rpx;
}

.tui-news-content {
	padding-top: 40rpx;
	padding-bottom: 40rpx;
	border-bottom: 1rpx solid #e2e3e5;
}

.tagPanel{
	padding: 33rpx 0;
	border-bottom: 1rpx solid #e2e3e5;
	.label{
		font-size: 32rpx;
		color: #333333;
	}
	.tabList{
		padding-top: 32rpx;
		.tagBtn{
			display: inline-block;
			border-radius: 9rpx;
			background: #f5f5f5;
			font-size: 24rpx;
			color: #666666;
			padding: 17rpx 22rpx;
			margin-right: 27rpx;
		}
	}
}
.filesPanel{
	.files{
		.fileItem{
			display: inline-block;
			background: #f5f5f5;
			height: 76rpx;
			line-height: 76rpx;
			border-radius: 9rpx;
			display: flex;
			align-items: center;
			padding: 0 20rpx;
			margin: 32rpx 0;
			.iconfont{
				color: #ff6666;
				font-size: 25rpx;
			}
			.fileName{
				display: inline-block;
				flex: 1;
				margin-left: 12rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				color: #333333;
				font-size: 28rpx;
			}
		}
	}
}
.tui-article {
	/* text-indent: 2em; */
	font-size: 34rpx;
	padding-bottom: 40rpx;
	line-height: 60rpx;
	text-align: justify;
	word-break: break-all;
	word-wrap: break-word;
}

.tui-article-pic {
	width: 100%;
	display: block;
	margin-bottom: 40rpx;
}

.tui-news-source {
	font-size: 24rpx;
	color: #999;
}

// .tui-operate-box {
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between;
// 	padding: 60rpx 40rpx;
// 	box-sizing: border-box;
// }
.operateBox{
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 60rpx 40rpx;
	box-sizing: border-box;
	.tag{
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 36rpx;
		border: 1rpx solid #bbbbbb;
		font-size: 24rpx;
		color: #333333;
		width: 242rpx;
		height: 72rpx;
		line-height: 72rpx;
		.iconfont{
			display: inline-block;
			padding-right: 10rpx;
		}
	}
}
.splitBg{
	height: 16rpx;
	background: #f7f7f7;
}
.tui-black {
	color: #333;
	padding-left: 12rpx;
}

.tui-cmt-title {
	font-size: 30rpx;
	font-weight: bold;
	position: relative;
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
	color: #d03a28 !important;
}

.tui-ml {
	margin-left: 16rpx;
}

.tui-operation {
	width: 100%;
	height: 100rpx;
	overflow: hidden;
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 99999;
	padding-bottom: env(safe-area-inset-bottom);
}

.tui-safearea-bottom {
	width: 100%;
	height: env(safe-area-inset-bottom);
}

.tui-operation::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	border-top: 1rpx solid #eaeef1;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
}

.tui-operation-left {
	display: flex;
	align-items: center;
}

.tui-operation-item {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	position: relative;
}
.operation-item{
	display: flex;
	align-items: center;
	.iconfont{
		font-size: 40rpx;
		display: inline-block;
	}
	.pinglun{
		position: relative;
		.badge{
			position: absolute;
			display: inline-block;
			padding: 0 12rpx;
			height: 29rpx;
			border-radius: 15rpx;
			background: #ff6666;
			color: #fff;
			font-size: 21rpx;
			font-weight: bold;
			top: -8rpx;
			right: -16rpx;
		}
	}
	span{
		padding-left: 10rpx;
	}
}

.tui-operation-right {
	height: 100rpx;
	box-sizing: border-box;
	padding-top: 0;
}

.tui-right-flex {
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.tui-btn-comment {
	height: 67rpx;
	line-height: 67rpx;
	width: 306rpx;
	background: #f3f5f4;
	border: 1rpx solid #e7e7e7;
	color: #333333;
	border-radius: 33rpx;
	font-size: 28rpx;
	display: flex;
	align-items: center;
	padding-left: 21rpx;
	box-sizing: border-box;
	padding-top: 0;
	margin-left: 30rpx;
}

.tui-col-7 {
	width: 306rpx;
}

.tui-col-5 {
	flex: 1;
	// width: 41.66666667%;
}

.tui-share-btn {
	display: block;
	background: none;
	margin: 0;
	padding: 0;
}
.tui-badge{
	color: #d03a28 !important;
}
.headRow{
	display: flex;
	align-items: center;
	margin: 20rpx 0;
	.radius{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background: #d93731;
		image{
			width: 100%;
			height: 100%;
			border-radius: 50%;
		}
	}
	.rightInfo{
		flex: 1;
		// display: flex;
		// justify-content: space-between;
		margin-left: 13rpx;
		.info{
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
		}
	}
}
.sheetList{
	background: #eceded;
	.sheetItem{
		text-align: center;
		border-bottom: 1rpx solid #E2E3E5;
		button{
			height: 112rpx;
			line-height: 112rpx;
			background: #fff !important;
			font-size: 34rpx;
		}
	}
	.sheetItem.del{
		button{
			color: #d93731;
		}
	}
	.sheetItem.cancel{
		margin-top: 16rpx;
	}
}
</style>
