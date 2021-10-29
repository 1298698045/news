<template>
	<view class="">
		<dragSort :list.sync="list" label="name" :columnNum="4" :columnSpace="20" :rowHeight="60" :rowSpace="20"></dragSort>

		<view>排序后的id顺序如下：</view>
		<view>{{list.map(item => item.id).join('，')}}</view>
		
	</view>
</template>

<script>
	import dragSort from '@/components/dragSort/dragSort.vue'

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

			}
		},
		onLoad() {

		},
		methods: {
			
		}
	}
</script>

<style>

</style>
