<template>
	<view class="wrapper">
		<div class="header">
			<div class="title">
				{{detail.name}}
			</div>
			<div class="info">
				<span class="time">
					{{detail.modifiedOn}}
				</span>
				<span class="author">作者</span>
			</div>
			<div class="cover">
				<div class="row">
					<p class="name">
						《党建学习》
					</p>
					<p class="tag" @click="handleBack">课程介绍 <tui-icon class="icon" name="arrowright" size='20' color="#d03a28"></tui-icon></p>
				</div>
				<div class="banner">
					
				</div>
			</div>
			<div class="play">
				<div class="d_left">
					<p class="name">讲述：名称</p>
					<p class="desc">
						<span>
							时常：08:08
						</span>
						<span>
							大小9.7MB
						</span>
					</p>
				</div>
				<div class="d_right">
					
				</div>
			</div>
		</div>
		<div class="center">
			<div class="container">
				 <rich-text :nodes="detail.description"></rich-text>
			</div>
			<div class="hr"></div>
			 <div class="commentWrap">
			 	<view class="tui-cmt-title">精彩留言（{{commentTotal || 0}}）</view>
			 	<view class="tui-cmtbox">
			 		<view class="tui-cmt-cell" v-for="(item, index) in cmtList" :key="index">
			 			<image :src="item.thumbnailPath" class="tui-avatar"></image>
			 			<view class="tui-cmt-detail">
			 				<view class="tui-header-box">
			 					<view class="tui-cmt-nickname">{{ item.userName }}</view>
			 					<view class="tui-fabulous" :class="[item.isPraise ? 'tui-primary' : '']" :id="index" @tap="cmtFabulous(item)">
			 						<text>{{ item.likeQty == 0 ? '赞' : item.likeQty }}</text>
			 						<tui-icon :name="iconName(item.isPraise)" :size="15" :color="itemIconColor(item.isPraise)"></tui-icon>
			 					</view>
			 				</view>
			 				<view class="tui-cmt-content">{{ item.comment }}</view>
			 				<view class="tui-reply-box" v-if="item.courseChapterCommentBases">
			 					<tui-list-cell
			 						backgroundColor="#f2f2f2"
			 						:size="28"
			 						v-for="(items, index2) in item.courseChapterCommentBases"
			 						:key="index2"
			 						:unlined="item.replayNum < 2 && item.courseChapterCommentBases.length - 1 == index"
			 						@tap="cmtReply(items)"
			 					>
			 						<view class="tui-flex-1 tui-reply-nickname">{{ items.userName }}</view>
			 						<view class="tui-flex-1">{{ items.comment }}</view>
			 					</tui-list-cell>
			 					<tui-list-cell padding="20rpx 30rpx" backgroundColor="#f2f2f2" :size="28" :unlined="true" v-if="item.replayNum > 2" @tap="cmtReply">
			 						<view class="tui-flex-1  tui-cell-last">
			 							<text>共{{ item.replayNum }}条回复</text>
			 							<tui-icon name="arrowright" :size="22" color="#d03a28"></tui-icon>
			 						</view>
			 					</tui-list-cell>
			 				</view>
			 				<view class="tui-footer">
			 					{{ item.modifiedOn }}
			 					<view class="tui-primary tui-ml" hover-class="opcity" :hover-start-time="150" @tap="cmtReply(item)">回复</view>
			 				</view>
			 			</view>
			 		</view>
			 	</view>
			 </div>
		</div>
		<div class="footer">
			<div class="comment" :class="{'active':isPhoneX}">
				<div class="inp" @click="handleRoute">
					我来说两句
				</div>
				<div class="collection" @click="FavorSubject">
					<p>
						<tui-icon name="star" size="20" v-if="!detail.isCollect"></tui-icon>
						<tui-icon name="star-fill" color="#d03a28" size="20" v-if="detail.isCollect"></tui-icon>
					</p>
					<!-- <p class="num" :class="{'active':detail.isCollect}">0</p> -->
				</div>
			</div>
		</div>
		<div class="reply" catchtouchmove="true" v-if="isShow" @tap="handleClose">
			<div class="content" :style="{'bottom':keyboardHeight+'px'}" @click.stop>
				<div class="bd">
					<div class="rowText">
						<p class="text">留言</p>
						<p class="text" @click.stop="handleClose">取消</p>
					</div>
					<div class="cont">
						<textarea class="textarea" @input.stop="handleInp" v-model="comment" fixed="true"  confirm-hold="true" :adjust-position="false" :show-confirm-bar="false" cursor-spacing='140' placeholder="我来说两句..." :auto-focus="true" name="" id="" maxlength="500" cols="30" rows="10"></textarea>
					</div>
					<div class="send">
						<button class="btn" @click.stop="handleSend()">发送</button>
					</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article:`
					<div class="wp_articlecontent"><p><span lang="EN-US" style="font-family:calibri;font-size:19px;mso-bidi-font-size:15px;"><span lang="EN-US" style="font-family:calibri;font-size:19px;mso-bidi-font-size:15px;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3</span><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">月</span><span lang="EN-US" style="font-family:calibri;font-size:19px;mso-bidi-font-size:15px;">1</span><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">日下午，我院</span><span lang="EN-US" style="font-family:calibri;font-size:19px;mso-bidi-font-size:15px;">2019</span><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">年春季新学期教职工大会在四牌楼校区礼东</span><span lang="EN-US" style="font-family:calibri;font-size:19px;mso-bidi-font-size:15px;">202</span><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">教室召开，全院</span><span lang="EN-US" style="font-family:calibri;font-size:19px;mso-bidi-font-size:15px;">50</span><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">余名教职工参加了大会。会议由院党委书记王军主持。</span></span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">会上，学院领导就</span><span lang="EN-US" style="font-family:calibri;font-size:19px;mso-bidi-font-size:15px;">2019</span><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">年度分管工作重点以及党风廉政责任制落实情况向全院教职工进行了汇报。</span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">王军书记首先报告了学院党委上半年的工作要点，主要涉及党建工作、学院行政换届、年度绩效考核方案修订、学院文化建设等方面。</span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">宋爱国院长指出，今年学院将继续以人才建设为中心，努力做好双一流学科建设、高水平人才引进、国际合作、人才培养等工作。</span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">科研工作方面，李宏生副院长介绍了学院在国家自然科学基金申报及命中、科研经费到款、论文发表、专利申请等科研工作情况，虽取得了一定成绩，但离学校下达考的核指标还有差距，后期希望全院老师加倍重视各类重大重点项目的谋划及申报工作，同心协力，争取更大的进步。同时，李院长还详细解读了科研方面</span><span lang="EN-US" style="font-family:calibri;font-size:19px;mso-bidi-font-size:15px;">KPI</span><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">考核指标。</span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">本科生和研究生教学方面，祝雪芬副院长介绍了在本科人才培养、品牌专业建设、课程建设等方面的重点工作。研究生教学则将重点围绕研究生培养方案修订、研究生招生、学术诚信等方面开展。希望学院老师积极支持学院教学工作，努力实现培养一流人才的目标。</span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">学生工作方面，将以党建工作为龙头，抓好就业引导、社会实践、创新创业教育等工作，努力做好学生的思想引领与价值塑造工作。</span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;">最后，王军书记向老师们提出，新的一年希望大家能更加注重课堂教学质量和课程思政，关心关注学校、学院各项改革措施，积极进取，共同推动学院各项事业发展再上新台阶。（文 丁小丽&nbsp; 图 沈建翔）</span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><br></span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><img style="float:none;" src="/_upload/article/images/80/3f/eb863d24477a8457ad8c3010463f/1cf64377-7374-4ab9-bdb9-c6860952d9b9.jpg" sudyfile-attr="{'title':'QQ图片20190304085724.jpg'}" original-src="/_upload/article/images/80/3f/eb863d24477a8457ad8c3010463f/1cf64377-7374-4ab9-bdb9-c6860952d9b9_d.jpg" data-layer="photo"><br>&nbsp;&nbsp;&nbsp; </span></span></span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><img style="float:none;" src="/_upload/article/images/80/3f/eb863d24477a8457ad8c3010463f/69a2a95b-da01-4e83-ac4e-e6aacd4a9052.jpg" sudyfile-attr="{'title':'QQ图片20190304084447.jpg'}" original-src="/_upload/article/images/80/3f/eb863d24477a8457ad8c3010463f/69a2a95b-da01-4e83-ac4e-e6aacd4a9052_d.jpg" data-layer="photo"></span></span></span></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><br></span></span></span></p><p><br></p><p style="margin:0cm 0cm 0px;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"></span></span></span><br></p><p style="margin:0cm 0cm 0px;text-align:center;text-indent:37px;mso-char-indent-count:2.0;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><span style="font-family:宋体;font-size:19px;mso-bidi-font-size:15px;mso-ascii-font-family:calibri;mso-ascii-theme-font:minor-latin;mso-fareast-font-family:宋体;mso-fareast-theme-font:minor-fareast;mso-hansi-font-family:calibri;mso-hansi-theme-font:minor-latin;"><br></span></span></p></div>
				`,
				cmtList: [{
					avatar: "list_2.jpg",
					nickname: "米兰的卡先生",
					fabulous: 123,
					isFabulous: false,
					content: "我一直没懂赛前问一个主教练如何评价对手的主教练， 记者究竟是想得到什么答案？",
					reply: [{
						nickname: "Mesaldo",
						content: "汉军威武!卓尔不凡!火炉德比，热力四射！场上争胜，场下朋友☺ ☻"
					}, {
						nickname: "月牙",
						content: "新政实行后，大小摩托轮流冲，不用经常上迪力了，杨帅该拿下就拿下☺"
					}],
					replayNum: 44,
					time: "昨天 22:12"
				}, {
					avatar: "avatar_1.jpg",
					nickname: "月牙",
					fabulous: 2,
					content: "力帆有杨帅，迪力木来提，尹聪耀，完全可以应付。尤其是杨帅坐稳主力后卫。",
					reply: [{
						nickname: "thorui",
						content: "汉军威武!卓尔不凡!火炉德比，热力四射！场上争胜，场下朋友"
					}, {
						nickname: "Mr卡卜斯",
						content: "说实话，武汉重庆还真的是一家，但是比赛还是要分出个胜负来的，我卓尔球迷肯定是要为我武汉加油了，按照目前两队现在这个状态来看武汉重庆应该是五五开，所以我想说武汉加油！卓尔加油！"
					}],
					replayNum: 2,
					time: "昨天 21:09"
				}, {
					avatar: "avatar_2.jpg",
					nickname: "thorui",
					fabulous: 0,
					content: "小克鲁伊夫带的球队",
					reply: [],
					replayNum: 0,
					time: "昨天 17:30"
				}],
				isPhoneX:this.$tui.isPhoneX(), // 判断是否是iPhoneX以上机型
				isCollection:false, // 是否收藏
				isFllow: false, // 是否关注
				isIphone:this.$tui.isIphone, // 是否为iPhone
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				isLike:false,
				isFocus:true,
				comment:'',
				isShow:false,
				keyboardHeight:'',
				chapterId:'',
				detail:{},
				page:{
					isPage: false,
					pageNum:1,
					pageSize:10
				},
				commentTotal:''
			}
		},
		computed: {
			iconColor() {
				return this.isFabulous ? '#d03a28' : '#333'
			},
			itemIconColor() {
				return function(isFabulous) {
					return isFabulous ? '#d03a28' : '#9a9a9a'
				}
			},
			iconName() {
				return function(isFabulous) {
					return isFabulous ? 'agree-fill' : 'agree'
				}
			}
		},
		onShow() {
			wx.onKeyboardHeightChange(res => { //监听键盘高度变化
				console.log(res.height,'res');
				this.keyboardHeight = res.height;
			})
			this.getCommentList();
		},
		onLoad(options) {
			this.chapterId = options.chapterId;
			this.getQuery();
			// this.getCommentList();
		},
		methods: {
			getQuery(){
				this.$http.getStudyDetail({
					chapterId:this.chapterId
				}).then(res=>{
					this.detail = res.returnValue;
				})
			},
			getCommentList(){
				this.$http.getStudyCommentList({
					ChapterId: this.chapterId,
					Pagenum:this.page.pageNum,
					Pagesize: this.page.pageSize
				}).then(res=>{
					this.commentTotal = res.returnValue.total;
					if(this.page.pageNum*this.page.pageSize < this.commentTotal){
						this.isPage = true;
					}else {
						this.isPage = false;
					}
					let temp = [];
					if(this.page.pageNum==1){
						temp = res.returnValue.chapterCommentList;
					}else {
						temp = this.cmtList.concat(res.returnValue.chapterCommentList);
					}
					this.cmtList = temp;
					
				})
			},
			changeKeyBoard(e){
				console.log(e);
			},
			handleClose(){
				this.isShow = false;
			},
			handleInp(){
				
			},
			handleSend(){
				this.isShow = false;
			},
			btnFabulous: function() {
				this.fabulous = this.isFabulous ? 123 : 124;
				this.isFabulous = !this.isFabulous
			},
			cmtFabulous: function(item) {
				if(!item.isPraise){
					this.$http.getStudyCommentLike({
						ChapterCommentId: item.commentId
					}).then(res=>{
						item.isPraise = true
						item.likeQty = item.likeQty+1
					})
				}else {
					this.$http.getStudyCancelCommentLike({
						ChapterCommentId: item.commentId
					}).then(res=>{
						item.isPraise = false
						item.likeQty = item.likeQty-1
					})
				}
			},
			collection: function() {
				this.isCollection = !this.isCollection
				if (this.isCollection) {
					this.tui.toast("收藏成功！");
				}
			},
			// 回复
			cmtReply: function(item) {
				uni.navigateTo({
					url: '../reply/reply?id='+this.chapterId+'&commentId='+item.commentId+'&userName='+item.userName+'&comment='+item.comment+'&time='+item.modifiedOn
				})
			},
			handleBack(){
				uni.navigateBack({
					delta:1
				})
			},
			handleRoute(){
				uni.navigateTo({
					url:'../sendComment/sendComment?id='+this.chapterId
				})
			},
			FavorSubject(){
				// this.userFavor = !this.userFavor;
				if(!this.detail.isCollect){					
					this.$http.getStudyCollection({
						CourseId: this.detail.chapterId
					}).then(res=>{
						if(res.returnValue!=''){
							this.detail.isCollect = true;
						}
					})
				}else {
					this.$http.getStudyCancelCollection({
						CourseId: this.detail.chapterId
					}).then(res=>{
						if(res.returnValue!=''){
							this.detail.isCollect = false;
						}
					})
				}
			}
		},
		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			// if (!this.pullUpOn) return;
			// this.loadding = true
			// if (this.pageIndex == 3) {
			// 	this.loadding = false;
			// 	this.pullUpOn = false
			// } else {
			// 	let arr = JSON.parse(JSON.stringify(this.cmtList));
			// 	this.cmtList = this.cmtList.concat(arr);
			// 	this.pageIndex = this.pageIndex + 1;
			// 	this.loadding = false
			// }
			this.loadding = true
			if(this.page.isPage){
				this.page.pageNum++;
				this.getCommentList()();
			}
			this.loadding = false;
		}
	}
