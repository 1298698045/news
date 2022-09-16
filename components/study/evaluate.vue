<template>
	<view class="evaluate">
		<div class="container">
			<div class="score">
				<div class="item">
					<div class="num">
						{{detail.courseComMarks || 10}}
					</div>
				</div>
				<div class="item">
					<p class="lebel">内容实用</p>
					<p class="val">{{detail.contentPracticalNum}}</p>
				</div>
				<div class="item">
					<p class="lebel">通俗易懂</p>
					<p class="val">{{detail.contentDegreeNum}}</p>
				</div>
				<div class="item">
					<p class="lebel">逻辑清晰</p>
					<p class="val">{{detail.contentClearNum}}</p>
				</div>
			</div>
			<div class="content">
				<div class="box" v-for="(item,index) in commentList" :key="index">
					<div class="row">
						<div class="avatar">
							<image class="head_portrait" :src="item.thumbnailPath"></image>
						</div>
						<div class="name">
							{{item.CreatedByName.textValue || '张三'}}
						</div>
						<div class="rate">
							<p>
								<!-- <tui-rate quantity="6" :current="item.courseScoreNum" :score="1" active="#C70C15" disabled></tui-rate> -->
							</p>
							<p class="time">
								{{item.CreatedOn.dateTime}}
							</p>
						</div>
					</div>
					<div class="comment">
						{{item.Comment.textValue}}
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		name:'Evaluate',
		props:{
			// detail:{
			// 	type: [Number, String, Object],
			// 	default: '',
			// 	required: true
			// },
			courseId:{
				type: [Number, String, Object],
				default: ''
			}
		},
		data(){
			return {
				commentList:[
					{
						name:'粉丝1',
						rate:6,
						time:"2021-10-20",
						desc:`在思想政治方面，我不断加强自己的政治修养，认真学习。
						深刻领会十八大会议精神，坚持以科学发展观为指导，坚持以人为本，以病人为中心，
						保证医疗质量和医疗安全，改善服务行为，优化服务流程，构建和谐医患关系
						努力为病人提供安全、有效、便捷的医疗护理服务。认真了解党和国家的各项政策、方针，
						并且按照一名共产党员的标准严格要求自己。
						不断提高了自己的政治理论水平，坚定了自己对共产主义的信念，牢记全心全意为人民服务的宗旨，
						才能在当前建设社会主义事业的大好形势下，永远保持一个共产党员的先进性。`
					},
					{
						name:'粉丝2',
						rate:2,
						time:"2021-10-20",
						desc:`　　周围的人见他整天为学生忙这忙那，连假日都不休息，问他累不累学习党员黄永腾。他说：“工作哪有不累的？但是我高兴，因为我的爱心换来学生的开心。`
					},
					{
						name:'粉丝3',
						rate:1,
						time:"2021-10-20",
						desc:`　　周围的人见他整天为学生忙这忙那，连假日都不休息，问他累不累学习党员黄永腾。他说：“工作哪有不累的？但是我高兴，因为我的爱心换来学生的开心。`
					},
					{
						name:'粉丝4',
						rate:2,
						time:"2021-10-20",
						desc:`　　周围的人见他整天为学生忙这忙那，连假日都不休息，问他累不累学习党员黄永腾。他说：“工作哪有不累的？但是我高兴，因为我的爱心换来学生的开心。`
					},
					{
						name:'粉丝5',
						rate:3,
						time:"2021-10-20",
						desc:`　　周围的人见他整天为学生忙这忙那，连假日都不休息，问他累不累学习党员黄永腾。他说：“工作哪有不累的？但是我高兴，因为我的爱心换来学生的开心。`
					},
					{
						name:'粉丝6',
						rate:6,
						time:"2021-10-20",
						desc:`　　周围的人见他整天为学生忙这忙那，连假日都不休息，问他累不累学习党员黄永腾。他说：“工作哪有不累的？但是我高兴，因为我的爱心换来学生的开心。`
					}
				]
			}
		},
		onReady(){
			this.getQuery();
		},
		methods:{
			getQuery(){
				var filterquery = '\nRegardingId\teq\t'+this.courseId
				this.$httpWX({
					url: '/entity/fetchall',
					method:'post',
					data:{
						objectTypeCode: 50710,
						filterquery: filterquery
					}
				}).then(res=>{
					console.log(res);
					this.commentList = res.returnValue.nodes;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.evaluate{
		padding-bottom: 100rpx;
		.container{
			padding: 0 30rpx;
			box-sizing: border-box;
			.score{
				width: 100%;
				background: #f8f9fb;
				margin: 20rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx;
				box-sizing: border-box;
				border-radius: 30rpx;
				.item{
					font-weight: bold;
					.num{
						font-size: 40rpx;
						font-weight: bold;
						color: #C70C15;
					}
					.label{
						text-align: center;
					}
					.val{
						padding-top: 10rpx;
						text-align: center;
					}
				}
			}
			.content{
				.box{
					border-bottom: 1rpx solid #d9dce0;
					padding: 30rpx 0;
					box-sizing: border-box;
					.row{
						display: flex;
						align-items: center;
						padding-bottom: 20rpx;
						.avatar{
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							background: #C70C15;
							.head_portrait{
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.name{
							font-size: 32rpx;
							color: #333333;
							font-weight: bold;
							flex: 1;
							margin-left: 20rpx;
						}
						.rate{
							.time{
								font-size: 28rpx;
								color: #999999;
								line-height: 1.5;
								text-align: right;
							}
						}
					}
					.comment{
						font-size: 28rpx;
						color: #333333;
						line-height: 1.5;
					}
				}
			}
		}
	}
</style>
