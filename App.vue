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
	/*每个页面公共css */
	[v-cloak]{
		display: none;
	}
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
	.iconfont{
		display: inline-block;
	}
	@font-face {
	  font-family: "iconfont"; /* Project id 3665209 */
	  src: url('//at.alicdn.com/t/c/font_3665209_rup89igen5.woff2?t=1664346026581') format('woff2'),
	       url('//at.alicdn.com/t/c/font_3665209_rup89igen5.woff?t=1664346026581') format('woff'),
	       url('//at.alicdn.com/t/c/font_3665209_rup89igen5.ttf?t=1664346026581') format('truetype');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icon-woyaoliuyan:before {
	  content: "\e7f5";
	}
	
	.icon-wodekecheng:before {
	  content: "\e7ee";
	}
	
	.icon-wodekaoshi:before {
	  content: "\e7ef";
	}
	
	.icon-wodehuodong:before {
	  content: "\e7f0";
	}
	
	.icon-wodewenjuan:before {
	  content: "\e7f1";
	}
	
	.icon-wodejifen:before {
	  content: "\e7f2";
	}
	
	.icon-wodezhibu:before {
	  content: "\e7f3";
	}
	
	.icon-wodejiaofei:before {
	  content: "\e7f4";
	}
	
	.icon-mimayincang2:before {
	  content: "\e650";
	}
	
	.icon-mimaxianshi:before {
	  content: "\e60e";
	}
	
	.icon-zhibuquan:before {
	  content: "\e7ec";
	}
	
	.icon-dangjianxuexi:before {
	  content: "\e7e8";
	}
	
	.icon-gonggao:before {
	  content: "\e7e7";
	}
	
	.icon-weizan:before {
	  content: "\e7e2";
	}
	
	.icon-yizan:before {
	  content: "\e7e3";
	}
	
	.icon-pinglun:before {
	  content: "\e7e4";
	}
	
	.icon-gengduo:before {
	  content: "\e7e5";
	}
	
	.icon-a-shoucang:before {
	  content: "\e7e6";
	}



</style>