</script>

<style lang="scss">
page{
	background: #fefefe;
}
.wrapper{
	.header{
		padding: 30rpx;
		.title{
			font-size: 32rpx;
			line-height: 1.5;
			color: #333333;
			font-weight: bold;
		}
		.info{
			font-size: 24rpx;
			color: #888888;
			line-height: 2;
			.time{
				padding-right: 20rpx;
			}
		}
		.cover{
			.row{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 28rpx;
				.tag{
					padding: 10rpx 20rpx;
					border-radius: 50rpx;
					background: #ffcccc;
					color: #d03a28;
					font-size: 28rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					.icon{
						vertical-align: middle;
					}
				}
			}
			.banner{
				width: 100%;
				height: 300rpx;
				background: #d03a28;
				border-radius: 20rpx;
				margin: 30rpx 0;
			}
		}
		.play{
			width: 100%;
			background: #d03a28;
			border-radius: 20rpx;
			box-shadow: 0rpx 5rpx 15rpx 5rpx rgba(199, 12, 21, 0.5);
			border-top-right-radius: 100rpx;
			border-bottom-right-radius: 100rpx;
			padding: 30rpx;
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #FFFFFF;
			.d_left{
				.name{
					font-size: 32rpx;
					font-weight: bold;
				}
				.desc{
					font-size: 28rpx;
				}
			}
			.d_right{
				width: 100rpx;
				height: 100rpx;
				background: #FFFFFF;
				border-radius: 50%;
			}
		}
	}
	.center{
		.container{
			padding: 30rpx;
		}
		.hr{
			width: 100%;
			height: 20rpx;
			background: #e2e3e5;
		}
	}
	.footer{
		width: 100%;
		position: fixed;
		bottom: 0;
		border-top: 1rpx solid #e2e3e5;
		background: #FFFFFF;
		.comment{
			margin: 20rpx 30rpx;
			display: flex;
			align-items: center;
			.inp{
				flex: 1;
				width: 100%;
				border-radius: 50rpx;
				background: #EDEDED;
				color: #999999;
				font-size: 24rpx;
				padding-left: 20rpx;
				line-height: 60rpx;
				height: 60rpx;
			}
			.collection{
				width: 80rpx;
				text-align: right;
				font-size: 24rpx;
				.num{
					padding-right: 12rpx;
					color: #999999;
				}
				.num.active{
					color: #d03a28;
				}
			}
		}
		.comment.active{
			padding-bottom: 50rpx;
		}		
	}
	.reply{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999;
		background: rgba(0,0,0,.6);
		.content{
			width: 100%;
			// min-height: 500rpx;
			background: #fff;
			position: absolute;
			bottom: 0;
			.bd{
				padding: 20rpx;
				box-sizing: border-box;
				.rowText{
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					color: #333333;
				}
				.cont{
					background: #d4d4d4;
					border-radius: 5rpx;
					padding: 20rpx;
					box-sizing: border-box;
					margin: 20rpx 0;
					textarea{
						width: 100%;
						height: 300rpx;
					}
				}
				.send{
					text-align: right;
					.btn{
						border: none;
						color: #FFFFFF;
						background: #d03a28;
						font-size: 28rpx;
						width: 150rpx;
						height: 50rpx;
						line-height: 50rpx;
						text-align: center;
						display: inline-block;
					}
				}
			}
		}
	}
}
.commentWrap{
	padding: 40rpx 30rpx 200rpx 30rpx;
	box-sizing: border-box;
}
.tui-cmt-title {
	font-size: 30rpx;
	font-weight: bold;
	position: relative;
	margin-left: 20rpx;
}
.tui-cmt-title::after {
	content: '';
	position: absolute;
	left: -18rpx;
	top: 18%;
	width: 6rpx;
	height: 64%;
	background: #d03a28;
}
.tui-cmtbox {
	padding-bottom: 20rpx;
}
.tui-cmt-cell {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	padding-top: 44rpx;
}
.tui-avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 32rpx;
	display: block;
	flex-shrink: 0;
}

