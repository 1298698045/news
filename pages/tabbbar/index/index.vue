<template>
	<view class="wrapper">
		<!-- <div class="column">
			<div class="box" @click="handleHref(1)">
				<div class="icon">
					<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
				</div>
				<p class="text">考试</p>
			</div>
			<div class="box" @click="handleHref(2)">
				<div class="icon">
					<image src="../../../static/images/news/0-2.png" mode="widthFix"></image>
				</div>
				<p class="text">学习</p>
			</div>
			<div class="box" @click="handleHref(3)">
				<div class="icon">
					<image src="../../../static/images/news/0-2.png" mode="widthFix"></image>
				</div>
				<p class="text">党费</p>
			</div>
			<div class="box" @click="handleHref(4)">
				<div class="icon">
					<image src="../../../static/images/news/0-2.png" mode="widthFix"></image>
				</div>
				<p class="text">问卷</p>
			</div>
			<div class="box" @click="handleHref(5)">
				<div class="icon">
					<image src="../../../static/images/news/0-2.png" mode="widthFix"></image>
				</div>
				<p class="text">活动</p>
			</div>
			<div class="box" @click="handleHref(6)">
				<div class="icon">
					<image src="../../../static/images/news/0-2.png" mode="widthFix"></image>
				</div>
				<p class="text">党支部</p>
			</div>
			<div class="fake_item"></div>
			<div class="fake_item"></div> 
		</div>
		<div class="hr"></div> -->
		<!-- <button @click="getLogin()">获取code</button> -->
	<!-- 	<h1 class="code">{{code}}</h1>
		<span class="tag" @click="handleCopyCode">复制</span> -->
