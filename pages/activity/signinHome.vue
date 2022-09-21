<template>
	<view class="wrapper">
		<div class="container">
			<div class="content">
				<div class="row">
					<p class="time">
						{{date}}
					</p>
					<p class="btn" @click="getSetting">设置</p>
				</div>
				<div class="row">
					<p class="location">{{address}}</p>
					<p class="btn" @click="getChooseLocation">地点微调</p>
				</div>
				<div class="map_wrap">
					<map class="map" id="map"
						:longitude="longitude"
						:latitude="latitude"
						scale="14"
						:markers="markers"
						@markertap="markertap"
						show-location></map>
				</div>
			</div>
			<div class="signin">
				<div class="sigin-btn" @click="ClockinStatus==1?signOut():signIn()">
					<div class="sigin-btn-text">{{ClockinStatus==1?'签退':'签到'}}</div>
					<div class="sigin-btn-time">{{time}}</div>
				</div>
				<div class="sigin-status">
					<img class="iconimg" src="/static/images/activity/02.1.1.1.Select.png"/>
					今日你还未签到
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import QQMapWX from '@/utils/qqmap-wx-jssdk.js';
	var qqmapsdk = new QQMapWX({
	    key: 'UVRBZ-UN2WU-KMJV6-2DAPJ-JW5QE-C5BYC' // 必填
	});
	export default {
		data() {
			return {
				timer: null,
				time: "",
				value:"",
				latitude:"23.099994",
				longitude:"113.324520",
				address:"",
				markers: [
					{
						iconPath: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpng.pngtree.com%2Felement_our%2Fmd%2F20180515%2Fmd_5afb0cf7bd445.jpg&refer=http%3A%2F%2Fpng.pngtree.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614737020&t=493beae22e91c67fa4d97219590bff4c',
						id: 0,
						latitude: 23.099994,
						longitude: 113.324520,
						width: 30,
						height: 30
					}
				],
				date:"",
				paramsTime:"",
				startTime:"",
				qty:"",
				list:[],
				BuildingName:"", //标志性建筑物
				id: '',
				dateTime: '',
				ClockinStatus: ''
			}
		},
		mounted() {
			this.timer = setInterval(()=> {
				this.time = this.timestr();
			}, 1000);
		},
		destroyed() {
			this.timer = null;
		},
		onLoad(options){
			this.id = options.id;
			this.ClockinStatus = options.ClockinStatus;
			this.getLocation();
			this.getIsSign();
		},
		methods:{
			getIsSign(){
				this.$httpWX({
					url: '/campaignpeople/state',
					method:'get',
					data:{
						campaignId: this.id
					}
				}).then(res=>{
					console.log(res);
					if(res.returnValue.ClockinStatus=='True'){
						this.signObj.ClockinStatus = 1;
					}
				})
			},
			signIn(){
				this.$httpWX({
					method: 'post',
					url: '/campaign/clockin',
					data: {
						CampaignId: this.id,
						ClockedIn: this.dateTime,
						ClockinLocation: this.address,
						ClockInLatitude: this.latitude,
						ClockInLongitude: this.longitude,
						ClockinIP: '',
						ClockinStatus: 1,
						BuildingName: this.BuildingName
					}
				}).then(res=>{
					console.log(res,'res');
					this.getIsSign();
					uni.navigateBack({
						delta:1
					})
				})
			},
			// 签退
			signOut(){
				this.$httpWX({
					method: 'post',
					url: '/campaign/clockout',
					data: {
						CampaignId: this.id,
						ClockedOut: this.dateTime,
						ClockinLocation: this.address,
						ClockInLatitude: this.latitude,
						ClockInLongitude: this.longitude,
						ClockinIP: '',
						ClockinStatus: 2,
						BuildingName: this.BuildingName
					}
				}).then(res=>{
					console.log(res,'res')
					this.getIsSign();
					uni.navigateBack({
						delta:1
					})
				})
			},
			// 获取当前位置经纬度
			handleLoacation(toast) {
				let that = this;
				wx.getLocation({
					type: 'gcj02',
					success: res => {
						console.log('success',res);
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						let latitude = res.latitude;
						let longitude = res.longitude;
						that.markers = [
							{
								iconPath: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpng.pngtree.com%2Felement_our%2Fmd%2F20180515%2Fmd_5afb0cf7bd445.jpg&refer=http%3A%2F%2Fpng.pngtree.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614737020&t=493beae22e91c67fa4d97219590bff4c',
								id: 0,
								latitude: res.latitude,
								longitude: res.longitude,
								width: 30,
								height: 30
							}
						]
						qqmapsdk.reverseGeocoder({
							location:{
								latitude:latitude,
								longitude:longitude
							},
							success:res=>{
								console.log(res,'res')
								that.address = res.result.address;
								that.BuildingName = res.result.formatted_addresses.recommend;
							}
						})
					},
					fail: err => {
						// 判断是否获取到了定位
						// this.isLocation = false
						
						// 根据不同需求做了两种类型提示，需要根据实际业务修改
						if (toast) {
							// this.$u.toast是用的框架里封装的弹出消息
							wx.showToast({
								title:"您已拒绝授权，相关功能会无法使用！"
							})
							return
						}
						//用户已授权，但是获取地理位置失败，提示用户去系统设置中打开定位
						wx.showModal({
							title: '提示',
							content: '请在系统设置中打开定位服务，重新进入小程序！'
						})
					}
				})
			},
			getLocation(){
				wx.getSetting({
					success:res=>{
						if (res.authSetting['scope.userLocation'] === true) {
							console.log('已经授权，非第一次')
							//授权后默认加载，直接获取定位
							this.handleLoacation()
						}else if (res.authSetting['scope.userLocation'] === undefined) {
							// 如果用户是第一次登陆且未授权的情况，会直接弹窗请求授权
							// 使用 getlocation 获取用户 经纬度位置
							console.log('第一次登陆且未授权')
							this.handleLoacation(true)
						}else if (res.authSetting['scope.userLocation'] !== undefined && res.authSetting['scope.userLocation'] !== true) {
							console.log('不是第一次进入该页面,且未授权')
							wx.showModal({
								title: '是否授权当前位置',
								content: '需要获取您的地理位置，请确认授权，否则无法相关功能！',
								success: res => {
									//如果点击取消则显示授权失败
									if (res.cancel) {
										this.$u.toast('您已拒绝授权!')
									}
									//如果点击确定会打开授权页请求二次授权
									else if (res.confirm) {
										wx.openSetting({
											success: dataAu => {
												if (dataAu.authSetting['scope.userLocation'] === true) {
												   wx.showToast({
													   title:'授权成功!'
												   })
													//再次授权，调用getLocationt的API
													this.handleLoacation()
												} else {
													// this.isLocation = false
													 wx.showToast({
														title:'授权失败!'
													})
												}
											}
										})
									}
								}
							})
						}
					},
					fail: err => {
						// this.isLocation = false
						wx.showModal({
							title: '提示',
							content: '未知错误，请重新打开小程序！'
						})
					}
				})
			},
			getChooseLocation(){
				let that = this;
				wx.chooseLocation({
					success:res=>{
						that.Name = res.name;
						that.address = res.address;
						that.latitude = res.latitude;
						that.longitude = res.longitude;
						that.markers = [
							{
								iconPath: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpng.pngtree.com%2Felement_our%2Fmd%2F20180515%2Fmd_5afb0cf7bd445.jpg&refer=http%3A%2F%2Fpng.pngtree.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1614737020&t=493beae22e91c67fa4d97219590bff4c',
								id: 0,
								latitude: res.latitude,
								longitude: res.longitude,
								width: 30,
								height: 30
							}
						]
					},fail(){
	
					}
				})
			},
			timestr(){
				var date = new Date();
				var yearTime = date.getFullYear(); //年
				var monthTime =
				  date.getMonth() + 1 < 10
					? "0" + (date.getMonth() + 1)
					: date.getMonth() + 1; //月
				var dayTime = date.getDate() < 10 ? "0" + date.getDate() : date.getDate(); //日
				var hoursTima =
				  date.getHours() < 10 ? "0" + date.getHours() : date.getHours(); //时
				var minvteTime =
				  date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); //分
				var secondTime =
				  date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); //秒
				var nowdatassss =
				  yearTime +
				  "-" +
				  monthTime +
				  "-" +
				  dayTime +
				  "--" +
				  hoursTima +
				  ":" +
				  minvteTime +
				  ":" +
				  secondTime;
				nowdatassss = nowdatassss;
				yearTime = yearTime.toString();//年
				monthTime = monthTime.toString();
				dayTime = dayTime.toString();
				hoursTima = hoursTima.toString();
				minvteTime = minvteTime.toString();
				secondTime = secondTime.toString();
				this.date = `${yearTime}年${monthTime}月${dayTime}日`;
				let time = `${hoursTima}:${minvteTime}:${secondTime}`;
				this.dateTime = `${yearTime}-${monthTime}-${dayTime} ${hoursTima}:${minvteTime}:${secondTime}`;
				return time;
			}
		}
	}
