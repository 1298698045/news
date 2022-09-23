<template>
	<view class="wrapper">
		<div class="stydyBd">
			<header>				
				<div class="subject">
					答题练习
				</div>
				<div class="desc">坚持练习掌握优质内容</div>
			</header>
			<div class="cloumn">
				<div class="itemBox" v-for="(item,index) in listData" :key="index" @click="handelDetail(item)">
					<div class="imgs">
						
					</div>
					<div class="itemTitle">{{item.Name.value || ''}}</div>
					<div class="itemDesc">太阳每天都是新的</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: []
			}
		},
		onLoad(){
			this.getQuery();
		},
		methods: {
			getQuery(){
				var filterquery = '';
				this.$httpWX({
					url: '/entity/fetchall',
					method: 'post',
					data: {
						objectTypeCode: 50713,
						filterquery: filterquery
					}
				}).then(res=>{
					console.log(res);
					this.listData = res.returnValue.nodes;
				})
			},
			handelDetail(item){
				uni.navigateTo({
					url:'../practice/practiceClass/practiceClass?id='+item.id
				})
			},
		},
		
	}
</script>

<style lang="scss">
.stydyBd{
	padding: 30rpx;
	header{		
		.subject{
			font-size: 32rpx;
			color: #333;
			font-weight: bold;
		}
		.desc{
			color: #999999;
			font-size: 28rpx;
			line-height: 2;
		}
	}
	.cloumn{
		display: flex;
		margin: 30rpx 0;
		justify-content: space-between;
		text-align: center;
		flex-wrap: wrap;
		.itemBox{
			width: 31%;
			height: 300rpx;
			background: #fff;
			border-radius: 10rpx;
			padding: 0 20rpx;
			box-sizing: border-box;
			margin-top: 25rpx;
			.imgs{
				width: 80rpx;
				height: 80rpx;
				background: #D03A28;
				border-radius: 50%;
				margin: 30rpx auto;
			}
			.itemTitle{
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
			}
			.itemDesc{
				font-size: 28rpx;
				color: #999999;
				line-height: 1.5;
			}
		}
	}
}
</style>
