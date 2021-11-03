<template>
	<view class="wrapper">
		<div class="columns">
			<div class="box" @click="handleHref(1)">
				考试
			</div>
			<div class="box">
				学习
			</div>
			<input class="inp" type="text" @input="handleInput">
			<p v-for="item in copyArr">{{item.name}}</p>
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
				copyArr:[]
			}
		},
		onLoad() {
			console.log(this.arr,this.arr.length)
			const copyArr = this.recursionFun(this.arr);
			console.log(copyArr,copyArr.length)
		},
		methods: {
			handleHref(i){
				switch(i){
					case 1:
						uni.navigateTo({
							url:'../../examination/examination'
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
				// const temp = this.temp;
				// arr.forEach(item=>{
				// 	this.temp.push(item);
				// 	if(item.children && item.children.length>0){
				// 		this.recursionFun(item.children);
				// 	}
				// })
				// const data = temp.filter(item=> RegExp(name).test(item.name));
				// return this.unique(data);
				var that = this;
				let data=arr.filter(item=> RegExp(name).test(item.name)).map((item)=>{
					item=Object.assign({},item)
					if(item.children){
						//递归循环
						item.children=that.recursionFun(item.children,name)
					}
					return item
				})
				return data
			},
			handleInput(e){
				this.searchName = e.detail.value;
				this.copyArr = this.recursionFun(this.arr,this.searchName);
				console.log(this.copyArr)
			}
		}
	}
</script>

<style>
.inp{
	width: 100px;
	height: 30px;
	border: 1px solid #ccc;
	background: #FFFFFF;
}
</style>
