<template>
	<view class="wrapper" v-cloak>
		<tui-navigation-bar splitLine @init="initNavigation" @change="opacityChange" :scrollTop="scrollTop" backgroundColor="#fff" color="#333">
			<view class="tui-header-icon" :style="{ marginTop: top + 'rpx' }">
			  <tui-icon name="arrowleft" :color="opacity > 0.85 ? '#333' : '#fff'" @click="back"></tui-icon>
			  <span class="title">个人主页</span>
			</view>
		</tui-navigation-bar>
		<div class="header">
			<div class="cover"></div>
			<div class="infoWrap">
				<div class="avatar">
					<image :src="userDetail.thumbnailPath"></image>
				</div>
				<div class="operation">
					<div class="box">
						<p class="btn follow" :class="{'active':isFollow}" @click="handleFoloow">+ 关注</p>
						<button open-type="share" class="btn">分享</button>
					</div>
				</div>
				<div class="info">
					<h3 class="name">{{userDetail.nickName}}</h3>
					<!-- <p class="autograph">梦想还是要有的，万一实现了呢</p> -->
					<div class="nums">
						<span class="num">
							{{totalLikeQty || 0}}
						</span>
						获赞
					</div>
				</div>
			</div>
		</div>
		<view class="container">
			<view class="panelBox" v-for="(item,index) in list" :key="index" @click="handleDetail(item)">
				<view class="head">
					<view class="avatar">
						<image :src="item.thumbnailPath" mode=""></image>
					</view>
					<view class="info">
						<p class="name">{{item.userName}}</p>
						<p class="depart">
							描述
							<span class="time">
								{{item.modifiedOn}}
							</span>
						</p>
					</view>
					<view class="arrow_icon" @click.stop="hanldeMore(item)">
						<tui-icon name="arrowdown" :size="24" ></tui-icon>
					</view>
				</view>
				<view class="content">
					<view class="desc">
						{{item.description}}
					</view>
					<view class="imgTemplate">
						<!-- <div class="max_img">
							<image class="img" src="/static/images/news/banner_1.jpg" mode="widthFix"></image>
						</div>
						<div class="min_img">
							<image class="img" src="/static/images/news/banner_1.jpg" mode="widthFix"></image>
						</div> -->
						<view class="list_img">
							<view class="box" v-for="(row,idx) in item.listpic" :key="idx" @click.stop="handleOpenImg(item,idx)">
								<image class="img" :src="pathUrl+row.path.replace(/\\/g,'/')"></image>
							</view>
							<view class="fake_item"></view>
							<view class="fake_item"></view>
							<!-- <view class="box">
								<image class="img" src="/static/images/news/list_2.jpg" mode="widthFix"></image>
							</view>
							<view class="box">
								<image class="img" src="/static/images/news/list_3.jpg" mode="widthFix"></image>
							</view>
							<view class="box">
								<image class="img" src="/static/images/news/list_4.jpg" mode="widthFix"></image>
							</view>
							<view class="box">
								<image class="img" src="/static/images/news/list_2.jpg" mode="widthFix"></image>
							</view>
							<view class="box active">
								<image class="img" src="/static/images/news/list_3.jpg" mode="widthFix"></image>
								<view class="mask">
									+
								</view>
							</view> -->
						</view>
					</view>
					<view class="location" v-if="item.location" @click.stop="handleOpenLocation(item)">
						<tui-icon name="gps" :size="24" ></tui-icon>
						<span class="gps_text">
							{{item.location}}
						</span>
					</view>
				</view>
				<view class="operation">
					<view class="btn">
						<span>
						{{item.NumOfForward || 0}}阅读
						</span>
					</view>
					<view class="btn" :class="{'active':item.isPraise}" @click.stop="handleItemLike(item)">
						<tui-icon v-if="!item.isPraise" name="agree" :size="24"></tui-icon>
						<tui-icon v-if="item.isPraise" name="agree" :size="24" color="#d03a28" ></tui-icon>
						<span v-if="item.numOfLike==0||item.numOfLike==null">
						点赞
						</span>
						<span v-else>
							{{item.numOfLike || 0}}
						</span>
					</view>
					<view class="btn" @click.stop>
						<tui-icon name="message" :size="24" ></tui-icon>
						<!-- <span>
						评论
						</span> -->
						{{item.chatterCommentBases.length || 0}}
					</view>
				</view>
			</view>
		</view>
		<tui-actionsheet
		  :show="showActionSheet" 
		  :item-list="itemList" 
		  @click="handleItem" 
		  @cancel="closeActionSheet">
		</tui-actionsheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pathUrl:'http://112.126.75.65:10002',
				top:16,
				scrollTop: '',
				opacity:'',
				showActionSheet: false,
				itemList: [
				// {
				// 	text: "收藏",
				// 	color: "#2B2B2B"
				// }, {
				// 	text: "编辑动态",
				// 	color: "#2B2B2B"
				// },
				// {
				// 	text: "设为置顶动态",
				// 	color: "#2B2B2B"
				// },{
				// 	text: "设为分享范围",
				// 	color: "#2B2B2B"
				// },
				{
					text: "删除动态",
					color: "#d03a28"
				}],
				list:[
					{
						name:'党员',
						time:'18:00',
						desc:'无影灯下的天使，在常人看不到的世界里,守护生命！',
						imgs:[
							'http://images1.wenming.cn/web_djw/shouye/shipinxinwen/202110/W020211027306187202404.jpg',
							'http://images.wenming.cn/web_djw/shouye/shipinxinwen/202111/W020211101352755516083.jpg',
							'http://images.wenming.cn/web_djw/shouye/shipinxinwen/202110/W020211026338347645062.jpg',
							'http://images.wenming.cn/web_djw/shouye/shipinxinwen/202110/W020211020349226774743.png',
							'http://images.wenming.cn/web_djw/shouye/shipinxinwen/202110/W020211020349226774743.png'
						],
						readNum:9999,
						like:24,
						commentNum:100,
						isLike:false,
						location:'山西长治党建'
					},
					{
						name:'党员',
						time:'18:00',
						desc:'无影灯下的天使，在常人看不到的世界里,守护生命！',
						imgs:[
							'/static/images/news/list_2.jpg',
							'/static/images/news/list_3.jpg',
							'/static/images/news/list_4.jpg',
							'/static/images/news/list_2.jpg'
						],
						readNum:9999,
						isLike:false,
						like:24,
						commentNum:100,
						location:'山西长治党建'
					},
					{
						name:'党员',
						time:'18:00',
						desc:'无影灯下的天使，在常人看不到的世界里,守护生命！',
						imgs:[
							'/static/images/news/list_2.jpg',
							'/static/images/news/list_3.jpg',
							'/static/images/news/list_4.jpg',
							'/static/images/news/list_2.jpg'
						],
						readNum:9999,
						isLike:false,
						like:24,
						commentNum:100,
						location:'山西长治党建'
					}
				],
				isFollow:false,
				page:{
					isPage:false,
					pageNum: 1,
					pageSize: 10
				},
				userId: "",
				userDetail:{},
				totalLikeQty:"",
				chatterId: '',
				thumbnailPath:''
			}
		},
		onLoad(options){
			this.userId = options.createdBy;
			this.getQuery();
		},
		methods: {
			getQuery(){
				this.$http.getCirclePersonList({
					UserId: this.userId,
					Pagenum: this.page.pageNum,
					Pagesize: this.page.pageSize
				}).then(res=>{
					let total = res.returnValue.historyChat.total;
					this.totalLikeQty = res.returnValue.totalLikeQty;
					this.userDetail = res.returnValue.systemUserBase;
					if(this.page.pageNum*this.page.pageSize < total){
						this.page.isPage = true;
					}else {
						this.page.isPage = false;
					}
					let temp = [];
					if(this.page.pageNum==1){
						temp = res.returnValue.historyChat.chatterBaseList || [];
					}else {
						temp = this.list.concat(res.returnValue.historyChat.chatterBaseList || []);
					}
					this.list = temp;
					this.list.map(item=>{
						item.modifiedOn = this.$tui.formData(item.modifiedOn);
					})
				})
			},
			handleItemLike(item){
				if(!item.isPraise){
					this.$http.setLikeGayCircle({
						ChatterId: item.chatterId
					}).then(res=>{
						console.log('点赞',res)
						item.isPraise = true;
						item.numOfLike = item.numOfLike+1
					})
				}else {
					this.$http.cancelLikeGayCircle({
						ChatterId: item.chatterId
					}).then(res=>{
						console.log('取消点赞',res)
						item.isPraise = false;
						item.numOfLike = item.numOfLike-1
					})
				}
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			initNavigation(e){
				console.log('1231231', e)
				// this.top = e.top;
			},
			hanldeMore(item){
				this.chatterId = item.chatterId;
				this.showActionSheet = true
			},
			closeActionSheet(){
				this.showActionSheet = false
			},
			handleItem(e){
				let index = e.index;
				switch(index){
					case 0:
						const callback = (res)=>{
							console.log(res);
							if(res){
								this.handleDelete();
							}
						}
						this.$tui.modal('','是否要删除该朋友圈？',true,callback,'#d03a28')
						break;
				}
			},
			handleDelete(){
				this.$http.deleteCircle({
					ChatterId: this.chatterId
				}).then(res=>{
					if(res.returnValue)
					this.showActionSheet = false;
					this.page.pageNum = 1;
					this.getQuery(); 
				})
			},
			handleDetail(item){
				uni.navigateTo({
					url:'/pages/gayCircle/detail/detail?id='+item.chatterId
				})
			},
			handleOpenImg(item,idx){
				let imgs = [];
				item.listpic.forEach(item=>{
					imgs.push(this.pathUrl + item.path.replace(/\\/g,'/'));
				})
				wx.previewImage({
				  current: imgs[idx], // 当前显示图片的http链接
				  urls: imgs // 需要预览的图片http链接列表
				})
			},
			handleFoloow(){
				if(this.isFollow){
					var that = this;
					const callback = function (res){
						if(res){
							that.isFollow = false;
						}else {
							that.isFollow = true;
						}
					}
					this.$tui.modal('','确定不再关注啤酒泡沫？',true,callback,'#d03a28')
				}else {
					this.isFollow = !this.isFollow;
				}
			},
			handleOpenLocation(item){
				console.log(item)
				uni.getLocation({
				 type: 'gcj02', //返回可以用于wx.openLocation的经纬度
				 success (res) {
				   const latitude = Number(item.latitude)
				   const longitude = Number(item.longitude)
				   wx.openLocation({
				     latitude,
				     longitude,
				     scale: 18
				   })
				 }
				})
			}
		},
		onPullDownRefresh(){
			this.page.pageNum = 1;
			this.getQuery();
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			if(this.page.isPage){
				this.page.pageNum++;
				this.getQuery();
			}
		}
	}
