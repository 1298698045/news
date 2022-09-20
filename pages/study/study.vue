<template>
	<view class="wrapper">
		<div class="header">			
			<div class="cover">
				<div class="leftImg">
					<image class="img" width="100%" height="100%" :src="pathUrl+detail.ImageUrl.value" mode="aspectFill"></image>
				</div>
				<div class="rightInfo">					
					<div class="title">
						{{detail.Name.value || ''}}
					</div>
					<div class="duty">
						{{detail.Writer.value || '前端专家'}}
					</div>
				</div>
			</div>
			<div class="statistics">
				<div class="boxWrap">
					<div class="boxItem">
						<p class="th">内容</p>
					</div>
					<div class="boxItem">
						<p class="th">课程难度</p>
						<p class="td">进阶</p>
					</div>
					<div class="boxItem">
						<p class="th">时常</p>
						<p class="td">1小时</p>
					</div>
					<div class="boxItem">
						<p class="th">学习人数</p>
						<p class="td">100人</p>
					</div>
					<div class="boxItem">
						<p class="th">评价</p>
						<p class="td">10.00分</p>
					</div>
				</div>
			</div>
			<div class="d-tabs" :class="{'fixedActive':isFixed}" id="d-tabs">
				<p class="d-tab" :class="{'active':currIndex==0}" @click="handleTab(0)">
					<span>
						简介
					</span>
				</p>
				<p class="d-tab" :class="{'active':currIndex==1}" @click="handleTab(1)">
					<span>
						目录
					</span>
				</p>
				<p class="d-tab" :class="{'active':currIndex==2}" @click="handleTab(2)">
					<span>
						评价
					</span>
				</p>
				<p class="d-tab" :class="{'active':currIndex==3}" @click="handleTab(3)">
					<span>
						推荐
					</span>
				</p>
			</div>
		</div>
		<div class="center">
			<div class="container">
				<swiper class="d-swiper-box" :current="currIndex" @change="changeSwiper" :style="{height:swiperHeight}">
					<swiper-item class="swiperItem">
						<Introduce class="catalogue_0" :description='detail.Description.value' :courseId="courseId" v-if="currIndex==0" />
					</swiper-item>
					<swiper-item>
						<Catalogue class="catalogue_1" :courseId="courseId" v-if="currIndex==1" :list="catalogueList" />
					</swiper-item>
					<swiper-item>
						<Evaluate class="catalogue_2" :courseId="courseId" v-if="currIndex==2" />
					</swiper-item>
					<swiper-item>
						<Recommend class="catalogue_3" v-if="currIndex==3" :list="detail.courseBases" />
					</swiper-item>
				</swiper>
			</div>
		</div>
		<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">
			<view class="icon" @click="FavorSubject">
				<view class="cuIcon-cu-image">
					<text class="lg cuIcon-favor" :class="[IsFavorite?'text-red':'text-gray']" style="font-size: 20px;"></text>
				</view>
				<view  :class="[IsFavorite?'text-red':'text-gray']">{{IsFavorite?'取消收藏':'收藏'}}</view>
			</view>
			<div class="submit">
				<p class="btn">立即学习</p>
			</div>
		</view>
	</view>
</template>

