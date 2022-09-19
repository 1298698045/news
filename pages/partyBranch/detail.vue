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
						<p>
							<span class="name">
								{{item.FullName.textValue || ''}}
							</span>
							{{item.DeptId.lookupValue.displayName || ''}}
						</p>
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
	.wrapper{
		.tabs{
			width: 100%;
			white-space: nowrap;
			overflow: hidden;
			background: #fff;
			.tab{
				width: 33%;
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
				color: #d24941;
				font-weight: bold;
			}
			.tab.active span{
				border-bottom: 5rpx solid #d24941;
			}
		}
		.panel{
			background: #fff;
			margin: 20rpx 0;
			.cell{
				padding: 20rpx;
				box-sizing: border-box;
			}
			.row{
				padding: 20rpx;
				box-sizing: border-box;
				border-bottom: 1rpx solid #E2E3E5;
				.name{
					display: inline-block;
					min-width: 200rpx;
				}
			}
		}
	}
</style>
