<template>
	<view class="wrapper">
		<div class="content">
			<div class="title">
				<input type="text" v-model="title" class="inp" placeholder-class="placeholder" placeholder="填写标题(选填)">
			</div>
			<div class="desc">
				<textarea class="textarea" placeholder-class="textareaPlace"
				 maxlength="1000"
				 v-model="comment"
				 value="" placeholder="说点什么吧~" />
			</div>
			<div class="photos">
				<van-uploader :file-list="fileList" @afterRead="afterRead" :max-count="9" @delete="getDelete" />
			</div>
			<tui-list-view color="#777">
				<tui-list-cell class="cell" arrow @click="handleChoiceCircle">
					<view class="text">
						<view class="label">
							归属圈子
						</view>
						<view class="value">
							{{circle.name || '请选择'}}
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell class="cell" arrow @click="handleOpenLocation">
					<view class="text">
						<view class="label">
							位置
						</view>
						<view class="value">
							{{location || '请选择位置'}}
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
							<tui-icon name='circle-fill' size='24' v-if="isNotice" color="#d24941"></tui-icon>
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
				<div class="btn send" :class="{'active':isPhoneX}" @click="handleSubmit()">
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
				serverUrl:'',
				limit: 9, // 限制图片数量
				isNotice: true,
				isPhoneX:this.$tui.isPhoneX(),
				title:'',
				comment: '',
				groupId: '',
				location:'',
				latitude:'',
				longitude:'',
				fileList:[]
			}
		},
		onLoad(){
			
		},
		computed:{
			circle(){
				return this.$store.state.circle.circle;
			},
			token(){
				return uni.getStorageSync('wechatAuthToken');
			}
		},
		methods: {
			handleOpenLocation(){
				let that = this;
				uni.chooseLocation({
					success:res=>{
						that.location = res.address;
						that.latitude = res.latitude;
						that.longitude = res.longitude;
					}
				})
			},
			// 上传完成
			afterRead(e){
				console.log(e);
				let that = this;
				const { file } = e.mp.detail;
				this.fileList.push({url:file.url,name:Math.floor(Math.random() * (100 - 1)) + 1});
			},
			getDelete(e){
				let idx = e.mp.detail.index;
				this.fileList.splice(idx,1);
			},
			uploadFile(chatId){
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let idx = 0;
				let that = this;
				for(let i=0; i < that.fileList.length; i++){
					wx.uploadFile({
						url: 'http://112.126.75.65:10002/api/MomentsContent/Moments/contentreleasepic',
						filePath: that.fileList[i].url,
						name: 'file',
						formData: { 
							// Token: this.token,
							// Title: this.title,
							// Comment: this.comment,
							// GroupId: this.circle.itemId || '',
							// Longitude: this.longitude,
							// Latitude: this.latitude,
							// Location: this.location
							ChatId:chatId
						},
						success(res) {
							console.log(res);
							const data = JSON.parse(res.data);
							console.log(data);
							if(i==that.fileList.length-1 && data.returnValue){
								const callback = () =>{
									uni.navigateBack({
										delta:1
									})
								}
								that.$tui.toast({
									text:'发送成功',
									success:res=>{
										callback();
									}
								})
							}
						}
					});
				}
			},
			handleNotice(){
				this.isNotice = !this.isNotice;
			},
			// 选择圈子
			handleChoiceCircle(){
				uni.navigateTo({
					url:'/pages/gayCircle/circle/circle'
				})
			},
			handleSubmit(){
				if(this.comment==''){
					this.$tui.toast({
						text:'请输入内容！'
					})
				}else {
					// let obj = {
					// 	Token: this.token,
					// 	Title: this.title,
					// 	Comment: this.comment,
					// 	GroupId: this.circle.itemId || '',
					// 	Longitude: this.longitude,
					// 	Latitude: this.latitude,
					// 	Location: this.location
					// }
					// let data = '';
					// for(let key in obj){
					// 	data+=
					// 		'\r\nContent-Disposition: form-data; name="'+key+'"' +
					// 		'\r\n' +
					// 		'\r\n'+obj[key]+
					// 		'\r\n--XXX' 
					// }
					// data+='--';
					this.$http.submitGayCircleSend({
						Token: this.token,
						Title: this.title,
						Comment: this.comment,
						GroupId: this.circle.itemId || '',
						Longitude: this.longitude,
						Latitude: this.latitude,
						Location: this.location
					}).then(res=>{
						console.log(res);
						if(res.returnValue){
							this.$store.commit('setCircle',{})
							let chatId = res.returnValue;
							const callback = () =>{
								uni.navigateBack({
									delta:1
								})
							}
							this.$tui.toast({
								text:'发送成功',
								success:res=>{
									callback();
								}
							})
							if(this.fileList.length>0){
								this.uploadFile(chatId)
							}
						}
					})
				}
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
					color: #d24941;
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
				color: #d24941;
			}
			.btn.send{
				background: #d24941;
				color: #FFFFFF;
			}
			.btn.active{
				padding-bottom: 30rpx;
			}
		}
	}
}
</style>
