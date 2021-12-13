export const api_address = {
	login:{
		login:'/SystemUser/login/wechatauth'
	},
	// 新闻
	journalism:{
		column:'/NewsContent/ContentNewstype/newstypes',
		list: '/NewsContent/ContentSearch/contenttypeidsearch',
		// searchList: '/NewsContent/ContentSearch/contenttypeidsearch',
		detail: '/NewsContent/ContentDetails/contentdetail',
		cmtsList: '/NewsContent/ContentDetails/contentdetail/commentpagelist', // 新闻评论列表
		sendNesCmts: '/SystemUser/commentnew/commentnewsadd', // 新闻评论
		// sendNesCmts: '/WeatherForecast/NewsPraiseAdd',
		setLike: '/NewsContent/contentnewspraise/newspraiseadd', // 点赞
		delLike: '/NewsContent/contentnewspraise/newspraisedel', // 取消点赞
		collection: '/SystemUser/collectnews/collectnewsadd', // 收藏
		delCollection: '/SystemUser/collectnews/collectnewsdel', // 取消收藏
		channel: '/NewsContent/ContentPersonType/personnewtype', // 栏目
		myChannel:'/NewsContent/ContentPersonType/personnewtype' ,// 我的频道
		notChannel: '/NewsContent/ContentPersonType/personnewtypeother', // 未关注频道
		addChannel: '/NewsContent/ContentPersonType/personnewtypeadd', // 添加频道
		delChannel: '/NewsContent/ContentPersonType/personnewtypedel', // 删除
		commentLike: '/SystemUser/commentnew/comnewpraiseadd', // 评论点赞
		// commentCancelLike: '/SystemUser​/commentnew​/commentnewpraisedel' // 评论取消点赞
		commentCancelLike: '/SystemUser/commentnew/commentnewpraisedel'
	},
	// 同志圈
	gayCircle:{
		list: '/MomentsContent/Moments/contentloadpage', // 列表
		// send: '/MomentsContent/Moments/contentrelease', // 发布
		send: '/MomentsContent/Moments/contentreleaseform', // 发布
		upload: '/MomentsContent/Moments/contentreleasepic',
		addLike: '/MomentsContent/Moments/contentpraiseadd', // 点赞
		cancelLike: '/MomentsContent/Moments/contentpraisedel', // 取消点赞
		circleList: '/MomentsContent/Moments/contenttype', // 圈子
		detail: '/MomentsContent/Moments/contentdetails', // 详情
		commentList: '/MomentsContent/Moments/contentdetails/commentslist',// 评论列表
		addComment: '/SystemUser/commentmoments/commentmomentsadd', // 评论
		cmtLike: '/SystemUser/commentmoments/comchatpraiseadd', // 评论点赞
		cmtCancelLike: '/SystemUser/commentmoments/comchatpraisedel', // 取消评论点赞
		addcmtList :'/MomentsContent/Moments/contentdetails/commentdetaillis', // 追加评论
		personHome: '/MomentsContent/Moments/personhomepage', // 个人主页
		collection: '/SystemUser/collectchats/collectchatsadd',
		cancelCollection: '/SystemUser/Collectchats/Collectchatsdel',
		delCircle: '/MomentsContent/Moments/contentdel'
	},
	// 学习
	study:{
		list: '/HomePage/course/firstloaded', // 列表
		synopsis: '/homepage/course/synopsis', // 简介
		catalogue: '/homepage/course/catalogue', // 目录
		comment: '/homepage/course/comment', // 课程评价
		contents: '/homepage/course/contents', // 课程内容
		contentscomments: '/homepage/course/contentscomments', // 课程内容评价
		csuggest: '/homepage/course/csuggest', // 课程关联推荐
		favorStatus: '/SystemUser/collectcourse/getcollectcoursebyid',
		collection: '/SystemUser/collectcourse/collectcourseadd', // 收藏
		cancelCollection: '/SystemUser/collectcourse/collectcoursedel', // 取消收藏
		detail: '/HomePage/course/chapter',
		commentPage: '/HomePage/course/chaptercommentspage', // 学习评论列表
		sendComment: '/SystemUser/commentcourse/commentcourseadd',
		commentLike: '/SystemUser/commentcourse/commentchapterpraiseadd', // 评论点赞
		commentCancel: '/SystemUser/commentcourse/commentchapterpraisedel', // 取消点赞
	},
	// 考试
	exam:{
		classify:'/HomePage/exam/classify', // 考试分类
		subjectPaper:'/HomePage/exam/content/getfixedexampaperbysubject', // 根据科目获取个人试卷Id
		personPaper: '/HomePage/exam/content/getexampaper', // 根据个人试卷Id
		singleSubmit: '/HomePage/exam/content/exampaperanswer', // 考试答题 post 参数 Token，PaperId 试卷Id，ContactId 个人试卷Id，QuestionId 问题Id，QuestionType 问题类型，QuestionNumber 问题序号，AnswerOptionId 选项id，OptionNumber 选项序号，AnswerText (根据问题类型判断)闻题回答
		endPaper: '/HomePage/exam/content/examendpaper', // 考试结束 post 参数 Token，ValueId 个人试卷Id
		startPaper: '/HomePage/exam/content/examstartpaper', // 开始考试
	}
	
}
