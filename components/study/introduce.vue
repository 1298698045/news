<template>
	<div class="introduceWrap">
		<div class="panel introduce">
			<div class="name">简介</div>
			<div class="desc">
				党建学习除了传统方式以外，各大政府部门正在探索研究如何让学习跟具有沉浸感，
				和感知，通过VR技术还原历史，让大家一起参与和见证历史，将会是一种全新的学习方式
			</div>
		</div>
		<div class="panel notice">
			<div class="name">课程须知</div>
			<div class="desc">
				<div class="label">课前技术储备：</div>
				党建学习除了传统方式以外，各大政府部门正在探索研究如何让学习跟具有沉浸感，
				和感知，通过VR技术还原历史，让大家一起参与和见证历史，将会是一种全新的学习方式
			</div>
			<div class="hr"></div>
			<div class="name">
				老师告诉你能学到什么？
			</div>
			<div class="desc">
				1、SpringBoot 入门</br>
				2、基本构件项目配置</br>
				3、核心功能</br>
				4、数据层操作</br>
				5、模板静态化
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'Introduce',
		props:[],
		data(){
			return {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.name{
		font-size: 28rpx;
		color: #333333;
		font-weight: bold;
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.name::before{
		content:'';
		width:6rpx;
		height: 30rpx;
		background: #C70C15;
		display: block;
		border-radius: 5rpx;
		margin-right: 10rpx;
	}
	.panel{
		padding: 30rpx;
		box-sizing: border-box;
		background: #FFFFFF;
		// border-bottom: 1rpx solid #e2e3e5;
		margin-bottom: 20rpx;
		.desc{
			font-size: 28rpx;
			color: #333333;
			line-height: 1.5;
		}
	}
	.panel.notice{
		.desc{
			font-size: 24rpx;
			line-height:1.5;
			.label{
				padding-bottom: 20rpx;
			}
		}
		.hr{
			margin-top: 60rpx;
		}
	}
</style>
