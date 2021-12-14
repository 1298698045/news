<template>
	<div class="curriculum">
		<div class="box" v-for="(item,index) in list" :key="index" @click="handleClick(item,index)">
			<div class="left_cover">
				
			</div>
			<div class="right_info">
				<h3 class="title">
					{{item[name]}}
				</h3>
				<div class="position">
					<span class="tag">{{item[post] || ''}}</span>
					<span class="tag">{{item[duty] || ''}}</span>
				</div>
				<div class="nums">
					<span class="color">58</span>讲 | &nbsp;&nbsp;<span class="color">20000</span> 人已学习
				</div>
				<div class="desc">
					{{item[desc] || ''}}
				</div>
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
				width: 200rpx;
				height: 300rpx;
				background: #C70C15;
				border-radius: 20rpx;
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
					.color{
						color: #C70C15;
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
