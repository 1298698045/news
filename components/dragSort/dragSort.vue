<template>
	<view>
		<view class="dragSortBox">
			<!-- <view class="dragSortBox-btns">
				<template v-if="isEdit">
					<text class="dragSortBox-btn" @click="toggleEdit('finish')">完成</text>
					<text class="dragSortBox-btn" @click="toggleEdit('cancel')">取消</text>
					
				</template>
				<text v-else class="dragSortBox-btn" @click="toggleEdit('edit')">编辑</text>
			</view> -->
			<movable-area id="dragSortArea" class="dragSort-area" :style="{height: boxHeight + 'px'}">
				<block v-for="(item,index) in cloneList" :key="item.id">
					<movable-view class="dragSort-view" direction="all"
						:class="{'is-touched': item.isTouched}"
						:x="item.x" :y="item.y"
						:damping="40"
						:disabled="!isEdit"
						@click="!isEdit && onClick($event,item)"
						@change="onChange($event, item)"
						@touchstart="onTouchstart(item)"
						@touchend="onTouchend(item, index)"
						:style="{width: columnWidth + 'px', height: rpxTopx(rowHeight) + 'px', zIndex: item.zIndex}">
						<view class="dragSort-view__con">
							<view class="dragSort-view__label is-ellipsis">{{item[label]}}</view>
							<view class="dragSort-view__btn-del" @click.stop="handleDel(item)">
								<tui-icon v-if="isEdit" name="shut" size='10'></tui-icon>
							</view>
							<!-- <text class="dragSort-view__btn-del" v-if="isEdit" @click="handleDel(item)">X</text> -->
						</view>
					</movable-view>
					
				</block>
			</movable-area>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				cloneList: [], //用来展示的数据列表
				cacheList: [], //用来在点击“编辑”文字按钮的时候，将当前list的数据缓存，以便在取消的时候用到
				positionList: [], //用来存储xy坐标定位的列表
				columnWidth: 0, //列宽，单位px
				rowNum: 1, //行数
				boxHeight: 10, //可拖动区域的高度，单位px
				windowWidth: 750, //系统获取到的窗口宽度，单位px
				curTouchPostionIndex: 0, //当前操作的移动块在positionList队列里的索引
				xMoveUnit: 0, //沿x轴移动时的单位距离，单位px
				yMoveUnit: 0, //沿y轴移动时的单位距离，单位px
				clearT: '', //onChange事件中使用
				clearF: '', //点击“完成”文字按钮时使用
				// isEdit: false, //是否在编辑状态
			}
		},
		props: { //props里属性Number的单位都为rpx，在操作的时候需要用rpxTopx进行转换
			list: { //源数据列表
				type: Array,
				default () {
					return [{
						"name": "互联网",
						"id": 1, //id必传且唯一
					}, {
						"name": "古董",
						"id": 20
					}]
				}
			},
			label: { //list队列中的对象中要用来展示的key名
				type: String,
				default: 'name'
			},
			rowHeight: { //行高，单位rpx
				type: Number,
				default: 60
			},
			rowSpace: { //行间距，单位rpx
				type: Number,
				default: 15
			},
			columnSpace: { //列间距，单位rpx
				type: Number,
				default: 15
			},
			columnNum: { //列数
				type: Number,
				default: 4
			},
			zIndex: { //可移动项的默认z-index
				type: Number,
				default: 100
			},
			isEdit:{
				type:Boolean,
				default: false
			}
		},
		computed: {
			btnText() {
				return this.isEdit ? '完成' : '编辑'
			}
		},
		created() {
			this.windowWidth = uni.getSystemInfoSync().windowWidth;

		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			console.log('query',query)
			query.select('#dragSortArea').boundingClientRect(data => {
				console.log("得到布局位置信息" + JSON.stringify(data));
				this.columnWidth = (data.width - (this.columnNum - 1) * this.rpxTopx(this.columnSpace)) / this.columnNum
				this.handleListData();
			}).exec();
		},
		methods: {
			/* 切换编辑状态
			 * [type] String 参数状态
			 */
			toggleEdit(type) {
				if(type == 'finish') { //点击“完成”
					// this.isEdit = false;
					this.$emit('changeEdit',false);
					console.log(this.getSortedIdArr(), 'sortedIdArr')
					
				}else if(type == 'cancel'){ //点击“取消”，将数据恢复到最近一次编辑时的状态
					// this.isEdit = false;
					this.$emit('changeEdit',false);
					this.updateList(this.cacheList);
					
				}else if(type == 'edit'){ //点击“编辑”
					// this.isEdit = true;
					this.$emit('changeEdit',true);
					this.cacheList = JSON.parse(JSON.stringify(this.list));
					
				}
			},
			
			/* 更新父组件的list，并重新渲染布局 
			 * 有改变数组长度的操作内才需要调用此方法进行重新渲染布局进行更新，
			 * 否则直接$emit('update:list')进行更新，无须调用此方法
			 */
			updateList(arr) {
				this.$emit('update:list', arr);
				setTimeout(() => {
					this.handleListData()
				}, 100)
			},
			
			/* 删除某项 */
			handleDel(obj) {
				// for(var i = 0, len = this.list.length; i < len; i++) {
				// 	var item = this.list[i];
				// 	if(obj.id == item.id) {
				// 		var theList = JSON.parse(JSON.stringify(this.list));
				// 		theList.splice(i, 1);
				// 		this.updateList(theList);
				// 		break;
				// 	}
				// }
				this.$emit('del',obj);
			},
			
			/* 处理源数据列表，生成展示用的cloneList和positionList布局位置信息 */
			handleListData() {
				this.cloneList = JSON.parse(JSON.stringify(this.list));
				this.positionList = [];
				this.rowNum = Math.ceil(this.cloneList.length / this.columnNum);
				this.boxHeight = this.rowNum * this.rpxTopx(this.rowHeight) + (this.rowNum - 1) * this.rpxTopx(this.rowSpace);
				this.xMoveUnit = this.columnWidth + this.rpxTopx(this.columnSpace);
				this.yMoveUnit = this.rpxTopx(this.rowHeight) + this.rpxTopx(this.rowSpace);
				this.cloneList.forEach((item, index) => {
					item.sortNumber = index;
					item.zIndex = this.zIndex;
					item.x = this.xMoveUnit * (index % this.columnNum); //单位px
					item.y = Math.floor(index / this.columnNum) * this.yMoveUnit; //单位px
					this.positionList.push({
						x: item.x,
						y: item.y,
						id: item.id,
					})
				})
			},
			
			/* 找到id在位置队列positionList里对应的索引 */
			findPositionIndex(id) {
				var resultIndex = 0;
				for(var i = 0, len = this.positionList.length; i < len; i++) {
					var item = this.positionList[i];
					if(item.id == id) {
						resultIndex = i;
						break;
					}
				}
				return resultIndex
			},
			
			/* 触摸开始 */
			onTouchstart(obj) {
				if(!this.isEdit) {
					return false
				};
				
				this.curTouchPostionIndex = this.findPositionIndex(obj.id);
				
				// 将当前拖动的模块zindex调成当前队列里的最大
				this.cloneList.forEach((item, index) => {
					if(item.id == obj.id) {
						item.zIndex = item.zIndex + 100000;
						item.isTouched = true;
					}else {
						item.zIndex = this.zIndex + index + 1;
						item.isTouched = false;
					}
				})
				this.$set(this.cloneList, 0, this.cloneList[0])
				
				
			},
			
			/* 触摸结束 */
			onTouchend(obj) {
				if(!this.isEdit) {
					return false
				};
				this.startSort(this.curTouchPostionIndex, 'onTouchend'); //再次调用并传参数‘onTouchend’，使拖动后且没有找到目标位置的滑块归位
				
			},
			onClick(e,obj){
				this.$emit('clickSelect', obj)
			},
			/* 移动过程中触发的事件（所有移动块只要一有移动都会触发） */
			onChange(e, obj) {
				if(!this.isEdit) {
					return false
				};
				var theX = e.detail.x,
					theY = e.detail.y,
					curCenterX = theX + this.columnWidth / 2,
					curCenterY = theY + this.rpxTopx(this.rowHeight) / 2;
				
				if(e.detail.source === 'touch') { //表示由“拖动”触发
					var targetIndex = this.findTargetPostionIndex({
						curCenterX,
						curCenterY,
					})
					
					clearTimeout(this.clearT)
					this.clearT = setTimeout(() => {
						this.$nextTick(() => {
							this.startSort(targetIndex); //根据targetIndex将队列进行排序
							
						})
						
					}, 100)
					
					
				}
			},
			
			/* 根据targetIndex将cloneList进行排序
			 * [targetIndex] Number 当前拖动的模块拖动到positionList队列里的目标位置的索引
			 * [type] String 值为onTouchend时，再次调用set方法
			 */
			startSort(targetIndex, type) {
				var curTouchId = this.positionList[this.curTouchPostionIndex].id;
				if(this.curTouchPostionIndex < targetIndex) {
					for(var i = 0, len = this.positionList.length; i < len; i++) {
						var curItem = this.positionList[i];
						var nextItem = this.positionList[i + 1] || this.positionList[this.positionList.length - 1];
						if(i >= this.curTouchPostionIndex && i <= targetIndex) { //找到要进行位移的索引集
							if(i == targetIndex) {
								curItem.id = curTouchId;
							}else {
								curItem.id = nextItem.id;
							}
						}
					}
					
				}else {
					var clonePostionList = JSON.parse(JSON.stringify(this.positionList));
					for(var i = 0, len = this.positionList.length; i < len; i++) {
						var curItem = this.positionList[i];
						var preItem = this.positionList[i - 1] || this.positionList[0];
						if(i >= targetIndex && i <= this.curTouchPostionIndex) { //找到要进行位移的索引集
							if(i == targetIndex) {
								curItem.id = curTouchId;
							}else{
								curItem.id = clonePostionList[i - 1].id;
							}
						}
					}
				}
				
				this.cloneList.forEach(item => {
					item.x += 0.001;
					item.y += 0.001;
				})
				
				if(type == 'onTouchend') {
					this.$set(this.cloneList, 0, this.cloneList[0])
				}
				
				this.$nextTick(() => {
					this.cloneList.forEach(item => {
						for(var i = 0, len = this.positionList.length; i < len; i++) {
							var item02 = this.positionList[i];
							if(item.id == item02.id) {
								item.x = item02.x;
								item.y = item02.y;
							}
						}
					})
					this.$set(this.cloneList, 0, this.cloneList[0])
					this.curTouchPostionIndex = targetIndex
					
					this.handleEmitData(); //需要在onChange事件里发射信息出去最稳妥，因为在快速拖动释放鼠标的时候该事件会再onTouchend后执行
					
				})
				
			},
			
			/* 处理要发射出去的数据队列，将排序后的结果同步到父组件的list */
			handleEmitData() {
				var idArr = this.getSortedIdArr();
				var emitList = [];
				idArr.forEach(id => {
					for(var i = 0, len = this.list.length; i < len; i++) {
						var item = this.list[i];
						if(id == item.id) {
							emitList.push(item);
							break;
						}
					}
				})
				this.$emit('update:list', emitList);
			},
			
			/* 获取最后的排序完的id队列集 */
			getSortedIdArr() {
				return this.positionList.map(item => item.id)
			},
			
			/* 找出拖动到positionList队列里的哪个目标索引
			 * [curObj.curCenterX], Number 当前拖动的模块的中心点x轴坐标
			 * [curObj.curCenterY], Number 当前拖动的模块的中心点y轴坐标
			 * return 返回拖动到的目标索引
			 */
			findTargetPostionIndex(curObj) {
				var resultIndex = this.curTouchPostionIndex;
				for(var i = 0, len = this.positionList.length; i < len; i++) {
					var item = this.positionList[i];
					if(curObj.curCenterX >= item.x && curObj.curCenterX <= item.x + this.columnWidth) {
						if(curObj.curCenterY >= item.y && curObj.curCenterY <= item.y + this.rpxTopx(this.rowHeight)) {
							resultIndex = i;
							break;
						}
					}
				}
				return resultIndex;
			},
			
			/* prx转换成px，返回值还是不带px单位的Number */
			rpxTopx(v) {
				return this.windowWidth * v / 750
			}
		},
		watch: {
			list() {
				this.handleListData();
			}
		}
	}
</script>

<style scoped>
	.is-ellipsis { white-space: nowrap; overflow: hidden; text-overflow: ellipsis;}
	.dragSort-wrap {}

	.dragSortBox {
		padding: 20rpx;
	}
	.dragSortBox-btns { padding: 20rpx; margin-bottom: 20rpx; text-align: right; color: red;}
	.dragSortBox-btn { margin-left: 20rpx;}

	.dragSort-area {
		width: 100%;
		background-color: tansparent;
	}

	.dragSort-view {
		text-align: center;
		background: #EEEEEE;
		border-radius: 5rpx;
		font-size: 24rpx;
		color: #333333;
	}
	.dragSort-view.disabled{
		pointer-events: none;
	}
	.dragSort-view.is-touched { opacity: .9;}
	.dragSort-view__con { position: relative; height: 100%;}
	.dragSort-view__label { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); max-width: 100%;}
	.dragSort-view__btn-del { position: absolute; right: 10rpx; top: 8rpx; transform: translate(50%, -50%);}
</style>
