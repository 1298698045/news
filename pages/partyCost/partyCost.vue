<template>
	<view>
		<div class="wrapper">
			<tui-table>
				<tui-tr>
					<tui-td bold v-for="(item,index) in header" :key="index" :span="8">{{item.title}}</tui-td>
				</tui-tr>
				<tui-tr v-for="(item, index) in listData" :key="index">
					<tui-td :span="8" v-for="(obj, idx) in header" :key="idx">{{obj.key == 'EmployeeId' ? item[obj.key].userValue.DisplayName : item[obj.key].value}}</tui-td>
				</tui-tr>
			</tui-table>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				header: [{
						title: '年份',
						key: 'YearNumber'
					},
					{
						title:'月份',
						key: 'MonthNumber'
					},
					{
						title: '姓名',
						key: 'EmployeeId'
					},
					{
						title: '费用',
						key: 'PartyFee'
					}
				],
				listData: [{
						id: 1,
						name: '张三',
						month: 1,
						cost: '100'
					}
				],
				userId: uni.getStorageSync('userId')
			}
		},
		onLoad() {
			this.getQuery();
		},
		methods: {
			getQuery(){
				// this.$http.getPartyCostList({
					
				// }).then(res=>{
				// 	console.log(res);
				// })
				this.$httpWX({
					url: '/entity/fetchall',
					method:"post",
					data:{
						objectTypeCode: 31301,
						filterquery: "\nemployeeid\teq-userid"
					}
				}).then(res=>{
					console.log(res,'res')
					this.listData = res.returnValue.nodes;
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