<script>
	import Introduce from '@/components/study/introduce.vue';
	import Catalogue from '@/components/study/catalogue.vue';
	import Evaluate from '@/components/study/evaluate.vue';
	import Recommend from '@/components/study/recommend.vue';
	import CourseBox from '@/components/study/courseBox.vue';
	export default {
		components:{
			Introduce,
			Catalogue,
			Evaluate,
			Recommend,
			CourseBox
		},
		data() {
			return {
				pathUrl:'http://112.126.75.65:10002',
				currIndex:0,
				swiperHeight:'',
				isFixed: false,
				userFavor:'',
				tempHeight:'',
				courseId: '',
				detail:{},
				catalogueList:[
					{
						name:'入门SpringBoot2.x',
						children:[
							{
								name:'1-1 SpringBoot2.x入门介绍',
								children:[
									{
										name:'1-1 SpringBoot2.x入门介绍'
									},
									{
										name:'1-2 SpringBoot2.x入门介绍'
									},
									{
										name:'1-3 SpringBoot2.x入门介绍'
									},
								]
							},
							{
								name:'1-2 SpringBoot2.x入门介绍'
							},
							{
								name:'1-3 SpringBoot2.x入门介绍'
							},
						]
					},
					{
						name:'SpringBoot 核心功能讲解',
						children:[
							{
								name:'1-1 SpringBoot2.x入门介绍'
							},
							{
								name:'1-2 SpringBoot2.x入门介绍'
							},
							{
								name:'1-3 SpringBoot2.x入门介绍'
							},
						]
					},
					{
						name:'SpringBoot 数据层操作',
						children:[
							{
								name:'1-1 SpringBoot2.x入门介绍'
							},
							{
								name:'1-2 SpringBoot2.x入门介绍'
							},
							{
								name:'1-3 SpringBoot2.x入门介绍'
							},
						]
					},
					{
						name:'SpringBoot 数据层操作',
						children:[
							{
								name:'1-1 SpringBoot2.x入门介绍'
							},
							{
								name:'1-2 SpringBoot2.x入门介绍'
							},
							{
								name:'1-3 SpringBoot2.x入门介绍'
							},
						]
					},
					{
						name:'SpringBoot 数据层操作',
						children:[
							{
								name:'1-1 SpringBoot2.x入门介绍'
							},
							{
								name:'1-2 SpringBoot2.x入门介绍'
							},
							{
								name:'1-3 SpringBoot2.x入门介绍'
							},
						]
					},
					{
						name:'SpringBoot 数据层操作',
						children:[
							{
								name:'1-1 SpringBoot2.x入门介绍'
							},
							{
								name:'1-2 SpringBoot2.x入门介绍'
							},
							{
								name:'1-3 SpringBoot2.x入门介绍'
							},
						]
					},
					{
						name:'SpringBoot 数据层操作',
						children:[
							{
								name:'1-1 SpringBoot2.x入门介绍'
							},
							{
								name:'1-2 SpringBoot2.x入门介绍'
							},
							{
								name:'1-3 SpringBoot2.x入门介绍'
							},
						]
					},
					{
						name:'SpringBoot 数据层操作',
						children:[
							{
								name:'1-1 SpringBoot2.x入门介绍'
							},
							{
								name:'1-2 SpringBoot2.x入门介绍'
							},
							{
								name:'1-3 SpringBoot2.x入门介绍'
							},
						]
					},
					{
						name:'SpringBoot 数据层操作',
						children:[
							{
								name:'1-1 SpringBoot2.x入门介绍'
							},
							{
								name:'1-2 SpringBoot2.x入门介绍'
							},
							{
								name:'1-3 SpringBoot2.x入门介绍'
							},
						]
					}
				],
				IsFavorite: false,
				favoriteId: ''
			}
		},
		onLoad(options) {
			this.courseId = options.courseId;
			var tempHeight = 800;
			var that = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {                  
					tempHeight = res.windowHeight;
					uni.createSelectorQuery().select(".header").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						tempHeight -= data.height;
						that.swiperHeight = tempHeight + 'px';
						uni.createSelectorQuery().select("#foot-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							// console.log("减掉底部后的高度 " + tempHeight);
							that.swiperHeight = tempHeight + 'px';
							that.tempHeight = tempHeight;
							// console.log("滑屏最后高度 " + that.swiperHeight);
						}).exec();
			
					}).exec();
				}
			});
		},
		onReady() {
			this.getHeight('.catalogue_'+0);
			this.getQuery();
			this.getCatalogue();
			this.getIsfavor();
		},
		methods: {
			getQuery(){
				// this.$http.getStudyInterface({
				// 	CourseId:this.courseId
				// }).then(res=>{
				// 	this.detail = res.returnValue;
				// 	if(this.detail.courseScoreBaseTotal && this.detail.courseScoreBaseTotal.itemList){
				// 		this.detail.courseScoreBaseTotal.itemList.map(item=>{
				// 			item.modifiedOn = this.$tui.formData(item.modifiedOn);
				// 		})
				// 	}
				// })
				this.$httpWX({
					url: '/entity/detail/'+this.courseId,
					method:'get',
					data:{
						objectTypeCode: 50700,
						layoutId: '0ccbcaa0-1da5-4b54-a307-9f2434da9632'
					}
				}).then(res=>{
					console.log(res)
					this.detail = res.returnValue.record;
				})
			},
			getCatalogue(){
				this.$httpWX({
					url: '/course/'+ this.courseId +'/chapter/fetchall',
					method:'get',
					data:{
						search: ''
					}
				}).then(res=>{
					this.catalogueList = res.returnValue;
					const arrayTreeAddLevel = (array, levelName = 'level', childrenName = 'children') => {
					    if (!Array.isArray(array)) return []
					    const recursive = (array, level = 0) => {
					        level++
					        return array.map(v => {
					            v[levelName] = level
					            const child = v[childrenName]
					            if (child && child.length) recursive(child, level)
					            return v
					        })
					    }
					    return recursive(array)
					}
					this.catalogueList =  arrayTreeAddLevel(this.catalogueList,'level','Children')
				})
			},
			getStudyFavor(){
				this.$http.getStudyFavor({
					CourseId: this.courseId
				}).then(res=>{
					console.log(res);
				})
			},
			async handleTab(index){
				this.currIndex = index;
				let className = '.catalogue_'+index;				
				this.getHeight(className)
			},
			changeSwiper(e){
				this.currIndex = e.detail.current;
				let className = '.catalogue_'+this.currIndex;
				this.getHeight(className)
			},
			getHeight(className){
				var that = this;
				const query = uni.createSelectorQuery()
				let height = this.swiperHeight;
				setTimeout(()=>{					
					query.select(className).boundingClientRect(rect=>{
						height = rect.height + 'px';
						if(rect.height>=that.tempHeight){
							that.swiperHeight = height;
						}else {
							that.swiperHeight = that.tempHeight + 'px'
						}
					}).exec()
				},100)
				return height;
			},
			FavorSubject(){
				// this.userFavor = !this.userFavor;
				// if(!this.userFavor){					
				// 	this.$http.getStudyCollection({
				// 		CourseId: this.courseId
				// 	}).then(res=>{
				// 		if(res.returnValue!=''){
				// 			this.userFavor = true;
				// 		}
				// 	})
				// }else {
				// 	this.$http.getStudyCancelCollection({
				// 		CourseId: this.courseId
				// 	}).then(res=>{
				// 		if(res.returnValue!=''){
				// 			this.userFavor = false;
				// 		}
				// 	})
				// }
				var IsFavorite = this.IsFavorite ? 0 : 1;
				var obj = {
					params: {
						recordRep:{
							objTypeCode: 50714,
							id: this.favoriteId,
							fields: {
								Name: this.detail.Name,
								ObjectId: {
									Id: this.courseId
								},
								ObjectTypeCode: 50700,
								IsFavorite: IsFavorite
							}
						}
					}
				}
				var message = JSON.stringify(obj);
				if(!this.userFavor){
					this.$httpWX({
						url: '/entity/save',
						method:'post',
						data:{
							message: message
						}
					}).then(res=>{
						console.log(res)
						this.getIsfavor();
					})
				}
			},
			// 查看课程是否收藏
			getIsfavor(){
				this.$httpWX({
					url:'/course/isfavorite',
					method:'get',
					data:{
						courseId: this.courseId
					}
				}).then(res=>{
					console.log('课程是否收藏',res);
					if(res.returnValue){
						this.favoriteId = res.returnValue.Id;
						this.IsFavorite = res.returnValue.IsFavorite;
					}
				})
			}
		},
		onPageScroll(e) {
			var that = this;
			var top = e.scrollTop;
			if(e.scrollTop<=80){
				that.isFixed = false;
			}else {				
				wx.createSelectorQuery().select('#d-tabs').boundingClientRect(rect=>{
					if(rect.top<=0){
						that.isFixed = true;
					}
				}).exec()
			}

		}
	}