<!-- 		<input class="inp" type="text" @input="handleInput">
		<p v-for="item in copyArr">{{item.name}}</p> -->
		
		<div class="banner">
			<div class="banerItem">
				<image :src="pathUrl+'/vx/images/banner.png'" mode="aspectFill"></image>
			</div>
		</div>
		<div class="noticeBar">
			<i class="iconfont icon-gonggao"></i>
			<span class="weight">公告</span>
			<span class="split">|</span>
			<span class="text">开展党员干部革命传统教育活动，奋斗百年路开展党员干部革命传统教育活动</span>
		</div>
		<div class="clumnBaner">
			<swiper :indicator-dots="true" :current="current" :circular="true" indicator-color="#e0dedf" indicator-active-color="#d93731">
				<swiper-item class="swiperItem">
					<div class="box" @click="handleHref(1)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">支部活动</p>
					</div>
					<div class="box" @click="handleHref(2)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">新闻动态</p>
					</div>
					<div class="box" @click="handleHref(3)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">课程学习</p>
					</div>
					<div class="box" @click="handleHref(4)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">考试答题</p>
					</div>
				</swiper-item>
				<swiper-item class="swiperItem">
					<div class="box" @click="handleHref(6)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">党支部</p>
					</div>
					<div class="box" @click="handleHref(1)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">考评</p>
					</div>
					<div class="fake_item"></div>
					<div class="fake_item"></div> 
					<div class="fake_item"></div>
				</swiper-item>
			</swiper>
		</div>
		<!-- 课程 -->
		<div class="panelWrap" v-if="CourseList!=''&&CourseList.length>0">
			<div class="panelHead">
				<div class="leftTitle">课程</div>
				<div class="moreText" @click="handleMore('CourseList')">更多</div>
			</div>
			<div class="panelBd">
				<scroll-view class="scrollView" :scroll-x="true">
					<view class="viewItem" v-for="(item,index) in CourseList" :key="index" @click="handleCourse(item)">
						<view class="imgs">
							
						</view>
						<view class="title">
							{{item.Name || ''}}
						</view>
						<view class="author">
							{{item.Writer || '暂无作者'}}
						</view>
						<view class="btn">免费获取</view>
					</view>
				</scroll-view>
			</div>
		</div>
		<!-- 考试 -->
		<div class="panelWrap" v-if="LeaningTestList!=''&&LeaningTestList.length>0">
			<div class="panelHead">
				<div class="leftTitle">考试</div>
				<div class="moreText" @click="handleMore('LeaningTestList')">更多</div>
			</div>
			<div class="panelBd">
				<scroll-view class="scrollView" :scroll-x="true">
					<view class="viewItem" v-for="(item,index) in LeaningTestList" :key="index" @click="handleSubject(item)">
						<view class="imgs">
							
						</view>
						<view class="title">
							{{item.Name || ''}}
						</view>
						<!-- <view class="author">
							金伟 金妮
						</view> -->
						<view class="btn">开始考试</view>
					</view>
				</scroll-view>
			</div>
		</div>
		<!-- 问卷调查 -->
		<div class="panelWrap" v-if="SurveyList!=''&&SurveyList.length>0">
			<div class="panelHead">
				<div class="leftTitle">问卷调查</div>
				<div class="moreText">更多</div>
			</div>
			<div class="panelBd">
				<scroll-view :scroll-x="true" class="questionView">
					<view class="questionItem" v-for="(item,index) in SurveyList" :key="index">
						<view class="questionTitle">
							{{item.Name || ''}}
						</view>
						<view class="desc">
							{{item.Description || '暂无描述'}}
						</view>
						<view class="questionOptions">
							<view class="num">{{item.QuestionCount || 0}}题 | 已参与{{item.NumOfResponses || 0}}</view>
							<view class="borderBtn">参与</view>
						</view>
					</view>
				</scroll-view>
			</div>
		</div>
		<!-- 活动 -->
		<div class="panelWrap" v-if="CampaignList!=''&&CampaignList.length>0">
			<div class="panelHead">
				<div class="leftTitle">党建活动</div>
				<div class="moreText">更多</div>
			</div>
			<div class="panelBd">
				<scroll-view :scroll-x="true" class="questionView">
					<view class="questionItem" v-for="(item,index) in CampaignList" :key="index" @click="handleActivity(item)">
						<view class="questionTitle">
							{{item.Name || ''}}
						</view>
						<view class="desc">							
							<view class="time">
								活动时间：{{item.ActualStart || ''}}
							</view>
							<view class="time">
								报名截止时间：{{item.ActualEnd || ''}}
							</view>
						</view>
						<view class="questionOptions">
							<view class="num">已参与{{item.NumOfPeople || 0}}</view>
							<view class="borderBtn" @click="handleActivity(item)">参与</view>
						</view>
					</view>
				</scroll-view>
			</div>
		</div>
		<!-- 党务通知 -->
		<div class="panelWrap" v-if="PartyAffairsContentList!=''&&PartyAffairsContentList.length>0">
			<div class="panelHead">
				<div class="leftTitle">党务通知</div>
				<div class="moreText" @click="handleMore('PartyAffairsContentList')">更多</div>
			</div>
			<div class="panelBd">
				<div class="news">
					<div class="newsItem" v-for="(item,index) in PartyAffairsContentList" :key="index" @click="handleNewsDetail(item)">
						<div class="left">
							<div class="newsTitle">{{item.Title || ''}}</div>
							<div class="newsInfo">
								<span>{{item.CreatedOn || ''}}</span>
								<span>{{item.ReadCount || 0}}阅读</span>
								<span>{{item.CommentCount || 0}}评论</span>
							</div>
						</div>
						<div class="right" v-if="item.ImageUrl">
							<image :src="item.ImageUrl" mode="aspectFill"></image>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- 党办通知 -->
		<div class="panelWrap" v-if="PartyContentList!=''&&PartyContentList.length>0">
			<div class="panelHead">
				<div class="leftTitle">党办通知</div>
				<div class="moreText" @click="handleMore('PartyContentList')">更多</div>
			</div>
			<div class="panelBd">
				<div class="news">
					<div class="newsItem" v-for="(item,index) in PartyContentList" :key="index" @click="handleNewsDetail(item)">
						<div class="left">
							<div class="newsTitle">{{item.Title || ''}}</div>
							<div class="newsInfo">
								<span>{{item.CreatedOn || ''}}</span>
								<span>{{item.ReadCount || 0}}阅读</span>
								<span>71评论</span>
							</div>
						</div>
						<div class="right" v-if="item.ImageUrl">
							<image :src="item.ImageUrl" mode="aspectFill"></image>
						</div>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	import dragSort from '@/components/dragSort/dragSort.vue'
	import { fakeData } from '@/common/data.js'
	export default {
		components: { 
			dragSort
		},
		data() { 
			return {
				list: [{
					"name": "001",
					"id": 'id_1'
				}, {
					"name": "002",
					"id": 'id_2'
				}, {
					"name": "003",
					"id": 'id_3'
				}, {
					"name": "004",
					"id": 'id_4'
				}, {
					"name": "005",
					"id": 'id_5'
				}, {
					"name": "006",
					"id": 'id_6'
				}, {
					"name": "007",
					"id": 'id_7'
				}, {
					"name": "008",
					"id": 'id_8'
				}, {
					"name": "009",
					"id": 'id_9'
				}/* , {
					"name": "旅游",
					"id": 'id_10'
				}, {
					"name": "娱乐",
					"id": 'id_11'
				}, {
					"name": "体育",
					"id": 'id_12'
				}, {
					"name": "其他",
					"id": 'id_13'
				} */],
				arr:fakeData.data,
				temp:[],
				copyArr:[],
				code:'',
				current: 0,
				CampaignList: [], // 活动
				CourseList: [], // 课程
				LeaningTestList: [], // 考试
				PartyAffairsContentList: [], // 党务通知
				PartyContentList: [], // 党办通知
				SurveyList: [], // 问卷调查
				pathUrl: 'http://112.126.75.65:10002'
			}
		},
		onLoad() {
			console.log(this.arr)
			// console.log(this.arr,this.arr.length)
			// const copyArr = this.recursionFun(this.arr);
			// console.log(copyArr,copyArr.length)
			this.getDetail();
		},
		methods: {
			handleCourse(item){
				uni.navigateTo({
					url:'../../study/study?courseId='+item.CourseId
				})
			},
			handleMore(str){
				if(str=='CourseList'){
					uni.navigateTo({
						url:'../../study/home'
					})
				}else if(str=='LeaningTestList'){
					uni.navigateTo({
						url:'/pages/practice/home'
					})
				}else if(str == 'SurveyList'){
					uni.navigateTo({
						url:'../../questionnaire/questionnaire'
					})
				}else if(str == 'CampaignList'){
					uni.navigateTo({
						url: '../../activity/activity'
					})
				}else if(str == 'PartyAffairsContentList' || str == 'PartyContentList'){
					uni.switchTab({
						url:'../news/news'
					})
				}
			},
			// 考试详情
			handleSubject(item){
				uni.navigateTo({
					url:'/pages/examination/subject/subject?id='+item.TestId
				})
			},
			// 参与活动
			handleActivity(item){
				uni.navigateTo({
					url:'../../activity/activityDetail?id='+item.CampaignId
				})
			},
			handleNewsDetail(item){
				uni.navigateTo({
					url:'../../news/newsDetail?id='+item.ContentId
				})
			},
			getDetail(){
				this.$httpWX({
					url: "/partyhome/get",
					method: 'get',
					data:{
						
					}
				}).then(res=>{
					console.log(res);
					this.CampaignList = res.CampaignList || '';
					this.CourseList = res.CourseList || '';
					this.LeaningTestList = res.LeaningTestList || '';
					this.PartyAffairsContentList = res.PartyAffairsContentList || '';
					this.PartyContentList = res.PartyContentList || '';
					this.SurveyList = res.SurveyList || '';
				})
			},
			getLogin(){
				var that = this;
				uni.login({
					success(res) {
						console.log(res)
						that.code = res.code;
					}
				})
			},
			handleCopyCode(){
				var code = this.code;
				uni.setClipboardData({
					data:code,
					success:res=>{
						uni.getClipboardData({
							success:res=>{
								console.log('复制：', res);
								uni.showToast({
									title:'code已复制',
									icon:'success',
									duration:2000
								})
							}
						})
					}
				})
			},
			recursionFun(data,value){
		      var rule = false
		      for(var i=0;i<data.length;i++){
			    data[i].show=false
		        if(data[i].children){
		          if(this.recursionFun(data[i].children)){
		            data[i].show=true
		            rule = true
		          }
		        }
		        if(data[i].name.indexOf(value)!=-1||data[i].show){
		          data[i].show=true
		          rule = true
		        }
		      }
		      return rule
		    },
			handleHref(i){
				switch(i){
					case 1:
						// uni.navigateTo({
						// 	url:'../../examination/examination'
						// })
						break;
					case 2:
						uni.switchTab({
							url:'../news/news'
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/pages/study/home'
						})
						break;
					case 4:
						uni.navigateTo({
							url: '/pages/practice/home'
						})
						break;
					case 5:
						uni.navigateTo({
							url: '../../activity/activity'
						})
						break;
					case 6:
						uni.navigateTo({
							url:'/pages/partyBranch/partyBranch'
						})
						break;
					default:
						return
				}
			},
			unique(arr) {
			  for (var i = 0; i < arr.length - 1; i++) {
			          for (var j = i + 1; j < arr.length; j++) {
			              if (arr[i].id == arr[j].id) {
			                  arr.splice(j, 1);
			                  j--;
			              }
			          }
			      }
			  return arr;
			},
			recursionFun(arr,name){
				const temp = this.temp;
				arr.forEach(item=>{
					this.temp.push(item);
					if(item.children && item.children.length>0){
						this.recursionFun(item.children);
					}
				})
				const data = temp.filter(item=> RegExp(name).test(item.name));
				return this.toTree(this.unique(data));
			},
			toTree(data) {
			  let treeData = [];
			  if (!Array.isArray(data)) return treeData;
			
			  data.forEach(item => {
			    delete item.children;  //删除item下的children，以防多次调用
			  });
			
			  let map = {};
			  data.forEach(item => {
			    map[item.id] = item;
				console.log(map[item.id])
			  });
			
			  data.forEach(item => {
			    let parent = map[item.parentId];  //判断item的parentId是否是否存在map中
			    if (parent) {  //如果存在则表示item不是最顶层的数据
			      (parent.children || (parent.children = [])).push(item)
			    }
			    else {
			      treeData.push(item)  // 如果不存在 则是顶层数据
			    }
			  });
			  return treeData;
			},
			handleInput(e){
				this.searchName = e.detail.value;
				// this.copyArr = this.recursionFun(this.arr,this.searchName);
				this.formdata(this.arr,this.searchName)
				console.log(this.arr)
			}
		}
	}
