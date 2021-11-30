<template>
	<div class="catalogue" id="catalogue">
		<div class="container">
			<div class="pannel" v-for="(item,index) in catalogueList" :key="index" @click="handleHref(item,index)">
				<h3 class="title">
					第{{index+1}}章 {{item.name}}
				</h3>
				<div class="uls">
					<div class="li" v-for="(row,idx) in item.children">
						<p class="icon">
							
						</p>
						<p class="name">
							{{row.name}}
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Catalogue',
		data(){
			return {
				catalogueList:[
					{
						name:'入门SpringBoot2.x',
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
				]
			}
		},
		onReady() {
			this.getQuery();
		},
		methods:{
			getQuery(){
				this.$http.getStudyCatalogue({
					
				}).then(res=>{
					console.log(res);
				})
			},
			handleHref(item,index){
				uni.navigateTo({
					url:'../../pages/study/studyArticle/studyArticle'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.catalogue{
		padding-bottom: 100rpx;
	}
	.container{
		padding: 30rpx;
		background: #FFFFFF;
		.pannel{
			margin-bottom: 30rpx;
			.title{
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
				padding-bottom: 20rpx;
			}
			.uls{
				.li{
					display: flex;
					.name{
						flex: 1;
						font-size: 28rpx;
						color: #333333;
						line-height: 80rpx;
						height: 80rpx;
						border-bottom: 1rpx solid #e2e3e5;
					}
				}
			}
		}
	}
</style>
