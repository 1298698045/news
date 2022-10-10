<template>
	<div class="curriculum">
		<div class="box" v-for="(item,index) in list" :key="index" @click="handleClick(item,index)">
			<div class="left_cover">
				<image class="img" width="100%" height="100%" :src="pathUrl+item.ImageUrl.value" mode="aspectFill"></image>
			</div>
			<div class="right_info">
				<h3 class="title">
					{{item.Name.textValue || ''}}
				</h3>
				<div class="position">
					<span class="tag">{{item.Writer.textValue || ''}}</span>
				</div>
				<div class="nums">
					<span class="color">免费</span>
					<span class="num">{{item.StudyPeopleCount.textValue || ''}}人学习</span>
				</div>
				<!-- <div class="desc">
					{{item.Description.textValue || ''}}
				</div> -->
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default: []
			},
			name:{
				type:String,
				default:'name'
			},
			post:{
				type:String,
				default:'post'
			},
			duty:{
				type:String,
				default:'duty'
			},
			desc:{
				type:String,
				default:'desc'
			}
		},
		name: 'CourseBox',
		data(){
			return {
				pathUrl:'http://182.92.221.64:10002'
			}
		},
		methods:{
			handleClick(item,index){
				this.$emit('clickIn',item,index);
			}
		}
	}
</script>

<style lang="scss">
	.curriculum{
		.box{
			display: flex;
			margin-top: 30rpx;
			.left_cover{
				width: 120rpx;
				height: 180rpx;
				// background: #C70C15;
				border-radius: 10rpx;
				.img{
					width: 100%;
					height: 100%;
				}
			}
			.right_info{
				flex: 1;
				margin-left: 30rpx;
				.title{
					font-size: 28rpx;
					color: #333333;
					font-weight: bold;
					display: flex;
					align-items: center;
					margin-bottom: 20rpx;
				}
				.position{
					.tag{
						background: #f1f1f1;
						display: inline-block;
						padding: 5rpx;
						font-size: 24rpx;
						color: #767676;
						margin-right: 10rpx;
					}
				}
				.nums{
					padding: 10rpx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 24rpx;
					.color{
						color: #C70C15;
					}
					.num{
						color: #666;
					}
				}
				.desc{
					font-size: 24rpx;
					line-height: 1.5;
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
				}
			}
		}
	}
</style>
