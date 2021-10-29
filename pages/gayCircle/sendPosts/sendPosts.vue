<template>
	<view class="wrapper">
		<div class="content">
			<div class="title">
				<input type="text" class="inp" placeholder-class="placeholder" placeholder="填写标题(选填)">
			</div>
			<div class="desc">
				<textarea class="textarea" placeholder-class="textareaPlace"
				 maxlength="1000"
				 value="" placeholder="说点什么吧~" />
			</div>
			<div class="photos">
				<tui-upload :value="imgs" :serverUrl="serverUrl" :limit="limit" @complete="uploadResult" @remove="removeImg"></tui-upload>
			</div>
			<tui-list-view color="#777">
				<tui-list-cell class="cell" arrow>
					<view class="text">
						<view class="label">
							归属圈子
						</view>
						<view class="value" @click="handleChoiceCircle">
							请选择
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell" @click="handleNotice">
					<view class="row">
						<div class="left">							
							<view class="label">
								消息通知
							</view>
							<view class="desc">
								及时接收帖子被回复、点赞、收藏提醒
							</view>
						</div>
						<div class="icon">
							<tui-icon name='circle-fill' size='24' v-if="isNotice" color="#C70C15"></tui-icon>
							<tui-icon name='circle' size='24' v-else></tui-icon>
						</div>
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell">
					<view class="row">
						<div class="left">							
							<view class="label">
								我要 <span>发布文章</span>
							</view>
							<view class="desc">
								工作生活感悟、油料文章、快来分享你的护理工作心得~
							</view>
						</div>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</div>
		<div class="footer">
			<div class="box">
				<div class="btn save" :class="{'active':isPhoneX}">
					保存
				</div>
				<div class="btn send" :class="{'active':isPhoneX}">
					发布
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgs:[],
				serverUrl:'',
				limit: 9, // 限制图片数量
				isNotice: true,
				isPhoneX:this.$tui.isPhoneX()
			}
		},
		onLoad(){
			
		},
		methods: {
			// 上传完成
			uploadResult(e){
				console.log(e)
			},
			removeImg(e){
				console.log(e)
			},
			handleNotice(){
				this.isNotice = !this.isNotice;
			},
			// 选择圈子
			handleChoiceCircle(){
				uni.navigateTo({
					url:'/pages/gayCircle/circle/circle'
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #FFFFFF;
	padding-bottom: 180rpx;
}
.wrapper{
	.content{
		padding: 0 20rpx;
		.title{
			padding: 20rpx 0;
			.inp{
				width: 100%;
				height: 60rpx;
				line-height: 60rpx;
				font-weight: bold;
				font-size: 32rpx;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
			.placeholder{
				color: #999999;
			}
		}
		.desc{
			.textarea{
				width: 100%;
				font-size: 28rpx;
				height: 200rpx;
				overflow-y: auto;
			}
			.textareaPlace{
				color: #999999;
			}
		}
		.photos{
			margin: 30rpx 0;
		}
		.cell .text{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.value{
				color: #999999;
				padding-right: 30rpx;
			}
		}
		.row{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.label{
				span{
					color: #C70C15;
					padding-left: 10rpx;
				}
			}
			.desc{
				font-size: 24rpx;
				color: #999999;
				line-height: 1.5;
			}
		}
	}
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		background: #fff;
		box-shadow: 0 2rpx 10rpx 0 rgba(0,0,0,.3);
		.box{
			display: flex;
			.btn{
				flex: 1;
				line-height: 100rpx;
				font-size: 32rpx;
				text-align: center;
			}
			.btn.save{
				background: #FFFFFF;
				color: #C70C15;
			}
			.btn.send{
				background: #C70C15;
				color: #FFFFFF;
			}
			.btn.active{
				padding-bottom: 50rpx;
			}
		}
	}
}
</style>
