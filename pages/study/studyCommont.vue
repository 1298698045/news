<template>
	<view class="wrapper">
		<div class="main-content">
			<div class="mainDetailComment">
				<div class="boxWrap" v-for="(item,index) in commentList" :key="index">					
					<div class="box">
						<div class="avatar">{{item.UserName || ''}}</div>
						<div class="info_view">
							<p class="nikeName">{{item.UserName || ''}}</p>
							<p class="time">{{item.CreatedOn || ''}}</p>
						</div>
						<div class="like_icon"></div>
					</div>
					<div class="contentWrap">
						<p class="content" v-html="item.Body"></p>
					</div>
					<div class="optionns" @click="handleLike(item)">
						<view class="btn">
							<tui-icon name="agree" :size="20" v-if="!item.IsPraise"></tui-icon>
							<tui-icon v-if="item.IsPraise" name="agree" :size="24" color="#d03a28" ></tui-icon>
						</view>
						<span v-if="!item.LikeQty">
						点赞
						</span>
						<span v-else>
							{{item.LikeQty || 0}}
						</span>
					</div>
				</div>
			</div>
			<div class="footer-btn">
				<div class="filed">
					<input type="type" v-model="comment" name="name" placeholder="输入评论内容" />
					<button style="margin-right:10px;" @click="sendComment">
						评论
					</button>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected: '1',
				sessionKey: '',
				id: '',
				record: {
					Name: '活动名称'
				},
				isSignUp: false,
				commentList: [
					{
						CreatedBy: '张三',
						Title: '这是测试数据',
						CreatedOn:'2022'
					}
				],
				comment:'',
				signObj:{},
				pageNumber:1,
				pageSize:10,
				isPage: false,
				courseId: '',
				chapterId: ''
			}
		},
		onLoad(options) {
			this.courseId = options.courseId;
			this.chapterId = options.chapterId;
			this.queryCommentList();
		},
		methods: {
			// 评论
			sendComment(){
				var obj = {
					params:{
						recordRep:{
							objTypeCode: 50715,
							fields: {
								Name: this.comment,
								RegardingId: {
									Id: this.chapterId
								},
								Body: this.comment
							}
						}
					}
				}
				const message = JSON.stringify(obj);
				this.$httpWX({
					url: '/entity/save',
					method:'post',
					data:{
						message: message
					}
				}).then(res=>{
					this.comment = '';
					this.queryCommentList();
				})
			},
			queryCommentList(){
				this.$httpWX({
					url: '/course/chapterpraise/commentdetaillistprs',
					method: 'get',
					data:{
						chapterId: this.chapterId
					}
				}).then(res=>{
					let total = res.total;
					if(this.pageNumber * this.pageSize < total){
						this.isPage = true;
					}else {
						this.isPage = false;
					}
					let result = [];
					if(this.pageNumber==1){
						result = res.returnValue;
					}else {
						result = this.commentList.concat(res.returnValue);
					}
					this.commentList = result;
				})
			},
			handleLike(item){
				var url = '/course/chapterpraise/praiseadd'
				if(item.IsPraise){
					url = '/course/chapterpraise/praiseadel'
				}
				this.$httpWX({
					url:url,
					data:{
						ChapterCommentId: item.CommentId
					},
					method: 'post'
				}).then(res=>{
					console.log(res);
					this.queryCommentList();
				})
			},
		},
		/**
		 * 页面上拉触底事件的处理函数
		 */
		onReachBottom() {
		   if(this.isPage){
			   this.pageNumber++;
			   this.queryCommentList();
		   }
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageNumber = 1;
			this.queryCommentList();
			wx.stopPullDownRefresh();
		},
	}
</script>

<style lang="scss">
    .search {
		position: absolute;
		left: 15px;
		top: 50%;
		transform: translateY(-50%);
		width: 10%;
		height: 50%;
	}
	.search i {
		font-size: 22px;
	}
    .list-item {
        padding:10px;
        background-color:white;
        margin-bottom: 20px;
    }

    .item-head {
        font-weight: 700;
        margin:10px 0;
        font-size:20px;
    }

    .item-body {
        margin: 5px 0;
        font-size: 14px;
        padding: 2px;
    }
    .img-content img{
        width:100%;
    }

    .item-img-body {
        display: flex;
    }

    .body-left {
        width: 120px;
        height: 120px;
    }

        .body-left img {
            width: 115px;
            height: 115px;
        }

    .body-right {
        flex: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
        font-size: 14px;
        padding: 2px;
        box-sizing: border-box;
    }

    .item-bottom {
        padding: 15px 10px;
        background-color: #f8f8f8;
        font-size: 12px;
        color: #999;
        display: flex;
        justify-content: space-between;
    }

    .item-bottom img {
        width: 14px;
        height: 14px;
        position: relative;
        top: 3px;
        margin-right: 3px;
    }
    .footer-btn{
        position:fixed;
        bottom:0;
        width:100%;
        background-color:white;
    }
    .footer-btn .mint-button{
        width:80%;
        margin:10px 10% 30px 10%;
        border-radius:20px;
    }
    #signing{
        display:none;
    }
    #signlist{
        /*display:none;*/
    }
    #signlist .signlist-right {
        width: 6px;
        height: 10px;
        position: relative;
        top: 0px;
        margin-left: 3px;
    }
    .filed{
        padding:5px 19px;
        display:flex;
    }
    .filed input{
        flex:1;
        height:30px;
        border:none;
        outline:0;
        font-size:12px;
        color:#333;
        background: #f3f5f4;
        border-radius: 15px;
        margin-right: 10px;
        padding-left: 10px;
    }
    .filed button{
        border:none;
        height:30px;
        line-height:30px;
        text-align:center;
        background:#d03a28;
        color:#fff;
        border-radius:3px;
		font-size: 24rpx;
    }
	.boxWrap{
		 border-top:1px solid #e2e3e5;
		 background:#fff;
		 padding: 10px 19px;
	}
    .mainDetailComment .box{
        display:flex;
    }
    .mainDetailComment .box .info_view{
        margin-left:10px;
    }
    .mainDetailComment .box .info_view .nikeName{
        font-size:14px;
        color:#d03a28;
    }
    .mainDetailComment .box .info_view .content{
        font-size:16px;
        color:#333;
        padding:5px 0;
    }
    .mainDetailComment .box .info_view .time{
        color:#cccccc;
        font-size:12px;
    }
	.contentWrap{
		font-size: 28rpx;
		color: #333333;
		padding: 20rpx 0 0 0;
	}
	.optionns{
		display: flex;
		align-items: center;
		font-size: 24rpx;
		color: #666666;
		.reply{
			font-size: 24rpx;
			color: #666666;
		}
	}
    .tabs{
        display:flex;
        padding:0 19px;
        background: #fff;
    }
    .tabs .tab{
        width: 75px;
        text-align: center;
        padding: 15px 0;
        font-size:15px;
        font-weight:bold;
        color:#333;
    }
    .tabs .tab.active{
        color: #d03a28;
        border-bottom:2px solid #d03a28;
    }
    .avatar {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 50%;
        background: #d03a28;
        color: #fff;
        text-align: center;
        font-size: 12px;
    }
</style>
