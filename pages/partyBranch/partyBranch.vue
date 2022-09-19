<template>
	<view class="wrapper">
		<div class="header">
			<van-search v-model="searchVal" placeholder="请输入搜索关键词" @change="changeSearch" />
		</div>
		<div class="center">
			<div class="listWrap">
				<div class="listItem" v-for="(item,index) in listData" :key="index" @click="handleDetail(item)">
					<p>{{item.Name.textValue || ''}}</p>
					<p class="userName">{{item.CreatedByName.textValue || ''}}</p>
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
.listWrap{
	background: #fff;
	.listItem{
		min-height: 100rpx;
		border-top:1rpx solid #eceeed;
		padding: 30rpx;
		box-sizing: border-box;
	}
}
</style>
