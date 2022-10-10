const messageToast = (message = {}) => {
	let duration, icon, success, fail, delta, deltaTime;
	duration = message.duration;
	icon  = message.icon || '';
	success = message.success || '';
	fail = message.fail || '';
	delta = message.delta || 1;
	deltaTime = message.deltaTime || 2;
	uni.showToast({
		...message,
		success: () => {
			success && success();
			if(delta && delta > 0){
				setTimeout(()=>{
					uni.navigateBack({
						delta:delta
					})
				},deltaTime * 1000)
			}
		}
	})
}