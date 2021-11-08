<template>
	<view class="wrapper">
		<div class="container">
			<div class="leftNav" :style="{height:windowHeight+'px'}">
				<div class="tab" :class="{'active':currIdx==index}" v-for="(item,index) in tabs" :key="index" @click="handleTab(item,index)">
					{{item.name}}
				</div>
			</div>
			<div class="rightContent">
				<view v-if="currIdx==index" v-for="(item,index) in tabs" :key="index">					
					<div class="empty" v-if="item.children==''">
						<div class="emptyImg">
							
						</div>
						<div class="text">
							暂没有考试内容
						</div>
					</div>
					<block v-for="(row,idx) in item.children" :key="idx">					
						<div class="content" v-if="item.children!=''">
							<div class="row" @click="handleExamination(item,row)">
								<div class="radius">
									
								</div>
								<div class="info">
									<p class="name">{{row.name}}</p>
									<p class="fans">{{row.fansNums}}</p>
								</div>
							</div>
						</div>
					</block>
				</view>
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
						name:'推荐',
						children:[]
					},
					{
						name:'医学',
						children:[
							{
								name:'执业药师',
								fansNums:888
							},
							{
								name:'主管药师',
								fansNums:888
							},
							{
								name:'药师',
								fansNums:888
							},
							{
								name:'初级药师',
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
				windowHeight:''
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
		methods: {
			handleTab(item,index){
				this.currIdx = index;
			},
			handleExamination(row,index){
				uni.navigateTo({
					url:'introduce/introduce'
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
