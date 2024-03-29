// 区分开发环境和生产环境  接口地址
let baseUrl;

if (process.env.NODE_ENV === 'development') {
 baseUrl = 'http://182.92.221.64:10002/api'    // 开发环境
} else {
 baseUrl = 'http://182.92.221.64:10002/api'    // 生产环境
}

export function https(config) {
	console.log(config,'config')
 //显示loading
 wx.showLoading({
     title: '加载中...'
 }); 
 //设置请求头
 if(config.header){
	 
 }else {	 
	 config.header = {
		 'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
		 'token': wx.getStorageSync('wechatAuthToken')
	 };
	 // config.data.Token = uni.getStorageSync('wechatAuthToken') || ''
	 
 }
 //检查缓存中有没有token
 var token = wx.getStorageSync('wechatAuthToken');
 if (token != '') {
     config.header.Authorization = token
	 config.header.token = token
 }   
 config.url = baseUrl + config.url;   // 请求地址
 let promise = new Promise(function(resolve, reject) {
     uni.request(config).then(res => {
		 console.log(config,'config')
		 console.log('返回的数据：',res)
         wx.hideLoading()      //隐藏loading
         if (res[0]) {
             uni.showToast({
                 title: "数据获取失败",
                 icon: "none",
                 duration: 1500
             })
             resolve(false);
         } else {
             let data = res[1].data; 
             if (data.code == 1) {
                 resolve(data);
             } else {
                 resolve(data);
             }
         }
     }).catch(error => {
         wx.hideLoading()      //隐藏loading
         reject(error);
     })
 })
 return promise
}