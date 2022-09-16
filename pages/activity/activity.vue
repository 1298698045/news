<template>
	<div class="wrapper">
		<div class="header">
			<tui-tabs :tabs="tabs" color="#333" sliderBgColor="#d24941" selectedColor="#d24941" :currentTab="currentTab" itemWidth="50%" @change="changeTab"></tui-tabs> 
		</div>
		<div class="center">
			<div class="listWrap">
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
</template>

<script>
	export default {
		data(){
			return {
				tabs: [
					{
						name: '全部',
						scope: 'all'
					},
					{
						name: '我参加',
						scope: 'join'
					},
					{
						name: '我创建',
						scope: 'own'
					}
				],
				currentTab: 0,
				isLoading: false,
				scope: 'all',
				pageNumber: 1,
				pageSize: 10,
				listData: [],
				isBook: false
			}
		},
		onLoad() {
			this.getQuery();
		},
		methods:{
			getQuery(){
				this.$http.getActivityList({
					scope: this.scope,
					PageNumber: this.pageNumber,
					PageSize: this.pageSize
				}).then(res=>{
					console.log(res);
					let total = res.total;
					if(this.pageNumber * this.pageSize < total){
						this.isBook = true;
					}else {
						this.isBook = false;
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
			changeTab(e){
				console.log(e)
				this.currentTab = e.index;
				this.scope = this.tabs[e.index].scope;
				this.pageNumber = 1;
				this.getQuery();
			},
			toview(item){
				uni.navigateTo({
					url: 'activityDetail?id='+item.CampaignId
				})
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageNumber = 1;
			this.getQuery();
			wx.stopPullDownRefresh();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
		   if(this.isBook){
			   this.pageNumber++;
			   this.getQuery();
		   }
		}
	}
</script>
<style lang="scss">
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
</style>