</script>
<style>
	@import "../../colorui/main.css";
	@import "../../colorui/icon.css";
</style>
<style lang="scss" scoped>
	page{
		background: #FFFFFF;
	}
.wrapper{
	.cover{
		width: 100%;
		// background: #d24941;
		background: rgb(244,244,244);
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		box-shadow: 0 10rpx 10rpx rgba(255,255,255,.5);
		display: flex;
		.leftImg{
			width: 120rpx;
			height: 180rpx;
			// background: #C70C15;
			border-radius: 10rpx;
			.img{
				width: 100%;
				height: 100%;
			}
		}
		.rightInfo{
			flex: 1;
			margin-left: 15rpx;
		}
		.title{
			font-size: 28rpx;
			color: #333;
			font-weight: bold;
			display: flex;
			align-items: center;
			.tag{
				display: inline-block;
				width: 60rpx;
				height: 30rpx;
				line-height: 30rpx;
				text-align: center;
				font-size: 20rpx;
				color: #FFFFFF;
				border-top-right-radius: 10rpx;
				border-bottom-left-radius: 10rpx;
				border: 1rpx solid #FFFFFF;
				margin-right: 10rpx;
			}
		}
		.duty{
			line-height: 2;
			font-size: 24rpx;
			color: #666;
		}
		.introduce{
			line-height: 1.5;
			font-size: 28rpx;
			color: #FFFFFF;
		}
	}
	.statistics{
		background: #fff;
		padding: 20rpx;
		.boxWrap{
			display: flex;
			justify-content: space-around;
			.boxItem{
				font-size: 24rpx;
				.th{
					color:#666666;
				}
				.td{
					padding-top: 20rpx;
					color: #333333;
					font-weight: bold;
				}
			}
		}
	}
	.d-tabs{
		margin-top: 20rpx;
		display: flex;
		background: #FFFFFF;
		// box-shadow: 0 15rpx 20rpx 10rpx #fff;
		font-size: 28rpx;
		padding: 20rpx 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1rpx solid #e2e3e5;
		box-sizing: border-box;
		.d-tab{
			color: #666666;
			font-weight: bold;
			border-bottom: 5rpx solid transparent;
			span{
				display: inline-block;
				padding-bottom: 10rpx;
			}
		}
		.d-tab.active{
			color: #d24941;
			border-bottom: 5rpx solid #d24941;
		}
	}
	.d-tabs.fixedActive{
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 999;
	}
	.center{
		.container{
			padding-bottom: 100rpx;
			.d-swiper-box{
				height: 100%;
			}
		}
	}
	#foot-box{
		.icon{
			min-width: 100rpx;
			text-align: center;
			padding-left: 20rpx;
		}
		.submit{
			flex: 1;
			.btn{
				width: 90%;
				height: 80rpx;
				line-height: 80rpx;
				text-align: center;
				background: #d24941;
				font-size: 28rpx;
				color: #FFFFFF;
				border-radius: 50rpx;
			}
		}
	}
	.swiperItem{
		overflow: auto;
	}
}
</style>
