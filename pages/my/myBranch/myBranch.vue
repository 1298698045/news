<template>
	<view class="wrapper">
		<div class="header">
			<tui-tabs :tabs="tabs" color="#333" sliderBgColor="#d03a28" selectedColor="#d03a28" :currentTab="currentIdx" itemWidth="50%" @change="changeTab"></tui-tabs>
			<!-- <view class="tabs">
				<view class="tab" @click="changeTab(item,index)" :class="{'active':currentIdx==index}" v-for="(item,index) in tabs" :key="index">
					<span>
						{{item.name}}
					</span>
				</view>
			</view> -->
		</div>
		<div class="center">
			<div class="panel" v-if="currentIdx==0">
				<div class="cell">
					{{record.Name.value || ''}}
				</div>
				<div class="cell">
					{{record.CreatedBy.value || ''}}
				</div>
			</div>
			<div class="peopleList" v-if="currentIdx==1">
				<div class="panel">
					<div class="row" v-for="(item,index) in partyPeoples" :key="index" @click="handleDetail(item)">
						<div class="avatar">
							{{item.name || ''}}
						</div>
						<div class="userInfo">
							<p class="userName">{{item.FullName.textValue || ''}}</p>
							<p class="dept">{{item.DeptId.lookupValue.displayName || ''}}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="activityBox" v-if="currentIdx==2">
				<div class="emptyBox" v-if="listData.length=='' || listData.length == 0">
					<div class="imgBox">
						<img src="/static/images/activity/empty.png" alt="">
					</div>
					<div class="emptyName">
						没有支部活动
					</div>
				</div>
				<div class="listWrap" v-else>
					<div class="list-item" @click="toview(item)" v-for="(item,index) in listData" :key="index">
						<div class="item-head">
							{{item.Name || ''}}
							<p>
								发布时间：{{item.ActualStart || ''}}
								{{item.CreatedByName || ''}}
								
							</p>
						</div>
						<div class="item-body item-img-body">
							<div class="body-right">
								{{item.Description || ''}}
							</div>
						</div>
						<div class="item-bottom">
							<div>
								<img src="/static/images/activity/02.3.2.Time-sort.png" />
								<span>{{item.timeStr || ''}} 截止</span>
							</div>
							<div>
								<img src="/static/images/activity/04.5.1.1.Participants.png" />
								<span>{{item.NumOfPeople || 0}}人报名</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs:[
					{
						name: '基本信息'
					},
					{
						name: '支部成员'
					},
					{
						name: '支部活动'
					}
				],
				currentIdx:0,
				deptId: '',
				record: {},
				partyPeoples:[],
				pageNumber:1,
				pageSize:20,
				isPage: false,
				listData: [],
				userId: uni.getStorageSync('userId')
			}
		},
		onLoad(options){
			this.getInfo().then(res=>{
				this.id = res.returnValue.record.PartyUnitId.Id;
				this.getDetail();
			});
		},
		methods: {
			async getInfo(){
				let response;
				await this.$httpWX({
					url: '/entity/detail/'+this.userId,
					method:'get',
					data:{
						objectTypeCode: 30020,
						layoutId: '1479f8e2-6bf5-4e15-b612-8d4e5ff40c9a'
					}
				}).then(res=>{
					console.log(res);
					response = res;
				})
				return response;
			},
			changeTab(e){
				this.currentIdx = e.index;
				this.pageNumber = 1;
				if(e.index==1){
					this.getPartyPeople();
				}else if(e.index==2){
					this.getActivityList();
				}else {
					this.getDetail();
				}
			},
			getActivityList(){
				this.$httpWX({
					url: '/campaign/getlist',
					method: 'get',
					data:{
						scope:'all',
						PageNumber: this.pageNumber,
						PageSize: this.pageSize,
						filterquery: '\nPartyUnitId\teq\t'+this.id
					}
				}).then(res=>{
					console.log(res)
					let total = res.total;
					if(this.pageNumber * this.pageSize < total){
						this.isPage = true;
					}else {
						this.isPage = false;
					}
					let result = [];
					if(this.pageNumber==1){
						result = res.returnValue;
					}else {
						result = this.listData.concat(res.returnValue);
					}
					this.listData = result;
					this.listData.forEach(item=>{
						var timeStr = this.formDateFn(item.ActualEnd);
						this.$set(item,'timeStr',timeStr)
					})
				})
			},
			formDateFn(time){
				var date = new Date(time);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				var d = date.getDate();
				var week = ['周日','周一','周二','周三','周四','周五','周六']
				var day = week[date.getDay()];
				var h = date.getHours();
				var min = date.getMinutes();
				var str = `${m}月${d}日 ${day} ${h}:${min}`;
				return str;
			},
			toview(item){
				uni.navigateTo({
					url: '/pages/activity/activityDetail?id='+item.CampaignId
				})
			},
			getDetail(){
				this.$httpWX({
					url:'/entity/detail/'+this.id,
					method: 'get',
					data:{
						objectTypeCode: 31300,
						layoutId: '58e3f9e5-d72c-40d6-9805-1f9f339bba25'
					}
				}).then(res=>{
					this.record = res.returnValue.record;
				})
			},
			getPartyPeople(){
				this.$httpWX({
					url:'/entity/fetchall',
					method: 'post',
					data:{
						objectTypeCode: 30020,
						filterquery: '\nPartyUnitId\teq\t'+this.id,
						PageNumber: this.pageNumber,
						PageSize: this.pageSize
					}
				}).then(res=>{
					let total = res.returnValue.totalCount;
					if(this.pageNumber * this.pageSize < total){
						this.isPage = true;
					}else {
						this.isPage = false;
					}
					let result = [];
					if(this.pageNumber==1){
						result = res.returnValue.nodes;
					}else {
						result = this.partyPeoples.concat(res.returnValue.nodes);
					}
					this.partyPeoples = result;
					this.partyPeoples = this.partyPeoples.map(item=>{
						if(item.FullName.value.length>=3){
							item.name = item.FullName.value.slice(1);
						}else {
							item.name = item.FullName.value;
						}
						return item;
					})
				})
			},
			handleDetail(item){
				uni.navigateTo({
					url:'peopleDetail?id='+item.id
				})
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageNumber = 1;
			if(this.currentIdx==1){
				this.getPartyPeople();
			}else if(this.currentIdx==2){
				this.getActivityList();
			}
			wx.stopPullDownRefresh();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
		   if(this.isPage){
			   this.pageNumber++;
			   if(this.currentIdx==1){
			   	this.getPartyPeople();
			   }else if(this.currentIdx==2){
			   	this.getActivityList();
			   }
		   }
		}
	}
