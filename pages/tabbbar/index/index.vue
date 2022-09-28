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
				<image src="/static/images/banner.png" mode="aspectFill"></image>
			</div>
		</div>
		<div class="noticeBar">
			<i class="iconfont icon-gonggao"></i>
			<span class="weight">公共</span>
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
						<p class="text">在线考试</p>
					</div>
					<div class="box" @click="handleHref(1)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">党史学习</p>
					</div>
					<div class="box" @click="handleHref(1)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">党费收缴</p>
					</div>
					<div class="box" @click="handleHref(1)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">问卷调查</p>
					</div>
				</swiper-item>
				<swiper-item class="swiperItem">
					<div class="box" @click="handleHref(1)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">在线考试</p>
					</div>
					<div class="box" @click="handleHref(1)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">党史学习</p>
					</div>
					<div class="box" @click="handleHref(1)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">党费收缴</p>
					</div>
					<div class="box" @click="handleHref(1)">
						<div class="icon">
							<image src="../../../static/images/news/0-1.png" mode="widthFix"></image>
						</div>
						<p class="text">问卷调查</p>
					</div>
				</swiper-item>
			</swiper>
		</div>
		<div class="panelWrap">
			<div class="panelHead">
				<div class="leftTitle">党史学习</div>
				<div class="moreText">更多</div>
			</div>
			<div class="panelBd">
				<scroll-view class="scrollView" :scroll-x="true">
					<view class="viewItem">
						<view class="imgs">
							
						</view>
						<view class="title">
							在坚定历史自信中弘扬伟大的历史主动
							在坚定历史自信中弘扬伟大的历史主动
						</view>
						<view class="author">
							金伟 金妮
						</view>
						<view class="btn">免费获取</view>
					</view>
					<view class="viewItem">
						<view class="imgs">
							
						</view>
						<view class="title">
							在坚定历史自信中弘扬伟大的历史主动
						</view>
						<view class="author">
							金伟 金妮
						</view>
						<view class="btn">免费获取</view>
					</view>
					<view class="viewItem">
						<view class="imgs">
							
						</view>
						<view class="title">
							在坚定历史自信中弘扬伟大的历史主动
						</view>
						<view class="author">
							金伟 金妮
						</view>
						<view class="btn">免费获取</view>
					</view>
				</scroll-view>
			</div>
		</div>
		<div class="panelWrap">
			<div class="panelHead">
				<div class="leftTitle">问卷调查</div>
				<div class="moreText">更多</div>
			</div>
			<div class="panelBd">
				<scroll-view :scroll-x="true" class="questionView">
					<view class="questionItem">
						<view class="questionTitle">
							党建工作问卷调查
						</view>
						<view class="desc">
							为更好地开展好本校的党建工作，日前学校党总支在全体党员中进行了一次“党建工作问卷调
							为更好地开展好本校的党建工作，日前学校党总支在全体党员中进行了一次“党建工作问卷调
						</view>
						<view class="questionOptions">
							<view class="num">19题 | 已参与424</view>
							<view class="borderBtn">参与</view>
						</view>
					</view>
					<view class="questionItem">
						<view class="questionTitle">
							党建工作问卷调查
						</view>
						<view class="desc">
							为更好地开展好本校的党建工作，日前学校党总支在全体党员中进行了一次“党建工作问卷调
							为更好地开展好本校的党建工作，日前学校党总支在全体党员中进行了一次“党建工作问卷调
						</view>
						<view class="questionOptions">
							<view class="num">19题 | 已参与424</view>
							<view class="borderBtn">参与</view>
						</view>
					</view>
				</scroll-view>
			</div>
		</div>
		<div class="panelWrap">
			<div class="panelHead">
				<div class="leftTitle">党建活动</div>
				<div class="moreText">更多</div>
			</div>
			<div class="panelBd">
				<scroll-view :scroll-x="true" class="questionView">
					<view class="questionItem">
						<view class="questionTitle">
							社区开展“喜迎二十大、廉洁守初心”理论宣讲活动
						</view>
						<view class="desc">							
							<view class="time">
								活动时间：2022-09-18  09:00
							</view>
							<view class="time">
								报名截止时间：2022-09-20  18:30
							</view>
						</view>
						<view class="questionOptions">
							<view class="num">已参与424</view>
							<view class="borderBtn">参与</view>
						</view>
					</view>
					<view class="questionItem">
						<view class="questionTitle">
							社区开展“喜迎二十大、廉洁守初心”理论宣讲活动
						</view>
						<view class="desc">
							<view class="time">
								活动时间：2022-09-18  09:00
							</view>
							<view class="time">
								报名截止时间：2022-09-20  18:30
							</view>
						</view>
						<view class="questionOptions">
							<view class="num">已参与424</view>
							<view class="borderBtn">参与</view>
						</view>
					</view>
				</scroll-view>
			</div>
		</div>
		<div class="panelWrap">
			<div class="panelHead">
				<div class="leftTitle">党建资讯</div>
				<div class="moreText">更多</div>
			</div>
			<div class="panelBd">
				<div class="news">
					<div class="newsItem">
						<div class="left">
							<div class="newsTitle">党建引领服务社群，结对共建促进发展党建引领服务社群，结对共建促进发展</div>
							<div class="newsInfo">
								<span>2022年9月18日</span>
								<span>287阅读</span>
								<span>71评论</span>
							</div>
						</div>
						<div class="right"></div>
					</div>
					<div class="newsItem">
						<div class="left">
							<div class="newsTitle">党建引领服务社群，结对共建促进发展党建引领服务社群，结对共建促进发展</div>
							<div class="newsInfo">
								<span>2022年9月18日</span>
								<span>287阅读</span>
								<span>71评论</span>
							</div>
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
				current: 0
			}
		},
		onLoad() {
			console.log(this.arr)
			// console.log(this.arr,this.arr.length)
			// const copyArr = this.recursionFun(this.arr);
			// console.log(copyArr,copyArr.length)
		},
		methods: {
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
						uni.navigateTo({
							url:'../../examination/examination'
						})
						break;
					case 2:
						uni.navigateTo({
							url:'../../study/home'
						})
						break;
					case 3:
						uni.navigateTo({
							url: '../../partyCost/partyCost'
						})
					case 4:
						uni.navigateTo({
							url:'../../questionnaire/questionnaire'
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
					}
				}
			}
		}
	}
}
</style>
