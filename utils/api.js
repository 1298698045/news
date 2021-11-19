import {api_address} from './interface.js';
import {https}  from './requestHttps.js';

class api{
	async getLogin(data){
		const res = await https({
		    method: "get", // 请求方式
		    url: api_address.login.login, // 请求url
		    data: data,// 参数
		})
		return res
	}
	// 新闻栏目
	async getNewsColumn(data){
		const res = await https({
		    method: "get",
		    url: api_address.journalism.column,
		    data: data,
		})
		return res
	}
	async getNewsList(data){
		const res = await https({
		    method: "get",
		    url: api_address.journalism.list,
		    data: data,
		})
		return res
	}
	async getNewsDetail(data){
		const res = await https({
		    method: "get",
		    url: api_address.journalism.detail,
		    data: data,
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
}
export default new api()