<template>
	<div class="catalogue" id="catalogue">
		<div class="container">
			<div class="pannel" v-for="(item,index) in list" :key="index">
				<h3 class="title" @click="handleDetail(item,index)">
					第{{index+1}}章 {{item.Name}}
				</h3>
				<!-- <div class="uls">
					<div class="li" v-for="(row,idx) in item.Children" @click.stop="handleHref(row)">
						<p class="icon">
							
						</p>
						<p class="name">
							{{row.Name}}
						</p>
					</div>
				</div> -->
				<div v-if="item.Children && item.Children.length>0">
					<Catalogue :courseId="courseId" :list="item.Children" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Catalogue from '@/components/study/catalogue.vue';
	export default {
		name: 'Catalogue',
		components:{
			Catalogue
		},
		props:{
			list:{
				type: Array,
				default: []
			},
			courseId:{
				type:[Number, String, Object],
				dafault: ''
			},
			isModal:{
				type:[Number, String, Object],
				dafault: 0
			}
		},
		watch:{
			list:{
				handler(val){
					console.log(val,'===========')
				},
				immediate:true,
				deep:true
			}
		},
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
			// this.getQuery();
		},
		methods:{
			handleDetail(item,index){
				this.$nextTick(()=>{					
					if(this.isModal==1){
						this.$emit('changeParams',item);
					}else {
						uni.navigateTo({
							url:'./studyDetail?id='+item.chapterId + '&courseId='+this.courseId+'&level='+item.level + '&index=' + index
						})
					}
				})
			},
			getQuery(){
				// this.$http.getStudyCatalogue({
					
				// }).then(res=>{
				// 	console.log(res);
				// })
				this.$httpWX({
					url: '/course/'+ this.courseId +'/chapter/fetchall',
					method:'get',
					data:{
						search: ''
					}
				}).then(res=>{
					console.log(res)
					this.catalogueList = res.returnValue;
				})
			},
			handleHref(item){
				uni.navigateTo({
					url:'../../pages/study/studyArticle/studyArticle?chapterId='+item.chapterId
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.catalogue{
		// padding-bottom: 100rpx;
	}
	.container{
		padding: 20rpx 30rpx;
		background: #FFFFFF;
		.pannel{
			// margin-bottom: 30rpx;
			.title{
				font-size: 32rpx;
				font-weight: bold;
				color: #333333;
				// padding-bottom: 20rpx;
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