</script>

<style lang="scss">
	
	.tui-header-icon {
		min-width: 120rpx;
		display: flex;
		align-items: center;
	}
	.tui-header-icon .title{
		color: #FFFFFF;
		text-align: center;
		padding-right: 32px;
		flex: 1;
	}
	.header{		
		.cover{
			width: 100%;
			height: 200px;
			background-size: cover;
		}
		.infoWrap{
			width: 100%;
			background: #FFFFFF;
			position: relative;
			.avatar{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				background: #d03a28;
				position: absolute;
				top: -50rpx;
				left: 30rpx;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.operation{
				position: absolute;
				right: 30rpx;
				top: -30rpx;
				.box{
					display: flex;
					.btn{
						width: 100rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						font-size: 24rpx;
						color: #FFFFFF;
						background: #d03a28;
						border-radius: 50rpx;
						padding: 0;
					}
					.btn.follow{
						margin-right: 20rpx;
					}
					.follow.active{
						background: #e2e3e5;
						color: #333333;
					}
				}
			}
			.info{
				padding-top: 60rpx;
				padding: 60rpx 30rpx 30rpx 30rpx;
				box-sizing: border-box;
				.name{
					font-weight: bold;
					font-size: 32rpx;
					color: #333333;
				}
				.autograph{
					font-size: 24rpx;
					color: #999999;
				}
				.nums{
					padding-top: 30rpx;
					font-size: 28rpx;
					color: #333333;
					.num{
						color: #d03a28;
						padding-right: 10rpx;
						font-weight: bold;
					}
				}
			}
		}
	}
	.container{
		font-size: 24rpx;
		.panelBox{
			background: #fff;
			padding: 20rpx;
			margin-top: 20rpx;
			.head{
				display: flex;
				align-items: center;
				.avatar{
					width: 80rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					background: #d03a28;
					border-radius: 50%;
					color: #fff;
					font-size: 28rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.info{
					margin-left: 20rpx;
					flex: 1;
					.depart{
						color: #999999;
						.time{
							padding-left: 20rpx;
						}
					}
				}
			}
			.content{
				.desc{					
					font-size: 32rpx;
					color: #333333;
					line-height: 1.5;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					word-wrap: break-word;
					white-space: normal !important;
					padding: 10rpx 0;
				}
				.imgTemplate{
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
							width: 222rpx;
							height: 222rpx;
							border-radius: 8rpx;
							background: #d4d4d4;
							margin-bottom: 10rpx;
							.img{
								width: 100%;
								height: 100%;
								vertical-align: top;
								border-radius: 8rpx;
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
				.location{
					max-width: 200rpx;
					display: flex;
					align-items: center;
					padding: 10rpx;
					border-radius: 30rpx;
					border: 1rpx solid #e2e3e5;
					margin-top: 20rpx;
					.gps_text{
						padding-left: 10rpx;
						width: 80%;
						display: inline-block;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
			}
			.operation{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #999999;
				margin-top: 20rpx;
				.btn{
					display: flex;
					align-items: center;
					span{
						padding-left: 10rpx;
					}
				}
				.btn.active{
					color: #d03a28;
				}
			}
		}
	}
</style>
