<template>
	<view class="wrapper" v-cloak>
		<view class="container">
			<view class="panelBox" v-for="(item,index) in listData" :key="index" @click="handleDetail(item)">
				<view class="head">
					<view class="avatar" @click="handlePersonalHome(item)">
						<image :src="item.ThumbnailPath"></image>
					</view>
					<view class="info">
						<p class="name">{{item.UserName}}</p>
						<p class="depart">
							{{item.OwningBusinessUnit || ''}}
							<span class="time">
								{{item.ModifiedOn}}
							</span>
						</p>
					</view>
					<view class="arrow_icon" @click.stop="hanldeMore(item)">
						<tui-icon name="arrowdown" :size="24" ></tui-icon>
					</view>
				</view>
				<view class="content">
					<view class="desc">
						{{item.Description}}
					</view>
					<view class="imgTemplate">
						<!-- <div class="max_img">
							<image class="img" src="/static/images/news/banner_1.jpg" mode="widthFix"></image>
						</div>
						<div class="min_img">
							<image class="img" src="/static/images/news/banner_1.jpg" mode="widthFix"></image>
						</div> -->
						<view class="list_img">
							<view class="box" v-for="(row,idx) in item.Listpic" :key="idx" @click.stop="handleOpenImg(item,idx)">
								<image class="img" :src="pathUrl+row.Path.replace(/\\/g,'/')" mode="aspectFill"></image>
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
					<view class="location" v-if="item.Location" @click.stop="handleOpenLocation(item)">
						<tui-icon name="gps" :size="24" ></tui-icon>
						<span class="gps_text">
							{{item.Location}}
						</span>
					</view>
				</view>
				<view class="operation">
					<view class="btn">
						<span>
						{{item.NumOfForward || 0}}阅读
						</span>
					</view>
					<view class="btn" :class="{'active':item.IsPraise}" @click.stop="handleItemLike(item)">
						<tui-icon v-if="!item.IsPraise" name="agree" :size="24"></tui-icon>
						<tui-icon v-if="item.IsPraise" name="agree" :size="24" color="#d03a28" ></tui-icon>
						<span v-if="item.NumOfLike==0||item.NumOfLike==null">
						点赞
						</span>
						<span v-else>
							{{item.NumOfLike || 0}}
						</span>
					</view>
					<view class="btn" @click.stop>
						<tui-icon name="message" :size="24" ></tui-icon>
						<!-- <span>
						评论
						</span> -->
						{{item.ChatterCommentBases.length || 0}}
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
		<view class="add_template" @click="handleHref">
			<tui-icon name='plus' size='24' color="#fff"></tui-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pathUrl: 'http://112.126.75.65:10002',
				showActionSheet: false,
				itemList: [
				// 	{
				// 	text: "收藏",
				// 	color: "#2B2B2B"
				// },
				// {
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
				page:{
					isPage:false,
					pageNum:1,
					pageSize:10
				},
				listData:[],
				chatterId:''
			}
		},
		computed:{
			token(){
				return uni.getStorageSync('wechatAuthToken');
			}
		},
		onShow(){
			this.getQuery();
		},
		methods: {
			getQuery(){
				this.$http.getGayCircleList({
					token:this.token,
					Pagenum:this.page.pageNum,
					Pagesize:this.page.pageSize
				}).then(res=>{
					// this.listData = res.returnValue;
					let total = res.returnValue.total;
					if(this.page.pageNum*this.page.pageSize < total){
						this.page.isPage = true;
					}else {
						this.page.isPage = false;
					}
					let temp = [];
					if(this.page.pageNum==1){
						temp = res.returnValue.ChatterBaseList || [];
					}else {
						temp = this.listData.concat(res.returnValue.ChatterBaseList || []);
					}
					this.listData = temp;
					this.listData.map(item=>{
						item.ModifiedOn = this.$tui.formData(item.ModifiedOn);
					})
				})
			},
			hanldeMore(item){
				this.chatterId = item.ChatterId
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
					token: this.token,
					ChatterId: this.chatterId
				}).then(res=>{
					if(res.returnValue)
					this.showActionSheet = false;
					this.page.pageNum = 1;
					this.getQuery(); 
				})
			},
			handleHref(){
				uni.navigateTo({
					url:"/pages/gayCircle/sendPosts/sendPosts"
				})
			},
			handleDetail(item){
				uni.navigateTo({
					url:'/pages/gayCircle/detail/detail?id='+item.ChatterId
				})
			},
			handleItemLike(item){
				if(!item.IsPraise){
					this.$http.setLikeGayCircle({
						Token: this.token,
						ChatterId: item.ChatterId
					}).then(res=>{
						console.log('点赞',res)
						item.IsPraise = true;
						item.NumOfLike = item.NumOfLike+1
					})
				}else {
					this.$http.cancelLikeGayCircle({
						Token: this.token,
						ChatterId: item.ChatterId
					}).then(res=>{
						console.log('取消点赞',res)
						item.IsPraise = false;
						item.NumOfLike = item.NumOfLike-1
					})
				}
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
			handlePersonalHome(item){
				uni.navigateTo({
					url:'/pages/gayCircle/PersonalHome/PersonalHome?createdBy='+item.CreatedBy
				})
			},
			handleOpenLocation(item){
				console.log(item)
				uni.getLocation({
				 type: 'gcj02', //返回可以用于wx.openLocation的经纬度
				 success (res) {
				   const latitude = Number(item.Latitude)
				   const longitude = Number(item.Longitude)
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
.wrapper{
	font-size: 24rpx;
	.container{
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
								height: 100% !important;
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
	.add_template{
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		background: #d03a28;
		border-radius: 50%;
		position: fixed;
		bottom: 20rpx;
		right: 20rpx;
	}
}
</style>
