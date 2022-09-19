<template>
	<view class="wrapper">
		<!-- <div class="header">
			<div class="tabContainer">
				<tui-tabs :tabs="tabs" color="#333" sliderBgColor="#d24941" selectedColor="#d24941" :currentTab="currentTab" itemWidth="50%" @change="changeTabList"></tui-tabs>
			</div>
		</div> -->
		<div class="center">
			<div class="listWrap">
				<div class="list-item" v-for="item in listData" :key="index">
					<div class="item-left">
						<div class="item-photo">{{item.UserId.userValue.DisplayName}}</div>
					</div>
					<div class="item-right">
						<div class="item-head">
							<span class="item-head-name">{{item.UserId.userValue.DisplayName}}</span>
							<span class="item-head-dept">信息中心</span>
						</div>
						<div class="item-time">
							{{item.ClockedIn.dateTime || ''}}
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
						name: '已签到',
						scope: 1
					},
					{
						name: '未签到',
						scope: 0
					}
				],
				scope: 1,
				currentTab: 0,
				listData:[
					{
						UserId: '张三',
						ClockedIn: '2022-9-9'
					}
				],
				pageNumber: 1,
				pageSize: 10,
				isPage: false
			}
		},
		onLoad(options) {
			this.id = options.id;
			this.getQuery();
		},
		methods: {
			getQuery(){
				var filterQuery = '\nCampaignId\teq\t'+this.id;
				filterQuery += '\nJoinState\teq\t'+this.scope;
				this.$httpWX({
					url: '/entity/fetchall',
					method:'post',
					data:{
						objectTypeCode: 44021,
						filterQuery: filterQuery,
						pageNumber: this.pageNumber,
						pageSize: this.pageSize
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
						result = this.listData.concat(res.returnValue.nodes);
					}
					this.listData = result;
				})
			},
			changeTabList(e){
				this.currentTab = e.index;
				this.scope = this.tabs[e.index].scope;
				this.pageNumber = 1;
				this.getQuery();
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
		   if(this.isPage){
			   this.pageNumber++;
			   this.getQuery();
		   }
		}
	}
</script>

<style>
.search {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 10%;
            height: 50%;
        }
        .search i {
            font-size: 22px;
        }
    .mint-navbar{
        position:fixed;
        top:44px;
        width:100%;
    }
    .item-head-dept{
        font-size:12px;
        color:#999;
    }
    .list-item{
        display:flex;
        padding:5px 10px;
        background-color:white;
        border-top:1px solid #f3f3f3;
    }
    .item-left{
        width:50px;
        height:50px;
    }
    .item-right{
        flex:1;
        margin-left:10px;
    }
    .item-photo{
        background-color:#d24941;
        text-align:center;
        line-height:40px;
        border-radius:50%;
        height:40px;
        color:white;
        width:40px;
        margin:5px;
    }
    .item-time{
        font-size:12px;
        color:#333;
        margin-top:5px;
    }
    .item-head-name{
        margin-top:5px;
		padding-right: 20rpx;
    }
    .item-head{
        margin-top:5px;
    }
    .item-photo a{
        color:#fff;
    }
</style>
