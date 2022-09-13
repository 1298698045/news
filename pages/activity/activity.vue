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
					</div>
					<div class="item-body item-img-body">
						<div class="body-right">
							【让孩子远离矮小——“818儿童长高日”免费测骨龄活动开始啦！】
							全国多家医院推出“818儿童长高日”活动今天开始啦，你报名了吗？参与本次活动还可享
							受公立医院权威儿科专家一对一问诊、儿科门诊挂号、免费
							检测骨龄三重福利哟！真正帮助家长们解决生长发育的各真正帮助家长们解决生长发育的各真正帮助家长们解决生长发育的各
				
						</div>
					</div>
					<div class="item-bottom">
						<div>
							<img src="/static/images/activity/02.3.2.Time-sort.png" />
							<span>08月18日 周三 18:00 截止</span>
						</div>
						<div>
							<img src="/static/images/activity/04.5.1.1.Participants.png" />
							<span>{{item.Peoples.length || 0}}人报名</span>
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
						name: '我创建',
						scope: 'own'
					},
					{
						name: '我参加',
						scope: 'join'
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
				})
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
