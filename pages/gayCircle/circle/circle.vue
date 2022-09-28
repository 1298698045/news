<template>
	<view class="wrapper">
		<div class="container">
			<!-- <div class="leftNav" :style="{height:windowHeight+'px'}">
				<div class="tab" :class="{'active':currIdx==index}" v-for="(item,index) in listData" :key="index" @click="handleTab(item,index)">
					{{item.Name}}
				</div>
			</div> -->
			<div class="rightContent">
				<!-- <view v-if="currIdx==index" v-for="(item,index) in listData" :key="index">					
					<div class="empty" v-if="item.examClassSubjectBases==''">
						<div class="emptyImg">
							
						</div>
						<div class="text">
							暂未关注任何圈子
						</div>
					</div>
					<block v-for="(row,idx) in item.examClassSubjectBases" :key="idx">					
						<div class="content" v-if="item.examClassSubjectBases!=''">
							<div class="row" @click="handleChoice(item,row)">
								<div class="radius">
									
								</div>
								<div class="info">
									<p class="name">{{row.Name}}</p>
									<p class="fans">{{row.fansNums}}</p>
								</div>
							</div>
						</div>
					</block>
				</view> -->
				<block v-for="(row,idx) in listData" :key="idx">
					<div class="content">
						<div class="row" @click="handleChoice(row)">
							<div class="radius">
								
							</div>
							<div class="info">
								<p class="name">{{row.Name.value || ''}}</p>
								<!-- <p class="fans">{{row.fansNums}}</p> -->
							</div>
						</div>
					</div>
				</block>
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
						name:'我的圈子',
						children:[]
					},
					{
						name:'热门圈子',
						children:[
							{
								name:'临床圈',
								fansNums:888
							},
							{
								name:'内科',
								fansNums:888
							},
							{
								name:'职场交流',
								fansNums:888
							},
							{
								name:'考证晋升',
								fansNums:888
							},
							{
								name:'生活点滴',
								fansNums:888
							}
						]
					},
					{
						name:'临床护理',
						children:[
							{
								name:'临床圈2',
								fansNums:888
							},
							{
								name:'内科',
								fansNums:888
							},
							{
								name:'职场交流',
								fansNums:888
							},
							{
								name:'考证晋升',
								fansNums:888
							},
							{
								name:'生活点滴',
								fansNums:888
							}
						]
					},
					{
						name:'职场学习',
						children:[
							{
								name:'临床圈3',
								fansNums:888
							},
							{
								name:'内科',
								fansNums:888
							},
							{
								name:'职场交流',
								fansNums:888
							},
							{
								name:'考证晋升',
								fansNums:888
							},
							{
								name:'生活点滴',
								fansNums:888
							}
						]
					},
					{
						name:'天使生活',
						children:[
							{
								name:'临床圈4',
								fansNums:888
							},
							{
								name:'内科',
								fansNums:888
							},
							{
								name:'职场交流',
								fansNums:888
							},
							{
								name:'考证晋升',
								fansNums:888
							},
							{
								name:'生活点滴',
								fansNums:888
							}
						]
					},
					{
						name:'护理咨询',
						children:[
							{
								name:'临床圈5',
								fansNums:888
							},
							{
								name:'内科',
								fansNums:888
							},
							{
								name:'职场交流',
								fansNums:888
							},
							{
								name:'考证晋升',
								fansNums:888
							},
							{
								name:'生活点滴',
								fansNums:888
							}
						]
					}
				],
				currIdx:0,
				windowHeight:'',
				listData:[]
			}
		},
		computed:{
			token(){
				return uni.getStorageSync('wechatAuthToken')
			}
		},
		mounted() {
			var that = this;
			uni.getSystemInfo({
			    success: function (res) {
			        // console.log(res.model);
			        // console.log(res.pixelRatio);
			        // console.log(res.windowWidth);
			        // console.log(res.windowHeight);
			        // console.log(res.language);
			        // console.log(res.version);
			        // console.log(res.platform);
					that.windowHeight = res.windowHeight
			    }
			});
			console.log(this.$store.state.circle.circle)
		},
		onLoad() {
			// this.getQuery();
			this.getNewQuery();
		},
		methods: {
			getQuery(){
				this.$http.getCircleList({
					Token: this.token
				}).then(res=>{
					this.listData = res.returnValue;
				})
			},
			getNewQuery(){
				this.$httpWX({
					url: '/entity/fetchall',
					method: 'post',
					data: {
						objectTypeCode: 6002
					}
				}).then(res=>{
					console.log(res);
					this.listData = res.returnValue.nodes;
				})
			},
			handleTab(item,index){
				this.currIdx = index;
			},
			handleChoice(row){
				this.$store.commit('setCircle',row)
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #FFFFFF;
}
.wrapper{
	.container{
		display: flex;
		.leftNav{
			width: 150rpx;
			height: 100%;
			background: #EEEEEE;
			.tab{
				line-height: 100rpx;
				text-align: center;
				font-size: 28rpx;
			}
			.tab.active{
				background: #FFFFFF;
			}
		}
		.rightContent{
			flex: 1;
			.empty{
				.emptyImg{
					width: 150rpx;
					height: 150rpx;
					background: #e2e3e5;
					border-radius: 50%;
					margin: 30rpx auto 0;
				}
				.text{
					text-align: center;
					line-height: 2;
					font-size: 24rpx;
					color: #EEEEEE;
				}
			}
			.row{
				display: flex;
				align-items: center;
				padding: 20rpx;
				.radius{
					width: 80rpx;
					height: 80rpx;
					background: #ccc;
					border-radius: 50%;
				}
				.info{
					flex: 1;
					margin-left: 20rpx;
					.name{
						font-size: 28rpx;
						color: #333333;
						font-weight: bold;
					}
					.fans{
						font-size: 24rpx;
						color: #999999;
						line-height: 2;
					}
				}
			}
		}
	}
}
</style>
