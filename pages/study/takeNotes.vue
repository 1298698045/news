<template>
	<view class="wrapper">
		<cu-editor ref="editor" placeholder="输入笔记内容" :url="uploadUrl" :header="header" :formData="formData" :content="content" @before="onUploadBefore" @update="onUpdate" @save="onSave"></cu-editor>
	</view>
</template>

<script>
	import cuEditor from '@/components/cu-editor/cu-editor'
	export default {
		components:{
			cuEditor
		},
		data() {
			return {
				uploadUrl: '',
				header: {
					
				},
				formData: {
					
				},
				content: '',
				courseId: '',
				chapterId: '',
				name: '',
				takeId: ''
			}
		},
		onLoad(options) {
			this.name = options.name;
			this.courseId = options.courseId;
			this.chapterId = options.chapterId;
			this.getDetail();
		},
		methods: {
			getDetail(){
				this.$httpWX({
					url: "/entity/fetchall",
					method:'post',
					data:{
						objectTypeCode: 50714,
						filterQuery: '\nChapterId\teq\t' + this.chapterId
					}
				}).then(res=>{
					console.log(res);
					if(res.returnValue.nodes && res.returnValue.nodes.length>0){						
						this.content = res.returnValue.nodes[0].Body.value;
						this.takeId = res.returnValue.nodes[0].id;
					}
				})
			},
			onSave(e){
				this.content = e.html;
				console.log('onSave',e,this.content);
				this.submitSave().then(res=>{
					console.log('res',res)
					uni.showToast({
						title: '保存成功',
						icon: 'success',
						duration: 2000
					})
				})
			},
			async submitSave(){
				var obj = {
					params:{
						recordRep: {
							objTypeCode: 50714,
							id: this.takeId,
							fields: {
								Name: this.name,
								CourseId: {
									Id: this.courseId
								},
								ChapterId: {
									Id: this.chapterId
								},
								body: this.content
							}
						}
					}
				}
				let response;
				await this.$httpWX({
					url: '/entity/save',
					method: 'post',
					data: {
						message: JSON.stringify(obj)
					}
				}).then(res=>{
					response = res;
				})
				return response;
			},
			onUploadBefore(e){
				console.log('onUploadBefore',e);
			},
			onUpdate(e){
				console.log('onUpdate',e);
			}
		}
	}
</script>

<style lang="scss">
	.cu-editor{
		background: #FFFFFF !important;
	}
.ql-editor.ql-blank:before {
       color: #B2B2B2;
       font-style: normal;
    }
</style>
