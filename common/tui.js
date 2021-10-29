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
	modal:function(title, content, showCancel, callback, confirmColor, confirmText){
		uni.showModal({
			title: title || '提示',
			content: content,
			showCancel: showCancel,
			cancelColor: "#555",
			confirmColor: confirmColor || "#5677fc",
			confirmText: confirmText || "确定",
			success(res) {
				if (res.confirm) {
					callback && callback(true)
				} else {
					callback && callback(false)
				}
			}
		})
	}
}
export default tui;