</script>

<style lang="scss">
	.content{
	            background: #fff;
	            padding: 0 32rpx;
	            .row{
	                display: flex;
	                justify-content: space-between;
	                align-items: center;
	                padding: 34rpx 0;
	                .time{
	                    font-size: 24rpx;
	                    color: #999999;
	                }
	                .btn{
	                    font-size: 28rpx;
	                    color: #d03a28;
	                }
	                .location{
	                    font-size: 35rpx;
	                    color: #333333;
	                }
	            }
	            .map_wrap{
	                padding-bottom: 25rpx;
	                .map{
	                    width: 100% !important;
	                }
	            }
	            .row_box{
	                display: flex;
	                justify-content: space-between;
	                align-items: center;
	                padding:25rpx 0;
	                .label{
	                    font-size: 35rpx;
	                    color: #333333;
	                }
	                .placeholder{
	                    font-size: 28rpx;
	                    color: #cccccc;
	                }
	                input{
	                    font-size: 28rpx;
	                }
	                .icon{
	                    font-size: 28rpx;
	                    color: #3399ff;
	                }
	            }
	        }
 .search {
            position: absolute;
            left: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 10%;
            height: 50%;
        }
        .search i {
            font-size: 22px;
        }
    #vueapp{
        background-color:white;
    }
   .time{
       padding:10px;
       font-size:12px;
       color:#999;
       float:left;
       padding-bottom: 5px;
   }
   .iconimg{
       width:12px;
       height:12px;
       margin-right:3px;
       position:relative;
       top:1px;
   }
   .editlocation{
       color:#3399ff;
       float:right;
       font-size:12px;

   }
   .signin{
       text-align:center;
   }
   .sigin-btn{
       width:130px;
       height:130px;
       border-radius:50%;
       background-color:#edb76c;
   }
   .signin{
       color:#ffffff;
       background-color:#f2f2f2;
       height: 100%;
   }
   .sigin-btn{
       overflow:hidden;
       display:inline-block;
       margin-top:70px;
   }
   .sigin-btn-time{
       font-size:22px;
   }
   .sigin-btn-text{
       opacity:0.6;
       margin:30px 0 10px 0;
   }
   .sigin-status{
       font-size:12px;
       color:#333;
       margin-top:5px;
   }
   .map{
       margin:10px;
       height:130px;
       background-color:#f2f2f2;
   }
   .map #allmap{
       height:130px;
   }
   .van-nav-bar .van-icon{
    color:#333333;
    font-size:20px;
}
.van-nav-bar__text{
    color:#333333;
    font-size:17px;
}
</style>
