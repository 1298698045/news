import {api_address} from './interface.js';
import {https}  from './requestHttps.js';

class api{
	async getLogin(data){
		const res = await https({
		    method: "get", // 请求方式
		    url: api_address.login.login, // 请求url
		    data: data// 参数
		})
		return res
	}
	async getUserLogin(data){
		const res = await https({
		    method: "post",
		    url: api_address.login.userLogin,
		    data: data
		})
		return res
	}
	// 新闻栏目
	async getNewsColumn(data){
		const res = await https({
		    method: "get",
		    url: api_address.journalism.column,
		    data: data
		})
		return res
	}
	// 新闻评论列表
	async getNewsList(data){
		const res = await https({
		    method: "get",
		    url: api_address.journalism.list,
		    data: data
		})
		return res
	}
	// 新闻评论
	async sendNesCmts(data){
		const res = await https({
		    method: "post",
		    url: api_address.journalism.sendNesCmts,
		    data: data
		})
		return res
	}
	async getNewsDetail(data){
		const res = await https({
		    method: "get",
		    url: api_address.journalism.detail,
		    data: data
		})
		return res
	}
	async getCmtsList(data){
		const res = await https({
		    method: "get",
		    url: api_address.journalism.cmtsList,
		    data: data
		})
		return res
	}
	// 新闻点赞
	async getNewsLike(data){
		const res = await https({
		    method: "post",
		    url: api_address.journalism.setLike,
		    data: data
		})
		return res
	}
	// 取消点赞
	async delNewsLike(data){
		const res = await https({
		    method: "post",
		    url: api_address.journalism.delLike,
		    data: data
		})
		return res
	}
	// 新闻收藏
	async setNewsCollection(data){
		const res = await https({
		    method: "post",
		    url: api_address.journalism.collection,
		    data: data
		})
		return res
	}
	// 新闻频道
	async getChannle(data){
		const res = await https({
		    method: "get",
		    url: api_address.journalism.channel,
		    data: data
		})
		return res
	}
	async getMyChannle(data){
		const res = await https({
		    method: "get",
		    url: api_address.journalism.myChannel,
		    data: data
		})
		return res
	}
	async getNotChannle(data){
		const res = await https({
		    method: "get",
		    url: api_address.journalism.notChannel,
		    data: data
		})
		return res
	}
	async setAddChannle(data){
		const res = await https({
		    method: "post",
		    url: api_address.journalism.addChannel,
		    data: data
		})
		return res
	}
	async setDelChannle(data){
		const res = await https({
		    method: "post",
		    url: api_address.journalism.delChannel,
		    data: data
		})
		return res
	}
	async delNewsCollection(data){
		const res = await https({
		    method: "post",
		    url: api_address.journalism.delCollection,
		    data: data
		})
		return res
	}
	// 新闻评论点赞
	async commentLike(data){
		const res = await https({
		    method: "post",
		    url: api_address.journalism.commentLike,
		    data: data
		})
		return res
	}
	// 新闻评论取消点赞
	async commentCancelLike(data){
		const res = await https({
		    method: "post",
		    url: api_address.journalism.commentCancelLike,
		    data: data
		})
		return res
	}
	// 同志圈
	async getGayCircleList(data){
		const res = await https({
			method: "get",
			url: api_address.gayCircle.list,
			data: data
		})
		return res;
	}
	// 同志圈发送
	async submitGayCircleSend(data){
		const res = await https({
			method: "post",
			url: api_address.gayCircle.send,
			// header:{
			// 	'content-type': 'multipart/form-data; boundary=XXX'
			// },
			data: data
		})
		return res;
	}
	async setLikeGayCircle(data){
		const res = await https({
		    method: "post",
		    url: api_address.gayCircle.addLike,
		    data: data
		})
		return res
	}
	async cancelLikeGayCircle(data){
		const res = await https({
		    method: "post",
		    url: api_address.gayCircle.cancelLike,
		    data: data
		})
		return res
	}
	// 圈子
	async getCircleList(data){
		const res = await https({
		    method: "get",
		    url: api_address.gayCircle.circleList,
		    data: data
		})
		return res
	}
	async getCircleDetail(data){
		const res = await https({
		    method: "get",
		    url: api_address.gayCircle.detail,
		    data: data
		})
		return res
	}
	async getCircleCommentList(data){
		const res = await https({
		    method: "get",
		    url: api_address.gayCircle.commentList,
		    data: data
		})
		return res
	}
	async getCircleAddComment(data){
		const res = await https({
		    method: "post",
		    url: api_address.gayCircle.addComment,
		    data: data
		})
		return res
	}
	async setCircleCmtLike(data){
		const res = await https({
		    method: "post",
		    url: api_address.gayCircle.cmtLike,
		    data: data
		})
		return res
	}
	async delCircleCmtLike(data){
		const res = await https({
		    method: "post",
		    url: api_address.gayCircle.cmtCancelLike,
		    data: data
		})
		return res
	}
	// 朋友圈追加评论
	async getCircleAddcmtlist(data){
		const res = await https({
		    method: "get",
		    url: api_address.gayCircle.addcmtList,
		    data: data
		})
		return res
	}
	async getCirclePersonList(data){
		const res = await https({
		    method: "get",
		    url: api_address.gayCircle.personHome,
		    data: data
		})
		return res
	}
	async getCircleCollection(data){
		const res = await https({
		    method: "post",
		    url: api_address.gayCircle.collection,
		    data: data
		})
		return res
	}
	async getCircleCancelCollection(data){
		const res = await https({
		    method: "post",
		    url: api_address.gayCircle.cancelCollection,
		    data: data
		})
		return res
	}
	async deleteCircle(data){
		const res = await https({
			method: 'post',
			url: api_address.gayCircle.delCircle,
			data: data
		})
		return res;
	}
	// 学习模块
	async getStudyList(data){
		const res = await https({
			method:'get',
			url: api_address.study.list,
			data: data
		})
		return res;
	}
	// 简介
	async getStudyInterface(data){
		const res = await https({
			method:'get',
			url: api_address.study.synopsis,
			data: data
		})
		return res;
	}
	async getStudyCatalogue(data){
		const res = await https({
			method:'get',
			url: api_address.study.catalogue,
			data: data
		})
		return res;
	}
	// 课程评价
	async getStudyComment(data){
		const res = await https({
			method:'get',
			url: api_address.study.comment,
			data: data
		})
		return res;
	}
	async getStudyCsuggest(data){
		const res = await https({
			method:'get',
			url: api_address.study.csuggest,
			data: data
		})
		return res;
	}
	async getStudyCollection(data){
		const res = await https({
			method:'post',
			url: api_address.study.collection,
			data: data
		})
		return res;
	}
	async getStudyCancelCollection(data){
		const res = await https({
			method:'post',
			url: api_address.study.cancelCollection,
			data: data
		})
		return res;
	}
	async getStudyFavor(data){
		const res = await https({
			method:'get',
			url: api_address.study.favorStatus,
			data: data
		})
		return res;
	}
	async getStudyDetail(data){
		const res = await https({
			method:'get',
			url: api_address.study.detail,
			data: data
		})
		return res;
	}
	// 详情评论列表
	async getStudyCommentList(data){
		const res = await https({
			method:'get',
			url: api_address.study.commentPage,
			data: data
		})
		return res;
	}
	async getStudySendComment(data){
		const res = await https({
			method:'post',
			url: api_address.study.sendComment,
			data: data
		})
		return res;
	}
	async getStudyCommentLike(data){
		const res = await https({
			method:'post',
			url: api_address.study.commentLike,
			data: data
		})
		return res;
	}
	async getStudyCancelCommentLike(data){
		const res = await https({
			method:'post',
			url: api_address.study.commentCancel,
			data: data
		})
		return res;
	}
	// 考试
	// 分类
	async getExamClassQuery(data){
		const res = await https({
			method:'get',
			url: api_address.exam.classify,
			data: data
		})
		return res;
	}
	// 收藏试卷
	async collectionSinglePaper(data){
		const res = await https({
			method:'post',
			url: api_address.exam.collection,
			data: data
		})
		return res;
	}
	async cancelCollectionSinglePaper(data){
		const res = await https({
			method:'post',
			url: api_address.exam.cancelCollection,
			data: data
		})
		return res;
	}
	// 获取试卷
	async getExamSubjectPaper(data){
		const res = await https({
			method:'get',
			url: api_address.exam.subjectPaper,
			data: data
		})
		return res;
	}
	async getExamPersonPaper(data){
		const res = await https({
			method:'get',
			url: api_address.exam.personPaper,
			data: data
		})
		return res;
	}
	// 单个题目提交
	async examSinglePaper(data){
		const res = await https({
			method:'post',
			url: api_address.exam.singleSubmit,
			data: data
		})
		return res;
	}
	// 开始考试
	async examStartPaper(data){
		const res = await https({
			method:'post',
			url: api_address.exam.startPaper,
			data: data
		})
		return res;
	}
	// 结束考试
	async examEndPaper(data){
		const res = await https({
			method:'post',
			url: api_address.exam.endPaper,
			data: data
		})
		return res;
	}
	// 学习积分
	async integralList(data){
		const res = await https({
			method:'get',
			url: api_address.integral.list,
			data: data
		})
		return res;
	}
	async getIntegralInfo(data){
		const res = await https({
			method:'get',
			url: api_address.integral.info,
			data: data
		})
		return res;
	}
	// 留言
	async submitFeedback(data){
		const res = await https({
			method:'post',
			url: api_address.feedback,
			data: data
		})
		return res;
	}
	async getPartyCostList(data){
		const res = await https({
			method: 'get',
			url: api_address.partyCost,
			data: data
		})
		return res;
	}
	// 获取活动列表
	async getActivityList(data){
		const res = await https({
			method: 'get',
			header:{
				
			},
			url: api_address.activity.list,
			data: data
		})
		return res;
	}
}
export default new api()