</script>

<style lang="scss">
	page{
		background: #fff;
	}
	.list-item{
	    padding:10px;
	    border-radius:8px;
	    background-color:white;
	    margin:10px;
	}
	.list-item .fullName{
	    font-size:12px;
	    color:#666666;
	}
	.item-head{
	    font-weight:700;
		p{
			font-size: 24rpx;
			color: #666666;
			font-weight: normal;
			line-height: 2;
		}
	}
	.item-body{
	    margin:5px 0;
	    display: -webkit-box;    
	    -webkit-box-orient: vertical;    
	    -webkit-line-clamp: 6;
	    overflow: hidden;
	    font-size:14px;
	    padding:2px;
	}
	.item-img-body{
	    display:flex;
	}
	.body-left{
	    width:120px;
	    height:120px;
	}
	.body-left img{
	    width:115px;
	    height:115px;
	}
	.body-right{
	    flex:1;
	    display: -webkit-box;    
	    -webkit-box-orient: vertical;    
	    -webkit-line-clamp: 6;
	    overflow: hidden;
	    font-size:14px;
	    padding:2px;
	    box-sizing:border-box;
	}
	.item-bottom{
	    padding:15px 10px;
	    background-color:#f8f8f8;
	    font-size:12px;
	    color:#999;
	    display:flex;
	    justify-content: space-between
	}
	.item-bottom img{
	    width:14px;
	    height:14px;
	    position:relative;
	    top:3px;
	    margin-right:3px;
	}
	.avatar {
	    width: 40px;
	    height: 40px;
	    line-height: 40px;
	    border-radius: 50%;
	    background: #3399ff;
	    color: #fff;
	    text-align: center;
	    font-size: 12px;
	}
	.wrapper{
		.tabs{
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			background: #fff;
			border-bottom: 1rpx solid #e2e3e5;
			.tab{
				width: 33%;
				padding: 0 20rpx;
				text-align: center;
				line-height: 80rpx;
				color: #7b8187;
				display: inline-block;
				box-sizing: border-box;
				span{
					padding-bottom: 16rpx;
					border-bottom: 5rpx solid transparent;
					font-size: 32rpx;
				}
			}
			.tab.active{
				color: #d93731;
				// font-weight: bold;
			}
			.tab.active span{
				border-bottom: 5rpx solid #d03a28;
			}
		}
		.panel{
			background: #fff;
			.cell{
				padding: 20rpx;
				box-sizing: border-box;
			}
			.row{
				padding-left:32rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				.avatar{
					width:80rpx;
					height: 80rpx;
					border-radius: 50%;
					line-height: 80rpx;
					text-align: center;
					color: #FFFFFF;
					font-size: 26rpx;
					background: #d93731;
				}
				.userInfo{
					flex: 1;
					margin-left: 28rpx;
					padding: 16rpx 32rpx 16rpx 0;
					border-bottom: 1rpx solid #e2e3e5;
					.userName{
						color: #333333;
						font-size: 35rpx;
					}
					.dept{
						color: #999999;
						font-size: 26rpx;
					}
				}
			}
		}
		.activityBox{
			padding: 35rpx 55rpx;
		}
		.emptyBox{
			width: 100%;
			height: 324rpx;
			border: 2rpx solid #ebeef6;
			box-shadow: rgba(235, 238, 246, 1) solid 7rpx;
			.imgBox{
				width: 237rpx;
				height: 200rpx;
				margin: 0 auto;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.emptyName{
				text-align: center;
				padding-top: 33rpx;
				color: #999999;
				font-size: 27rpx;
			}
		}
	}
</style>
