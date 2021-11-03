const tui = {
	toast: function(options={}) {
		let text,icon, duration,deltaTime,success;
		text = options.text;
		icon = options.icon;
		duration = options.duration || 2000
		success = options.success;
		deltaTime = options.deltaTime || 1
		uni.showToast({
			title: text || "出错啦~",
			icon: icon,
			duration: duration || 2000,
			success:(res)=>{
				console.log(res)
				if (res.errMsg=='showToast:ok') {
					setTimeout(()=>{
						success && success()
					},deltaTime * 1000)
				} else {
					success && success()
				}
			}
		})
	},
	modal:function(title, content, showCancel, callback, confirmColor, confirmText, cancelColor, cancelText){
		uni.showModal({
			title: title || '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: "#555",
			confirmColor: confirmColor || "#5677fc",
			confirmText: confirmText || "确定",
			cancelText: cancelText || '取消',
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	},
	isPhoneX: function() {
		const res = uni.getSystemInfoSync();
		console.log(res)
		let iphonex = false;
		if (res.safeArea.top > 20 && res.model.search('iPhone')!=-1) { //x及以上的异形屏top为44，非异形屏为20
			// 可以将结果存到globalData：
			iphonex = true;
		}
		return iphonex;
	},
	isIphone:function(){
		const res = uni.getSystemInfoSync();
		let iphone = false;
		if(res.model.search('iPhone')!=-1){
			return true;
		}
		return iphone;
	}
}
export default tui;