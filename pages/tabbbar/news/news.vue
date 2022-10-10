<template>
	<view class="tui-container">
		<view class="tui-searchbox">
			<van-search
			  :value="searchVal"
			  placeholder="请输入搜索关键词"
			  shape="round"
			   background="tranparent"
			  @change="onSearch"
			  @cancel="onCancel"
			/>
			<!-- <view class="tui-rolling-search">
				<icon type="search" :size='13' color='#999'></icon>
				<swiper vertical autoplay circular interval="8000" class="tui-swiper">
					<swiper-item v-for="(item,index) in hotSearch" :key="index" class="tui-swiper-item" @tap="search">
						<view class="tui-hot-item">大家正在搜：{{item}}</view>
					</swiper-item>
				</swiper>
				
			</view> -->
		</view>
		<view class="columnNav">
			<scroll-view class="tabs" scroll-x="true" @scroll="scroll" :scroll-left="scrollLeft">
					<view class="tab" @click="handleTabColumn(item,index)" :class="{'active':currentIdx==index}" v-for="(item,index) in tabs" :key="index">
						<span>
							{{item.Name}}
						</span>
					</view>
			</scroll-view>
			<view class="more" @click="handleOpenModal">
				<tui-icon name="ellipsis" size="10" color="#333"></tui-icon>
			</view>
		</view>
		<!--banner-->
	<!-- 	<swiper indicator-dots autoplay circular :interval="5000" :duration="150" indicator-color="rgba(255, 255, 255, 0.9)"
		 indicator-active-color="#C70C15" class="tui-banner-swiper">
			<swiper-item v-for="(item,index) in banner" :key="index" @tap.stop="bannerDetail">
				<view class="tui-banner-title">{{item.title}}</view>
				<image :src="'/static/images/news/'+item.img" class="tui-slide-image" mode="widthFix" />
			</swiper-item>
		</swiper> -->

		<!--新闻列表-->
		<view class="tui-news-view">
			<block v-for="(item,index) in newsList" :key="index">
				<tui-list-cell :index="index" @click="detail(item)" :unlined="count==index">
					<view class="tui-news-flex">
						<view class="tui-news-picbox" v-if="item.coverDisplay=='LeftTitle'">
							<block>
								<image @click.stop="handlePreviewImg(item,0)" :src="pathurl+item.ImgPathList[0].path" class="tui-block"></image>
							</block>
						</view>
						<view class="tui-news-tbox tui-flex-column tui-flex-between" :class="[item.CoverDisplay=='LeftTitle' && !item.isVideo?'tui-h165 tui-pl-20':'']">
							<view class="tui-news-title" :class="[(!item.isVideo && item.CoverDisplay=='LeftTitle')|| item.CoverDisplay=='LeftTitle'?'':'tui-pt20']">{{item.Title}}</view>
							<!-- <view class="tui-time">{{item.modifiedOn.replace(/T/g,' ')}}</view> -->
							<view class="tui-sub-box" :class="[!item.isVideo && item.CoverDisplay=='LeftTitle'?'':'tui-pt20']">
								<view class="tui-sub-source">{{item.KeyWords || ''}} {{item.ModifiedOn ? item.ModifiedOn.replace(/T/g,' ') : ''}}</view>
								<view class="tui-sub-cmt">
									<view>{{item.CommentCount || ''}}评论</view>
									<view class="tui-scale">
										<tui-tag padding="10rpx 24rpx" type="gray"  shape="circleRight" v-if="item.IsTop">置顶</tui-tag>
									</view>
								</view>
							</view>
						</view>
						<view class="tui-news-picbox" :class="[item.CoverDisplay=='RightTitle'?'right_picbox':'']" v-if="item.CoverDisplay=='RightTitle'">
							<block>
								<image @click.stop="handlePreviewImg(item,0)" :src="pathurl+item.ImgPathList[0].path" class="tui-block" mode="widthFix"></image>
							</block>
						</view>
					</view>
					<view class="tui-news-picbox" v-if="item.CoverDisplay=='BelowGrid'||item.CoverDisplay=='Carousel'">
						<block v-for="(items,index2) in item.ImgPathList" :key="index2">
							<image @click.stop="handlePreviewImg(item,index2)" :src="pathurl+items.path" mode="widthFix"></image>
						</block>
						<view v-if="item.CoverDisplay=='BelowGrid'" class="fack_item"></view>
					</view>
					<view class="maxImg" v-if="item.CoverDisplay=='BelowTitleBigImg'">
						<image v-for="items in item.imgPathList" :src="pathurl+items.path" @click.stop="handlePreviewImg(item,index2)" mode="widthFix"></image>
					</view>
				</tui-list-cell>
			</block>

		</view>
		<tui-tips ref="toast"></tui-tips>
		<!--加载loadding-->
		<tui-loadmore v-if="loadding" :index="3" type="primary"></tui-loadmore>
		<tui-nomore v-if="!page.isPage" ></tui-nomore>
		<!--加载loadding-->
		
		<!-- 栏目编辑 -->		
		<tui-drawer @touchmove.stop.prevent="clear" mode="bottom" :visible="isVisible" @close="closeDrawer">
		  <view @touchmove.stop.prevent="clear" class="d-container">
			  <view class="panel">
				  <view class="row">
					  <view class="name">
						  我的频道
						  <span class="tag">点击进入频道</span>
					  </view>
					  <view class="options">
						  <span @click="closeDrawer">取消</span>
						  <span v-if="!isEdit" class="edit" @click="handleEditChannel">编辑</span>
						  <span v-if="isEdit" class="complete" @click="handleComplete">完成</span>
					  </view>
				  </view>
				 <!-- <view class="columns">
					  <div :style="'left:'+moveX[index]+'rpx;top:'+moveY[index]+'rpx'" @touchend="(e)=>{isEdit&&handleTouchend(e,index)}" @longpress="(e)=>{isEdit&&drag_start(e,index)}" @touchmove.prevent="(e)=>{isEdit&&dragMove(e,index)}" class="name" v-for="(item,index) in myChannel" :key="index">
						<span>
							{{item.name}}
						</span>
						<i class="icon" v-if="isEdit&&item.disabled!=1">
							<tui-icon name="shut" size='10'></tui-icon>
						</i>
					  </div>
					  <view class="fack_item"></view>
					  <view class="fack_item"></view>
				  </view> -->
				  <view>  
					<dragSort ref='childDrag' @clickSelect="handleSelect"
					 @del.stop="handleIitemDel"
					 @update:list="update" @changeEdit="setEdit" :isEdit="isEdit" :list="myChannel" label="Name" :columnNum="4" :columnSpace="20" :rowHeight="60" :rowSpace="20"></dragSort>
				  </view>
			  </view>
			  <view class="panel">
				  <view class="row">
					  <view class="name">
						  推荐频道
						  <span class="tag">点击进入频道</span>
					  </view>
				  </view>
				  <view class="columns">
					  <view class="name" @click="handleAddChannel(item,index)" :style="{width: columnWidth+'px'}" v-for="(item,index) in recommendChannel" :key="index">
						  <i class="add_icon">
							  <tui-icon name='plus' size='10'></tui-icon>
						  </i>
						  <span>
						  	{{item.Name}}
						  </span>
					  </view>
					  <view class="fack_item"></view>
					  <view class="fack_item"></view>
				  </view>
			  </view>
		  </view>
		</tui-drawer>
	</view>
