<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/*每个页面公共css */
	page{
		background: #f4f4f4;
	}
	button::after{
		content: '';
		border: none!important;
	}
	[v-cloak] {
	  display: none;
	}
</style>
