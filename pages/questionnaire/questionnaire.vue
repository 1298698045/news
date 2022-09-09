<template>
	<view class="wrapper">
		<div class="header">
			<div class="tabContainer">
				<tui-tabs :tabs="tabs" color="#333" sliderBgColor="#d24941" selectedColor="#d24941" :currentTab="currentTab" itemWidth="50%" @change="changeTab"></tui-tabs>
			</div>
		</div>
		<div class="center" v-for="(item,index) in list" :key="index" @click="getDetail(item)">
			<div class="content">
				<div class="row">
					<div class="Avatar">{{item.newName || ''}}</div>
					<div class="info_r">
						<p class="name">
							{{item.CreatedByName || ''}}
						</p>
						<p class="text">
							{{item.DeptName || ''}}   {{item.time || ''}}
						</p>
					</div>
				</div>
				<div class="title">{{item.Name}}</div>
				<div class="box">
					<p class="time">
						<i class="iconfont icon-shijian-copy"></i>
						{{item.endTime}} 截止</p>
					<p class="num">
						<i class="iconfont icon-canyuren"></i>
						<span class="active">{{item.NumOfResponses || ''}}</span>
						<span>&nbsp;/&nbsp;{{item.NumOfInvitationsSent || ''}}</span>
						<!-- {{item.NumOfResponses+'/'+item.NumOfInvitationsSent}} -->
					</p>
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
						name: '待填写'
					},
					{
						name: '我创建'
					},
					{
						name: '历史问卷'
					}
				],
				currentTab: 0,
				scope:0,
				pageNumber:1,
				pageSize:25,
				list:[
					{
						CreatedByName: '张三',
						newName: '张三',
						DeptName: '信息科',
						time: '2022-9-9',
						endTime: '2022-9-9',
						NumOfResponses: 1,
						NumOfInvitationsSent: 2,
						Name: '问卷名称'
					}
				],
				isPage: false,
				isMoreShow: false
			}
		},
		methods: {
			changeTab(e){
				this.currentTab = e.index;
			},
			getDetail(){
				uni.navigateTo({
					url:"detail"
				})
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageNumber = 1;
			wx.stopPullDownRefresh();
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
		   
		}
	}
</script>

<style lang="scss">
.center{
	.content{
		padding: 0 33rpx 34rpx 33rpx;
		background: #fff;
		margin-top: 21rpx;
		.row{
			display: flex;
			align-items: center;
			padding: 30rpx 0;
			.Avatar{
				width: 75rpx;
				height: 75rpx;
				line-height: 75rpx;
				text-align: center;
				border-radius: 50%;
				background: #d24941;
				color: #fff;
				font-size: 24rpx;
			}
			.info_r{
				flex: 1;
				margin-left: 25rpx;
				.name{
					font-size: 29rpx;
					color: #333333;
					padding-bottom: 21rpx;
				}
				.text{
					font-size: 22rpx;
					color: #999999;
				}
			}
		}
		.title{
			font-size: 33rpx;
			color: #333333;
			font-weight: bold;
		}
		.box{
			display: flex;
			padding: 28rpx 21rpx;
			align-items: center;
			background: #f8f8f8;
			margin-top: 28rpx;
			justify-content: space-between;
			p{
				font-size: 24rpx;
				color: #999999;
				display: flex;
				align-items: center;
				i{
					margin-right: 10rpx;
				}
			}
			.num{
				display: flex;
				margin-left: 20rpx;
				align-items: center;
				span{
					font-size: 24rpx;
					color: #999999;
				}
				.active{
					font-size: 35rpx;
					color: #d24941;
					font-weight: bold;
				}
			}
		}
	}
}
</style>
