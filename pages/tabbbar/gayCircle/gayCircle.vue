<template>
	<view class="wrapper">
		<view class="container">
			<view class="panelBox">
				<view class="head">
					<view class="avatar">
						党员
					</view>
					<view class="info">
						<p class="name">党员</p>
						<p class="depart">
							描述
							<span class="time">
								18:00
							</span>
						</p>
					</view>
					<view class="arrow_icon" @click="hanldeMore">
						<tui-icon name="arrowdown" :size="24" ></tui-icon>
					</view>
				</view>
				<view class="content">
					<view class="desc">
						无影灯下的天使，在常人看不到的世界里,守护生命！
					</view>
					<view class="imgTemplate">
						<div class="max_img">
							<image class="img" src="/static/images/news/banner_1.jpg" mode="widthFix"></image>
						</div>
						<div class="min_img">
							<image class="img" src="/static/images/news/banner_1.jpg" mode="widthFix"></image>
						</div>
						<view class="list_img">
							<view class="box">
								<image class="img" src="/static/images/news/list_1.jpg" mode="widthFix"></image>
							</view>
							<view class="box">
								<image class="img" src="/static/images/news/list_2.jpg" mode="widthFix"></image>
							</view>
							<view class="box">
								<image class="img" src="/static/images/news/list_3.jpg" mode="widthFix"></image>
							</view>
							<view class="box">
								<image class="img" src="/static/images/news/list_4.jpg" mode="widthFix"></image>
							</view>
							<view class="box">
								<image class="img" src="/static/images/news/list_2.jpg" mode="widthFix"></image>
							</view>
							<view class="box active">
								<image class="img" src="/static/images/news/list_3.jpg" mode="widthFix"></image>
								<view class="mask">
									+
								</view>
							</view>
						</view>
					</view>
					<view class="location">
						<tui-icon name="gps" :size="24" ></tui-icon>
						<span class="gps_text">
							山西长治党建
						</span>
					</view>
				</view>
				<view class="operation">
					<view class="btn">
						<tui-icon name="share" :size="24" ></tui-icon>
						<span>
						转发
						</span>
					</view>
					<view class="btn">
						<tui-icon name="message" :size="24" ></tui-icon>
						<span>
						评论
						</span>
					</view>
					<view class="btn">
						<tui-icon name="agree" :size="24" ></tui-icon>
						<span>
						点赞
						</span>
					</view>
				</view>
			</view>
		</view>
		<tui-actionsheet  
		  :show="showActionSheet" 
		  :item-list="itemList" 
		  @click="handleItem" 
		  @cancel="closeActionSheet">
		</tui-actionsheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showActionSheet: false,
				itemList: [{
					text: "收藏",
					color: "#2B2B2B"
				}, {
					text: "编辑动态",
					color: "#2B2B2B"
				},
				{
					text: "设为置顶动态",
					color: "#2B2B2B"
				},{
					text: "设为分享范围",
					color: "#2B2B2B"
				},
				{
					text: "删除动态",
					color: "#C70C15"
				}]
			}
		},
		methods: {
			hanldeMore(){
				this.showActionSheet = true
			},
			closeActionSheet(){
				this.showActionSheet = false
			},
			handleItem(e){
				let index = e.index;
				switch(index){
					case 0:
						this.$tui.toast({
							text:'收藏',
							success:(res)=>{
								this.showActionSheet = false
							}
						})
						break;
					case 1:
						this.$tui.toast('编辑动态')
						break;
					case 2:
						this.$tui.toast('设置置顶动态')
						break;
					case 3:
						this.$tui.toast('设置分享范围')
						break;
					case 4:
						this.$tui.toast('删除动态') 
						break;
				}
			}
		}
	}
</script>

<style lang="scss">
.wrapper{
	font-size: 24rpx;
	.container{
		.panelBox{
			background: #fff;
			padding: 20rpx;
			margin-top: 20rpx;
			.head{
				display: flex;
				align-items: center;
				.avatar{
					width: 80rpx;
					height: 80rpx;
					line-height: 80rpx;
					text-align: center;
					background: #C70C15;
					border-radius: 50%;
					color: #fff;
					font-size: 28rpx;
				}
				.info{
					margin-left: 20rpx;
					flex: 1;
					.depart{
						color: #999999;
						.time{
							padding-left: 20rpx;
						}
					}
				}
			}
			.content{
				.desc{					
					font-size: 32rpx;
					color: #333333;
					line-height: 1.5;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
					word-wrap: break-word;
					white-space: normal !important;
					padding: 10rpx 0;
				}
				.imgTemplate{
					.max_img{
						width: 100%;
						max-height: 380rpx;
						background: #d4d4d4;
						border-radius: 8rpx;
						margin-bottom: 10rpx;
						.img{
							width: 100%;
							height: 100%;
							vertical-align: top;
							border-radius: 8rpx;
						}
					}
					.min_img{
						width: 460rpx;
						max-height: 274rpx;
						background: #d4d4d4;
						border-radius: 8rpx;
						margin-bottom: 10rpx;
						.img{
							width: 100%;
							height: 100%;
							vertical-align: top;
							border-radius: 8rpx;
						}
					}
					.list_img{
						display: flex;
						justify-content: space-between;
						flex-wrap: wrap;
						.box{
							width: 222rpx;
							max-height: 222rpx;
							border-radius: 8rpx;
							background: #d4d4d4;
							margin-bottom: 10rpx;
							.img{
								width: 100%;
								height: 100%;
								vertical-align: top;
								border-radius: 8rpx;
							}
						}
						.box.active{
							position: relative;
							.mask{
								position: absolute;
								top: 0;
								left: 0;
								width: 100%;
								height: 100%;
								display: flex;
								justify-content: center;
								align-items: center;
								background: rgba(0,0,0,.5);
								font-size: 100rpx;
								border-radius: 8rpx;
								color: #FFFFFF;
							}
						}
					}
				}
				.location{
					max-width: 200rpx;
					display: flex;
					align-items: center;
					padding: 10rpx;
					border-radius: 30rpx;
					border: 1rpx solid #e2e3e5;
					margin-top: 20rpx;
					.gps_text{
						padding-left: 10rpx;
						width: 80%;
						display: inline-block;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
					}
				}
			}
			.operation{
				display: flex;
				justify-content: space-around;
				align-items: center;
				color: #999999;
				margin-top: 20rpx;
				.btn{
					display: flex;
					align-items: center;
					span{
						padding-left: 10rpx;
					}
				}
			}
		}
	}
}
</style>