</template>

<script>
	import dragSort from '@/components/dragSort/dragSort.vue'
	export default {
		components:{
			dragSort
		},
		computed: {
			count() {
				return this.newsList.length - 1
			},
			token(){
				return uni.getStorageSync('wechatAuthToken')
			}
		},
		data() {
			return {
				pathurl:"http://182.92.221.64:10002",
				searchVal:"",
				hotSearch: [
					"早安D站",
					"2019退役球星",
					"卡拉斯科"
				],
				banner: [{
					img: "banner_1.jpg",
					title: "山东官方：德尔加多已完成全部手续办理，具备上场比赛资格"
				}, {
					img: "banner_2.jpg",
					title: "这个世界上，或许没有真正的托黑"
				}, {
					img: "banner_3.jpg",
					title: "金童再见！西班牙前锋托雷斯宣布退役"
				}],
				newsList: [],
				dataSources: [{
					title: "卡拉斯科：俱乐部一些人的态度令我不解；需要解决出现的问题",
					source: "手机中国网",
					cmtsNum: 2019,
					isTop: true,
					isVideo: false,
					time: "00:00",
					img: ["list_1.jpg"],
					imgNum: 1
				}, {
					title: "荷兰媒体：德利赫特接近加盟尤文，转会费7000万，年薪2000万",
					source: "央视网新闻",
					cmtsNum: 3620,
					isTop: true,
					isVideo: false,
					time: "00:00",
					img: ["list_2.jpg"],
					imgNum: 1
				}, {
					title: "申花客场1-0江苏终结九轮不胜，莫雷诺争议进球经VAR判罚有效",
					source: "体坛大精汇",
					cmtsNum: 5230,
					isTop: true,
					isVideo: false,
					time: "00:00",
					img: [],
					imgNum: 0
				}, {
					title: "卡拉斯科：俱乐部一些人的态度令我不解；需要解决出现的问题",
					source: "体坛大精汇",
					cmtsNum: 7690,
					isTop: true,
					isVideo: false,
					time: "00:00",
					img: ["list_3.jpg", "list_2.jpg", "list_1.jpg"],
					imgNum: 20
				}, {
					title: "敲锣鼓、放鞭炮！本周国际赛事MVP提名揭晓",
					source: "体坛大精汇",
					cmtsNum: 2019,
					isTop: true,
					isVideo: false,
					time: "00:00",
					img: ["list_3.jpg"],
					imgNum: 1
				}, {
					title: "申花客场1-0江苏终结九轮不胜，莫雷诺争议进球经VAR判罚有效",
					source: "手机中国网",
					cmtsNum: 2019,
					isTop: true,
					isVideo: false,
					time: "00:00",
					img: ["list_4.jpg"],
					imgNum: 1
				}, {
					title: "荷兰媒体：德利赫特接近加盟尤文，转会费7000万，年薪2000万",
					source: "手机中国网",
					cmtsNum: 2019,
					isTop: true,
					isVideo: true,
					time: "00:58",
					img: ["banner_2.jpg"],
					imgNum: 1
				}, {
					title: "敲锣鼓、放鞭炮！本周国际赛事MVP提名揭晓",
					source: "体坛大精汇",
					cmtsNum: 5230,
					isTop: true,
					isVideo: false,
					time: "00:00",
					img: [],
					imgNum: 0
				}, {
					title: "卡拉斯科：俱乐部一些人的态度令我不解；需要解决出现的问题",
					source: "体坛大精汇",
					cmtsNum: 7690,
					isTop: true,
					isVideo: false,
					time: "00:00",
					img: ["list_3.jpg", "list_2.jpg", "list_4.jpg"],
					imgNum: 8
				}, {
					title: "申花客场1-0江苏终结九轮不胜，莫雷诺争议进球经VAR判罚有效",
					source: "手机中国网",
					cmtsNum: 2019,
					isTop: true,
					isVideo: true,
					time: "00:49",
					img: ["banner_1.jpg"],
					imgNum: 1
				}],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				tabs: [{
					name: "推荐"
				}, {
					name: "要闻"
				}, {
					name: "新思想"
				}, {
					name: "北京"
				}, {
					name: "综合"
				},{
					name: "实播中国"
				}, {
					name: "青春中国"
				}, {
					name: "北京"
				}, {
					name: "综合"
				},{
					name: "实播中国"
				}, {
					name: "青春中国"
				}],
				currentIdx:0,
				scrollLeft:0,
				isVisible:false,
				myChannel: [{
					"name": "推荐",
					"id": 'id_1'
				}, {
					"name": "要闻",
					"id": 'id_2'
				}, {
					"name": "新思想",
					"id": 'id_3'
				}, {
					"name": "北京",
					"id": 'id_4'
				}, {
					"name": "综合",
					"id": 'id_5'
				}, {
					"name": "实播中国",
					"id": 'id_6'
				}, {
					"name": "青春中国",
					"id": 'id_7'
				}, {
					"name": "北京",
					"id": 'id_8'
				}, {
					"name": "青春中国",
					"id": 'id_9'
				}, {
					"name": "旅游",
					"id": 'id_10'
				}, {
					"name": "娱乐",
					"id": 'id_11'
				}, {
					"name": "体育",
					"id": 'id_12'
				}, {
					"name": "其他",
					"id": 'id_13'
				}, {
					"name": "其他",
					"id": 'id_18'
				}],
				recommendChannel:[
					{
						name:'产品',
						"id": 'id_14'
					},
					{
						name:'产品',
						"id": 'id_15'
					},
					{
						name:'产品',
						"id": 'id_16'
					},
					{
						name:'产品',
						"id": 'id_17'
					}
				],
				isEdit:false, // 是否编辑
				start:[0,0],
				moveY:[],
				moveX:[],
				windowWidth:'',
				windowHeight:'',
				isDrag: false, // 激活拖拽
				columnWidth:0,
				typeId: '',
				page:{
					isPage:false,
					pageNum:1,
					pageSize:10
				}
			}
		},
		onLoad: function(options) {
			Object.assign(this.$data,this.$options.data());
			// this.newsList = this.dataSources
			const { windowWidth, windowHeight } = uni.getSystemInfoSync();  
			this.windowWidth = windowWidth
			this.windowHeight = windowHeight
			// this.getQueryColumn().then(res=>{
			// 	this.getQueryList();
			// })
			
		},
		onShow() {
			this.getQueryColumn().then(res=>{
				this.getNotList();
			})
			this.getChannle();
		},
		mounted(){
			this.$nextTick(function(){
				setTimeout(()=>{
					this.columnWidth = this.$refs.childDrag.columnWidth;
				},500)
			})
		},
		methods: {
			getNotList(){
				this.$httpWX({
					url:'/NewsContent/ContentSearch/UnreadContent',
					method: 'get',
					data:{
						Token: this.token,
						TypeId: this.typeId,
						SearchValue: this.searchVal,
						Pagenum: this.page.pageNum,
						Pagesize: this.page.pageSize
					}
				}).then(res=>{
					let total =  res.returnValue.Total;
					if(this.page.pageNum*this.page.pageSize<total){
						this.page.isPage = true;
					}else {
						this.page.isPage = false;
					}
					let temp = [];
					if(this.page.pageNum==1){
						temp = res.returnValue.ContentBaseList || [];
					}else {
						temp = this.newsList.concat(res.returnValue.ContentBaseList)
					}
					this.newsList = temp;
				})
			},
			onSearch(e){
				this.searchVal = e.detail;
				this.getQueryList();
			},
			onCancel(){
				this.searchVal = '';
				this.getQueryList();
			},
			handlePreviewImg(item,idx){
				console.log(item);
				let imgs = [];
				item.imgPathList.forEach(item=>{
					imgs.push(this.pathurl + item.path);
				})
				uni.previewImage({
				  current: imgs[idx], // 当前显示图片的http链接
				  urls: imgs // 需要预览的图片http链接列表
				})
			},
			// 栏目
			async getQueryColumn(){
				let response
				await this.$http.getNewsColumn({
					Token:this.token
				}).then(res=>{
					this.tabs = res.returnValue;
					this.tabs.unshift({
						Name: '未读',
						ItemId: ''
					})
					this.typeId = this.tabs[0].ItemId;
					response = res;
				})
				return response;
			},
			handleTabColumn(item,index){
				this.typeId = item.ItemId;
				this.currentIdx = index;
				this.page.pageNum = 1;
				if(index==0){
					this.getNotList();
				}else {
					this.getQueryList();
				}
			},
			// 列表
			getQueryList(){
				this.$http.getNewsList({
					Token: this.token,
					TypeId: this.typeId,
					SearchValue: this.searchVal,
					Pagenum: this.page.pageNum,
					Pagesize: this.page.pageSize
				}).then(res=>{
					let total =  res.returnValue.Total;
					if(this.page.pageNum*this.page.pageSize<total){
						this.page.isPage = true;
					}else {
						this.page.isPage = false;
					}
					let temp = [];
					if(this.page.pageNum==1){
						temp = res.returnValue.ContentBaseList || [];
					}else {
						temp = this.newsList.concat(res.returnValue.ContentBaseList)
					}
					this.newsList = temp;
				})
			},
			// 获取我的频道
			getChannle(){
				this.$http.getChannle({
					Token: this.token
				}).then(res=>{
					console.log(res);
					let list = res.returnValue;
					list = list.map(item=>{
						item.id = item.itemId;
						return item;
					})
					this.myChannel = list.filter(item=>item.IsCollect==true);
					this.recommendChannel = list.filter(item=>!item.IsCollect);
					console.log(this.myChannel,this.recommendChannel,'====');
				})
			},
			clear:function(){},
			search: function() {
				uni.navigateTo({
					url: '../search/search'
				})
			},
			bannerDetail: function() {
				uni.navigateTo({
					url: '/pages/news/newsDetail'
				})
			},
			handleSelect(obj){
				this.currentIdx = this.tabs.findIndex(item=>item.Name==obj.Name);
				if(this.currentIdx>=4){
					this.scrollLeft = this.currentIdx * 50
				}else {
					this.scrollLeft = 0;
				}
				this.getQueryList(obj,this.currentIdx)
				this.isVisible = false;
				uni.showTabBar()
			},
			// 删除我的频道
			handleIitemDel(item){
				this.$http.setDelChannle({
					Token: this.token,
					NewTypeId: item.itemId
				}).then(res=>{
					console.log(res);
					this.getChannle();
				})
			},
			scroll(e){
				console.log(e);
			},
			handleTab(item,index){
				this.currentIdx = index;
			},
			handleOpenModal(){
				uni.hideTabBar()
				this.isEdit = false;
				this.isVisible = true;
			},
			closeDrawer(){
				// this.$refs.childDrag.toggleEdit('cancel');
				this.isVisible = false
				uni.showTabBar()
			},
			handleEditChannel(){
				this.$refs.childDrag.handleListData();
				this.isEdit = true;
				this.$refs.childDrag.toggleEdit('edit');
			},
			handleComplete(){
				this.isEdit = false;
				this.$refs.childDrag.toggleEdit('finish');
			},
			detail(item) {
				// let index = e.index;
				// let url = "/pages/news/newsDetail";
				// if (this.newsList[index].isVideo) {
				// 	url = "/pages/news/newsVideo";
				// }
				let url = '../../news/newsDetail?id='+item.ContentId + '&typeId=' + this.typeId
				uni.navigateTo({
					url: url
				})
			},
			drag_start(e,index){
				console.log('鼠标触摸：',e,index)
				this.$nextTick(()=>{
					let query = uni.createSelectorQuery().in(this).select(".columns")._component.$children
					console.log(query)
				})
				this.start[0] = e.touches[0].clientX-e.target.offsetLeft;
				this.start[0] = e.touches[0].clientY-e.target.offsetTop;
				this.isDrag = true; // 可拖拽
			},
			dragMove(e,index){
				console.log('鼠标移动：',e)
				if(this.isDrag){					
					let query = uni.createSelectorQuery().in(this).select(".columns")._component.$children
					let tag = e.touches;
					if(tag[0].clientX < 0 ){
						tag[0].clientX = 0
					}
					if(tag[0].clientY < 0 ){
						tag[0].clientY = 0
					}
					if(tag[0].clientX > this.windowWidth ){
						tag[0].clientX = this.windowWidth
					}
					if(tag[0].clientY > this.windowHeight ){
						tag[0].clientY = this.windowHeight
					}
					this.moveX[index]  = tag[0].clientX-this.start[0];
					this.moveY[index]  = tag[0].clientY-this.start[1];
				}
			},
			handleTouchend(e,index){
				this.isDrag = false;
			},
			setEdit(e){
				this.isEdit = e;
			},
			// 推荐频道添加到我的频道
			handleAddChannel(item,index){
				// this.myChannel.push(item);
				// this.recommendChannel.splice(index,1)
				this.$http.setAddChannle({
					Token: this.token,
					NewTypeId: item.ItemId
				}).then(res=>{
					console.log(res);
					this.getChannle();
				})
			},
			update(arr){
				this.myChannel = arr;
			}
		},
		//页面相关事件处理函数--监听用户下拉动作
		onPullDownRefresh: function() {
			// this.newsList = this.dataSources;
			// this.pageIndex = 1;
			// this.pullUpOn = true;
			// this.loadding = false;
			// uni.stopPullDownRefresh();
			// let options = {
			// 	msg: "刷新成功，为你更新了10条数据",
			// 	duration: 2000,
			// 	type: "translucent"
			// };
			// setTimeout(() => {
			// 	this.$refs.toast.showTips(options);
			// }, 300);
			this.page.pageNum = 1;
			if(this.typeId==''){
				this.getNotList();
			}else {
				this.getQueryList();
			}
			uni.stopPullDownRefresh();
		},

		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			// if (!this.pullUpOn) return;
			this.loadding = true;
			if(this.page.isPage){
				this.page.pageNum++;
				if(this.typeId==''){
					this.getNotList();
				}else {
					this.getQueryList();
				}
			}
			this.loadding = false;
			// if (this.pageIndex == 3) {
			// 	this.loadding = false;
			// 	this.pullUpOn = false
			// } else {
			// 	let arr = JSON.parse(JSON.stringify(this.dataSources));
			// 	if (this.pageIndex >= 1) {
			// 		for (let item of arr) {
			// 			item.isTop = false;
			// 		}
			// 	}
			// 	this.newsList = this.newsList.concat(arr);
			// 	this.pageIndex = this.pageIndex + 1;
			// 	this.loadding = false
			// }
		}
	}
