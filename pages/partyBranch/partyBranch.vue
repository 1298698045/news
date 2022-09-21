<template>
	<view class="wrapper">
		<div class="header">
			<van-search background="#d03a28" shape="round" v-model="searchVal" placeholder="搜索" @change="changeSearch" />
		</div>
		<div class="center">
			<div class="listWrap">
				<div class="listItem" v-for="(item,index) in listData" :key="index" @click="handleDetail(item)">
					<div class="l">						
						<p>{{item.Name.textValue || ''}}</p>
						<p class="userName">{{item.CreatedByName.textValue || '暂无'}}</p>
					</div>
					<div class="r">
						<tui-icon name="arrowright" size="24"></tui-icon>
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
				searchVal: '',
				listData: [],
				pageNumber: 1,
				pageSize: 20
			}
		},
		onLoad() {
			this.getQuery();
		},
		methods: {
			changeSearch(e){
				this.searchVal = e.detail;
				this.pageNumber = 1;
				this.getQuery();
			},
			getQuery(){
				this.$httpWX({
					url: '/entity/fetchall',
					method:'post',
					data:{
						objectTypeCode: 31300,
						search: this.searchVal,
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
			handleDetail(item){
				uni.navigateTo({
					url:'detail?id='+item.id+'&deptId='+item.BusinessUnitId.lookupValue.value
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
		   if(this.isPage){
			   this.pageNumber++;
			   this.getQuery();
		   }
		}
	}
</script>
	
<style lang="scss">
.header{
	background: #d93731;
}
.listWrap{
	.listItem{
		border-top:1rpx solid #eceeed;
		padding: 30rpx;
		box-sizing: border-box;
		background: #fff;
		margin: 30rpx;
		box-shadow: 0px 0px 23px 0px rgba(0, 0, 0, 0.05);
		border-radius: 8rpx;
		font-size: 34rpx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.userName{
			font-size: 27rpx;
			color: #7b8187;
			font-weight: normal;
		}
	}
}
</style>
