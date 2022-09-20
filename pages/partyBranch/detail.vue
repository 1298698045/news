<template>
	<view class="wrapper">
		<div class="header">
			<view class="tabs">
				<view class="tab" @click="changeTab(item,index)" :class="{'active':currentIdx==index}" v-for="(item,index) in tabs" :key="index">
					<span>
						{{item.name}}
					</span>
				</view>
			</view>
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
				<div class="emptyBox">
					<div class="imgBox">
						<img src="/static/images/activity/empty.png" alt="">
					</div>
					<div class="emptyName">
						没有支部活动
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
				isPage: false
			}
		},
		onLoad(options){
			this.id = options.id;
			this.deptId = options.deptId;
			this.getDetail();
		},
		methods: {
			changeTab(item,index){
				this.currentIdx = index;
				if(index==1){
					this.getPartyPeople();
				}
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
						filterquery: '\nPartyUnitId\teq\t'+this.id
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
		}
	}
</script>

<style lang="scss">
	page{
		background: #fff;
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
				border-bottom: 5rpx solid #d24941;
			}
		}
		.panel{
			background: #fff;
			.cell{
				padding: 20rpx;
				box-sizing: border-box;
			}
			.row{
				padding: 16rpx 32rpx;
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
					margin-left: 28rpx;
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