</script>

<style lang="scss">
.hr{
	width: 100%;
	height: 20rpx;
	background: #F4F4F4;
}
.inp{
	width: 100px;
	height: 30px;
	border: 1px solid #ccc;
	background: #FFFFFF;
}
.wrapper{
	.column{
		display: flex;
		background: #FFFFFF;
		font-size: 28rpx;
		padding:30rpx 0;
		flex-wrap: wrap;
		.box{
			width: 20%;
			text-align: center;
			.icon{
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				background: #CCCCCC;
				margin: 0 auto;
				image{
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
			.text{
				padding-bottom: 10rpx;
				padding-top: 10rpx;
				font-size: 24rpx;
			}
		}
		.fake_item{
			flex: 0 0 33%;
			height: 0;
		}
	}
	.banner{
		margin: 30rpx;
		.banerItem{
			width: 100%;
			height: 373rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.noticeBar{
		margin: 30rpx 30rpx 0 30rpx;
		// height: 80rpx;
		// line-height: 80rpx;
		background: #fff;
		border-radius: 8rpx;
		padding: 26rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		.iconfont{
			color: #C70C15;
		}
		.weight{
			font-weight: bold;
			color: #333333;
			font-size: 28rpx;
			padding-left: 11rpx;
			padding-right: 23rpx;
		}
		.split{
			color: #dbdbdb;
			padding-right: 17rpx;
		}
		.text{
			display: inline-block;
			flex: 1;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 24rpx;
			color: #7b8187;
		}
	}
	.clumnBaner{
		padding: 20rpx 30rpx;
		swiper{
			width: 100%;
			height: 200rpx;
			position: relative;
			.swiperItem{
				display: flex;
				justify-content: space-around;
				.box{
					text-align: center;
					.icon{
						width: 89rpx;
						height: 89rpx;
						border-radius: 50%;
						background: #CCCCCC;
						margin: 0 auto;
						image{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
					.text{
						padding-top: 20rpx;
						font-size: 28rpx;
						color: #333333;
					}
				}
			}
			.wx-swiper-dots .wx-swiper-dot{
				width: 20rpx;
				height: 7rpx;
				border-radius: 3rpx;
				display: inline-block;
			}
			.wx-swiper-dots .wx-swiper-dot:nth-of-type(n+2){
				margin-left: 7rpx;
			}
		}
	}
	.panelWrap{
		margin: 50rpx 0;
		.panelHead{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			box-sizing: border-box;
			.leftTitle{
				font-size: 35rpx;
				color: #000000;
				font-weight: bold;
			}
			.moreText{
				font-size: 26rpx;
				color: #72777c;
			}
		}
		.panelBd{
			.scrollView{
				white-space: nowrap;
				padding-top: 31rpx;
				.viewItem:first-child{
					margin-left: 30rpx;
				}
				.viewItem{
					display: inline-block;
					width: 280rpx;
					// height: 340rpx;
					margin-left: 20rpx;
					.imgs{
						width: 100%;
						height: 157rpx;
						background: #D03A28;
						border-radius: 8rpx;
					}
					.title{
						width: 100%;
						font-size: 31rpx;
						color: #000000;
						font-weight: bold;
						line-height: 1.2;
						margin-top: 29rpx;
						word-wrap: break-word;
						display:-webkit-box;
						overflow:hidden;
						text-overflow:ellipsis;
						word-wrap:break-word;
						-webkit-line-clamp:2;
						-webkit-box-orient:vertical;
						white-space:normal !important;
					}
					.author{
						font-size: 24rpx;
						color: #7b8187;
						margin-top: 12rpx;
					}
					.btn{
						margin-top: 29rpx;
						color: #d93731;
						font-size: 26rpx;
					}
				}
			}
			.questionView{
				white-space: nowrap;
				padding-top: 31rpx;
				.questionItem{
					display: inline-block;
					width: 593rpx;
					// height: 231rpx;
					background: #fff;
					border-radius: 8rpx;
					padding: 21rpx;
					box-sizing: border-box;
					margin-left: 20rpx;
					.questionTitle{
						width: 100%;
						font-size: 31rpx;
						color: #000000;
						font-weight: bold;
						line-height: 1.2;
						word-wrap: break-word;
						display:-webkit-box;
						overflow:hidden;
						text-overflow:ellipsis;
						word-wrap:break-word;
						-webkit-line-clamp:2;
						-webkit-box-orient:vertical;
						white-space:normal !important;
					}
					.desc{
						font-size: 26rpx;
						color: #000000;
						word-wrap: break-word;
						display:-webkit-box;
						overflow:hidden;
						text-overflow:ellipsis;
						word-wrap:break-word;
						-webkit-line-clamp:2;
						-webkit-box-orient:vertical;
						white-space:normal !important;
						margin: 23rpx 0;
						.time{
							font-size: 26rpx;
							color: #000000;
						}
					}
					.questionOptions{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.num{
							font-size: 23rpx;
							color: #7b8187;
						}
						.borderBtn{
							width: 124rpx;
							height: 47rpx;
							line-height: 47rpx;
							text-align: center;
							font-size: 24rpx;
							border: 1rpx solid #d93731;
							color: #d93731;
							border-radius: 23rpx;
						}
					}
				}
				.questionItem:first-child{
					margin-left: 30rpx;
				}
			}
			.news{
				.newsItem{
					height: 193rpx;
					margin: 20rpx 30rpx;
					border-radius: 8rpx;
					background: #fff;
					padding: 21rpx;
					box-sizing: border-box;
					display: flex;
					.left{
						flex: 1;
						margin-right: 15rpx;
						flex-direction: column;
						display: flex;
						justify-content: space-between;
						.newsTitle{
							font-size: 31rpx;
							color: #000000;
							line-height: 1.2;
							word-wrap: break-word;
							display:-webkit-box;
							overflow:hidden;
							text-overflow:ellipsis;
							word-wrap:break-word;
							-webkit-line-clamp:2;
							-webkit-box-orient:vertical;
							white-space:normal !important;
						}
						.newsInfo{
							font-size: 24rpx;
							color: #7b8187;
							span{
								padding-right: 20rpx;
							}
						}
					}
					.right{
						width: 210rpx;
						height: 150rpx;
						border-radius: 8rpx;
						background: #d93731;
						image{
							width: 100%;
							height: 100%;
							border-radius: 8rpx;
						}
					}
				}
			}
		}
	}
}
</style>