</script>

<style lang="scss">
	.columnNav{
		display: flex;
		font-size: 28rpx;
		// background: rgba(199, 12, 21,.5);
		background: #fff;
		border-bottom: 1rpx solid #F4F4F4;
		.tabs{
			width: calc(100% - 60rpx);
			white-space: nowrap;
			overflow: hidden;
			height: 82rpx;
			.tab{
				padding: 0 20rpx;
				text-align: center;
				line-height: 80rpx;
				color: #333;
				display: inline-block;
				box-sizing: border-box;
				span{
					padding-bottom: 16rpx;
					border-bottom: 5rpx solid transparent;
					font-size: 32rpx;
				}
			}
			.tab.active{
				color: #d03a28;
				font-weight: bold;
			}
			.tab.active span{
				border-bottom: 5rpx solid #d03a28;
			}
		}
		.more{
			width: 82rpx;
			height: 82rpx;
			line-height: 82rpx;
			text-align: center;
			// background: rgba(0,0,0,.3);
			// box-shadow: 1rpx 0 0 0 rgba(0,0,0,.5);
			background: rgba(255,255,255,.3);
			box-shadow: 1rpx 0 0 0 rgba(255,255,255,.5);
			.tui-icon{
				background: initial !important;
				color: #333;
			}
		}
	}
	.d-container{
		width: 100%;
		min-height: 100vh;
		background: #FFFFFF;
		.panel{
			padding: 20rpx 0;
			.row{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 20rpx 0;
				padding: 0 20rpx;
				box-sizing: border-box;
				.name{
					font-size: 28rpx;
					color: #333333;
					.tag{
						color: #999999;
						padding-left: 15rpx;
					}
				}
				.options{
					span{
						display: inline-block;
						border: 1rpx solid #d03a28;
						border-radius: 50rpx;
						padding: 8rpx 30rpx;
						color: #d03a28;
						font-size: 28rpx;
					}
					span:last-child,.edit{
						margin-left: 20rpx;
					}
					.complete{
						color: #fff;
						background: #d03a28;
					}
				}
			}
			.dragSort-view__btn-del .tui-icon{
				border: none!important;
				background: transparent!important;
				padding: 0!important;
				border-radius: 0!important;
			}
			.columns{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				padding: 0 20rpx;
				box-sizing: border-box;
				.name{
					width: 150rpx;
					height: 60rpx;
					text-align: center;
					color: #333;
					background: #EEEEEE;
					border-radius: 5rpx;
					font-size: 24rpx;
					margin-top: 20rpx;
					position: relative;
					display: flex;
					justify-content: center;
					align-items: center;
					span{
						display: inline-block;
						line-height: 60rpx;
					}
					.icon{
						position: absolute;
						top: 0rpx;
						right: 5rpx;
					}
					.add_icon{
						margin-right: 10rpx;
					}
					.tui-icon{
						background: initial;
						padding: 0;
						border: none;
					}
				}
				.fack_item{
					flex: 0 0 150rpx;
					height: 0;
				}
			}
		}
	}
	.maxImg{
		width: 100%;
		height: 315rpx;
		margin-top: 20rpx;
	}
	.maxImg image{
		width: 100%;
		height: 100%;
	}
	.tui-container {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-searchbox {
		// padding: 16rpx 20rpx;
		box-sizing: border-box;
		// background-color: #F2F2F2;
	}

	.tui-rolling-search {
		width: 100%;
		height: 60rpx;
		border-radius: 35rpx;
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		color: #999;
	}

	.tui-swiper {
		font-size: 26rpx;
		height: 60rpx;
		flex: 1;
		padding-left: 12rpx;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;
	}

	.tui-hot-item {
		line-height: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-banner-swiper {
		width: 100%;
		height: 300rpx;
		position: relative;
	}

	.tui-slide-image {
		width: 100%;
		height: 300rpx;
		display: block;
	}

	.tui-banner-title {
		width: 100%;
		height: 100rpx;
		position: absolute;
		z-index: 9999;
		color: #fff;
		bottom: 0;
		padding: 0 30rpx;
		padding-top: 25rpx;
		font-size: 34rpx;
		font-weight: bold;
		background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	/* #ifdef MP-WEIXIN  */
	.tui-banner-swiper .wx-swiper-dots.wx-swiper-dots-horizontal {
		width: 100%;
		top: 280rpx;
		text-align: right;
		padding-right: 30rpx;
		box-sizing: border-box;
	}

	.tui-banner-swiper .wx-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	.tui-banner-swiper .wx-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 8rpx;
	}

	.tui-banner-swiper .wx-swiper-dot-active::before {
		background: #d03a28;
	}

	.tui-banner-swiper .wx-swiper-dot.wx-swiper-dot-active {
		width: 18rpx;
	}

	/* #endif */

	/* #ifndef MP-WEIXIN */
	>>>.tui-banner-swiper .uni-swiper-dots.uni-swiper-dots-horizontal {
		width: 100%;
		top: 280rpx;
		text-align: right;
		padding-right: 30rpx;
		box-sizing: border-box;
	}

	>>>.tui-banner-swiper .uni-swiper-dot {
		width: 8rpx;
		height: 8rpx;
		display: inline-flex;
		background: none;
		justify-content: space-between;
	}

	>>>.tui-banner-swiper .uni-swiper-dot::before {
		content: '';
		flex-grow: 1;
		background: rgba(255, 255, 255, 0.9);
		border-radius: 8rpx;
	}

	>>>.tui-banner-swiper .uni-swiper-dot-active::before {
		background: #5677fc;
	}

	>>>.tui-banner-swiper .uni-swiper-dot.uni-swiper-dot-active {
		width: 18rpx;
	}

	/* #endif */

	.tui-news-flex {
		width: 100%;
		display: flex;
	}

	.tui-flex-start {
		align-items: flex-start !important;
	}

	.tui-flex-center {
		align-items: center !important;
	}

	.tui-flex-column {
		flex-direction: column !important;
	}

	.tui-flex-between {
		justify-content: space-between !important;
	}

	.tui-news-cell {
		display: flex;
		padding: 20rpx 30rpx;
	}

	.tui-news-tbox {
		flex: 1;
		width: 100%;
		box-sizing: border-box;
		display: flex;
	}

	.tui-news-picbox {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		position: relative;
		margin-top: 20rpx;
	}
	.tui-news-picbox.right_picbox{
		margin-left: 20rpx;
		background: #f2f2f2;
		border-radius: 5rpx;
		border: 1rpx solid #e2e3e5;
		box-sizing: border-box;
	}
	.tui-news-picbox image{
		width: 110px !important;
		height: 81px !important;
		object-fit: contain;
		border-radius: 5rpx;
		
	}
	.fack_item{
		flex: 0 0 33%;
		height: 0;
	}
	.tui-w220 {
		width: 220rpx;
	}

	.tui-h165 {
		height: 165rpx;
	}

	.tui-block {
		display: block;
	}

	.tui-w-full {
		width: 100%;
	}

	.tui-one-third {
		width: 33%;
	}

	.tui-news-title {
		width: 100%;
		font-size: 34rpx;
		word-break: break-all;
		word-wrap: break-word;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		box-sizing: border-box;
	}
	.tui-time{
		color: #999;
		line-height: 24rpx;
		padding-top: 20rpx;
	}
	.tui-pl-20 {
		padding-left: 20rpx;
	}

	.tui-pt20 {
		padding-top: 20rpx;
	}

	.tui-sub-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #999;
		box-sizing: border-box;
		line-height: 24rpx;
	}

	.tui-sub-source {
		font-size: 26rpx;
	}

	.tui-sub-cmt {
		font-size: 24rpx;
		line-height: 24rpx;
		display: flex;
		align-items: center;
	}


	.tui-scale {
		transform: scale(0.6);
		transform-origin: center center;
	}

	.tui-btm-badge {
		position: absolute;
		right: 0;
		bottom: 0;
		font-size: 24rpx;
		color: #fff;
		padding: 2rpx 12rpx;
		background: rgba(0, 0, 0, 0.6);
		z-index: 20;
		transform: scale(0.8);
		transform-origin: 100% 100%;
	}

	.tui-video {
		position: absolute;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		transform-origin: 0 0;
	}

	.tui-icon {
		background: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		padding: 26rpx;
	}
</style>
