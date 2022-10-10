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
				content: ''
			}
		},
		methods: {
			onSave(e){
				console.log('onSave',e);
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
