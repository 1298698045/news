export const api_address = {
	login:{
		login:'/SystemUser/login/wechatauth'
	},
	// 新闻
	journalism:{
		column:'/NewsContent/ContentNewstype/newstypes',
		list: '/NewsContent/ContentSearch/contentbytypeid',
		detail: '/NewsContent/ContentDetails/contentdetail'
	},
	// 同志圈
	gayCircle:{
		list: '/MomentsContent/Moments/contentloadpage'
	}
}