.tui-cmt-detail {
	width: 100%;
	padding-left: 16rpx;
	box-sizing: border-box;
}

.tui-header-box {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	font-size: 30rpx;
}

.tui-cmt-nickname {
	color: #d03a28;
}

.tui-fabulous {
	color: #9a9a9a;
}

.tui-fabulous text {
	padding-right: 4rpx;
	font-size: 24rpx;
}

.tui-cmt-content {
	font-size: 32rpx;
	color: #333;
	text-align: justify;
	padding-top: 8rpx;
	word-break: break-all;
	word-wrap: break-word;
}

.tui-reply-box {
	border-radius: 8rpx;
	overflow: hidden;
	margin-top: 16rpx;
}

.tui-cell-last {
	display: flex;
	align-items: center;
	word-wrap: break-word;
	color: #d03a28;
}
.tui-flex-1 {
	flex: 1;
	width: 100%;
}

.tui-reply-nickname {
	font-size: 24rpx;
	color: #7a7a7a;
	padding-bottom: 8rpx;
}
.tui-footer {
	display: flex;
	align-items: center;
	font-size: 24rpx;
	margin-top: 16rpx;
	color: #9a9a9a;
}

.tui-primary {
	color: #d03a28 !important;
}

.tui-ml {
	margin-left: 16rpx;
}
</style>
