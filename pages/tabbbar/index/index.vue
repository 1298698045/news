<template>
	<view class="wrapper">
		<div class="column">
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
			<div class="fake_item"></div>
			<div class="fake_item"></div>
		</div>
		<div class="hr"></div>
		<!-- <button @click="getLogin()">获取code</button> -->
	<!-- 	<h1 class="code">{{code}}</h1>
		<span class="tag" @click="handleCopyCode">复制</span> -->
<!-- 		<input class="inp" type="text" @input="handleInput">
		<p v-for="item in copyArr">{{item.name}}</p> -->
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
				code:''
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
page{
	background: #FFFFFF;
}
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
}
</style>
