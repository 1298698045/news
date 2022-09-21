<template>
    <div class="wrap">
        <div class="header">
            <div class="row">
                <div class="avatar">
                    {{detail.newName}}
                </div>
                <div class="info">
                    <p class="name">{{detail.ModifiedByName}}</p>
                    <p class="time">
                        信息中心    {{detail.ModifiedOn}}
                    </p>
                </div>
            </div>
            <div class="title">
                {{detail.Name}}
            </div>
            <div class="describe">
                {{detail.Description}}
            </div>
            <div class="box">
                <p class="time">
                    <i class="iconfont icon-shijian-copy"></i>
                    {{detail.mon}} {{detail.weekName}} {{detail.hourmin}} 截止</p>
                <p class="num">
                    <i class="iconfont icon-canyuren"></i>
                    <span class="active">{{detail.NumOfResponses}}</span>
                    <span>&nbsp;/&nbsp;{{detail.NumOfInvitationsSent}}</span>
                </p>
            </div>
        </div>
        <div class="center">
            <div class="block" :id="'d'+(index+1)" v-for="(item,index) in list" :key="index">
                <div class="title">{{index+1}}. {{item.Name}}
                    <span v-if="item.not" :animation="animationData">
                        这道题未回答
                    </span>
                </div>
                <div class="content" v-if="item.QuestionType==1">
                    <van-radio-group :value="item.value" @change="(e)=>{onChangeRadio(e,item)}">
                        <van-radio v-for="(v,i) in item.Options" :key="i" :name="v.AnswerOptionNumber" custom-class="radio">{{i+1}}.{{v.Name}}</van-radio>
                    </van-radio-group>
                </div>
                <div class="content" v-else-if="item.QuestionType==2" >
                    <van-checkbox-group :value="item.value" @change="(e)=>{handleCheck(e,item)}">
                        <van-checkbox v-for="(v,i) in item.Options" :key="i" shape="square" :name="v.AnswerOptionNumber" custom-class="checkbox" >{{i+1}}.{{v.Name}}</van-checkbox>
                    </van-checkbox-group>
                </div>
                <div class="content" v-else-if="item.QuestionType==5">
                    <input class="inp" @input="(e)=>{handleInput(e,item)}" v-model="item.value" type="text" :placeholder="''">
                </div>
                <div class="content" v-else-if="item.QuestionType==52">
                    <textarea class="textarea"  @input="(e)=>{handleTextarea(e,item)}" v-model="item.value" name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
        <div class="footer" :class="{'bottomActive':isModelmes,'footImt':!isModelmes}">
            <div class="box_wrap">
                <div class="box" :class="{'active':disabled}" @click="getSubmit(1)">
                    <p>保存</p>
                </div>
                <div class="box" :class="{'active':disabled}" @click="getSubmit(2)">
                    <p>提交</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import HeadRow from '@/components/questionnaire/HeadRow';
export default {
    components:{
        // HeadRow
    },
    data(){
        return {
            radio:'',
            result:[],
            id:"",
            info:{},
            list:[],
            detail:{},
            animationData: {},
            animation: ""
        }
    },
    computed:{
        sessionkey(){
            return wx.getStorageSync('sessionkey');
        },
        isModelmes(){
            return wx.getStorageSync('isModelmes');
        },
        disabled(){
            let bol = false;
            this.list.forEach(item=>{
                if(item.value!=''){
                    bol = true;
                    return;
                    // break;
                }
            })
            return bol;
        }
    },
    onLoad(options){
        console.log(options,'---')
        this.id = options.id;
        this.getQuery();
    },
    methods:{
        getQuery(){
            // this.$httpWX.get({
            //     url:this.$api.message.queryList,
            //     data:{
            //         method:this.$api.survey.getSurvey,
            //         SessionKey:this.sessionkey,
            //         Id:this.id
            //     }
            // }).then(res=>{
            //     console.log(res);
            //     this.info = JSON.stringify(res.Survey);
            //     this.detail = res.Survey;
            //     this.list = res.Survey.Questions;
            //     this.list.forEach(item=>{
            //         this.$set(item,'not',false)
            //         item.Options.forEach(v=>{
            //             this.$set(v,'checked',false)
            //         })
            //         if(item.QuestionType==1){
            //             this.$set(item,'value','')
            //         }else if(item.QuestionType==2){
            //             this.$set(item,'value',[])
            //         }else {
            //             this.$set(item,'value','');
            //         }
            //     })
            // })
			this.detail = {
				"SurveyId": "c3d29119-c31c-4327-a4bb-f2633ca320ec",
				"SurveyNumber": "",
				"ExpringDays": 0,
				"EndDate": "2021/3/31 0:00:00",
				"SurveyTypeCode": 0,
				"SurveyTypeName": null,
				"SurveyType": "0",
				"IsAnonymous": false,
				"AudienceTypeName": null,
				"StatusCode": 1,
				"StatusCodeName": "已发布",
				"Description": "",
				"CategoryIdName": null,
				"SurveyUrl": null,
				"OwningBusinessUnit": null,
				"OwningBusinessUnitName": null,
				"NumOfInvitationsSent": 2,
				"NumOfResponses": 1,
				"NotFinished": 1,
				"Questions": [
				{
				"SurveyQuestionId": "c5506ed5-08f2-4f33-8fb3-56997d8e70e3",
				"Question": "213123",
				"QuestionNumber": "2000254",
				"QuestionGroup": "",
				"SubCategory": "",
				"SurveyId": "c3d29119-c31c-4327-a4bb-f2633ca320ec",
				"SurveyIdName": "年度考评投票问卷",
				"QuestionType": 1,
				"QuestionTypeName": "单项提",
				"Required": false,
				"EnableScore": false,
				"SortNumber": 0,
				"Options": [
				{
				"QuestionAnswerOptionId": "da061b43-1d53-47a9-b4a8-575b0f03582d",
				"SurveyId": "c3d29119-c31c-4327-a4bb-f2633ca320ec",
				"SurveyQuestionId": "c5506ed5-08f2-4f33-8fb3-56997d8e70e3",
				"AnswerOption": "12",
				"AnswerOptionNumber": "5000787",
				"AnswerOptionGroup": "",
				"SortNumber": 1,
				"OtherInput": true,
				"NumOfInvitationsSent": 0,
				"NumOfResponse": 1,
				"PercentOfResponse": 1,
				"Points": 0,
				"TotalScore": 0,
				"IsDefault": false,
				"IsSelected": 1,
				"ResponseText": "",
				"Remark": null,
				"Name": "12",
				"LIST_RECORD_ID": "da061b43-1d53-47a9-b4a8-575b0f03582d",
				"CreatedOn": "2022/3/31 20:45:13",
				"ModifiedOn": "2022/3/31 20:45:13",
				"OwningUser": null,
				"OwningUserName": null,
				"CreatedBy": "",
				"CreatedByName": null,
				"ModifiedBy": "",
				"ModifiedByName": null,
				"DeptName": null
				},
				{
				"QuestionAnswerOptionId": "e713599c-b72a-4000-bbc0-4a61ccd6baf3",
				"SurveyId": "c3d29119-c31c-4327-a4bb-f2633ca320ec",
				"SurveyQuestionId": "c5506ed5-08f2-4f33-8fb3-56997d8e70e3",
				"AnswerOption": "21",
				"AnswerOptionNumber": "5000788",
				"AnswerOptionGroup": "",
				"SortNumber": 2,
				"OtherInput": true,
				"NumOfInvitationsSent": 0,
				"NumOfResponse": 0,
				"PercentOfResponse": 0,
				"Points": 0,
				"TotalScore": 0,
				"IsDefault": false,
				"IsSelected": 0,
				"ResponseText": "",
				"Remark": null,
				"Name": "21",
				"LIST_RECORD_ID": "e713599c-b72a-4000-bbc0-4a61ccd6baf3",
				"CreatedOn": "2022/3/31 20:45:13",
				"ModifiedOn": "2022/3/31 20:45:13",
				"OwningUser": null,
				"OwningUserName": null,
				"CreatedBy": "",
				"CreatedByName": null,
				"ModifiedBy": "",
				"ModifiedByName": null,
				"DeptName": null
				}
				],
				"IsCheck": 0,
				"ResponseText": null,
				"AverageScroe": 0,
				"Name": "213123",
				"LIST_RECORD_ID": "c5506ed5-08f2-4f33-8fb3-56997d8e70e3",
				"CreatedOn": "2022/3/31 20:45:13",
				"ModifiedOn": "2022/3/31 20:45:13",
				"OwningUser": null,
				"OwningUserName": null,
				"CreatedBy": "",
				"CreatedByName": null,
				"ModifiedBy": "",
				"ModifiedByName": null,
				"DeptName": null
				}
				],
				"questionHeaders": [],
				"Name": "年度考评投票问卷",
				"LIST_RECORD_ID": "c3d29119-c31c-4327-a4bb-f2633ca320ec",
				"CreatedOn": "2021/3/7 12:46:22",
				"ModifiedOn": "2021/3/7 12:49:54",
				"OwningUser": "",
				"OwningUserName": "",
				"CreatedBy": "5af66c21-6974-4251-bb0c-b3f4f7e0f416",
				"CreatedByName": "刘自优",
				"ModifiedBy": "5af66c21-6974-4251-bb0c-b3f4f7e0f416",
				"ModifiedByName": "刘自优",
				"DeptName": null,
				"newName": "自优"
			}
			this.list = this.detail.Questions;
			let {mon,weekName,hourmin} = this.dateFun(this.detail.EndDate);
			this.detail.mon = mon;
			this.detail.weekName = weekName;
			this.detail.hourmin = hourmin;
			this.list.forEach(item=>{
				this.$set(item,'not',false)
				item.Options.forEach(v=>{
					this.$set(v,'checked',false)
				})
				if(item.QuestionType==1){
					this.$set(item,'value','')
				}else if(item.QuestionType==2){
					this.$set(item,'value',[])
				}else {
					this.$set(item,'value','');
				}
			})
        },
		dateFun(time){
		    let week = ['周日','周一','周二','周三','周四','周五','周六']
		    let date = new Date(time);
		    let y = date.getFullYear();
		    let m = this.formatStr(date.getMonth()+1);
		    let d = this.formatStr(date.getDate());
		    let h = this.formatStr(date.getHours());
		    let min = this.formatStr(date.getMinutes());
		    let day = date.getDay();
		    let mon = `${m}月${d}日`;
		    let weekName = week[day];
		    let hourmin = `${h}:${min}`;
		    return {
		        mon,weekName,hourmin
		    }
		},
		formatStr(str){
		    return str < 10 ? '0'+str :str;
		},
        onChangeRadio(e,item){
            console.log(e);
            // item.value = e.mp.detail;
            let value = e.mp.detail;
            // let str = value.split('_')[1];
            let index = item.Options.findIndex(one=>one.AnswerOptionNumber==value);
            item.Options[index].checked = !item.Options[index].checked;
            if(item.Options[index].checked){
                item.not = false;
                item.value = e.mp.detail;
                item.Options.forEach((v,i)=>{
                    this.$set(v,'checked',false);
                    if(i==index){
                        item.Options[index].checked = true;
                    }
                })
            }else {
                item.value = '';
            }
        },
        handleCheck(e,item){
            console.log(e);
            item.value = e.mp.detail;
            if(item.value.length>0){
                item.not = false;
            }
        },
        handleInput(e, item){
            item.value = e.mp.detail.value;
            if(item.value!=''){
                item.not =  false;
            }
        },
        handleTextarea(e, item){
            item.value = e.mp.detail.value;
            if(item.value!=''){
                item.not =  false;
            }
        },
        getSubmit(statusCode){
            try{
                this.list.forEach(item=>{
                    console.log(item)
                    if(item.value==''){
                        this.animationData = {};
                        item.not = true;
                        wx.createSelectorQuery().select('#d'+item.SortNumber).boundingClientRect(function (rect) {
                            console.log(rect,'======')
                            // 使页面滚动到底部
                            wx.pageScrollTo({
                                scrollTop: rect.top - 20
                            })
                        }).exec();
                        var animation = wx.createAnimation({
                            duration: 400,
                            timingFunction: 'linear',
                        })
                        this.animation = animation
                        animation.translate(10).step();
                        this.animationData = animation.export()

                        setTimeout(function() {
                            animation.translate(0).step();
                            this.animationData = animation.export()
                        }.bind(this), 500)
                        
                        // wx.showToast({
                        //     title:`请填写${item.Name}`,
                        //     icon:"none",
                        //     duration:2000
                        // })
                        throw '';
                    }
                })
                let obj = {};
                let params = {};
                // params.statusCode = this.detail.StatusCode;
                params.statusCode = statusCode;
                params.surveyId = this.detail.SurveyId;
                let temp = [];
                this.list.forEach(item=>{
                    var arr = [];
                    if(item.QuestionType==1){
                        item.arr = arr.push(item.value);
                        temp.push({
                            surveyQuestionId:item.SurveyQuestionId,
                            questionNumber:item.QuestionNumber,
                            answerOptionNumber:arr,
                        })
                    }else if(item.QuestionType==2){
                        temp.push({
                            surveyQuestionId:item.SurveyQuestionId,
                            questionNumber:item.QuestionNumber,
                            answerOptionNumber:item.value,
                        })
                    }else{
                        temp.push({
                            surveyQuestionId:item.SurveyQuestionId,
                            questionNumber:item.QuestionNumber,
                            responseText:item.value
                        })
                    }
                })
                params.response = temp;
                obj.params = params;
                console.log(obj,'obj');
                this.$httpWX.get({
                    url:this.$api.message.queryList,
                    data:{
                        method:this.$api.survey.submit,
                        SessionKey:this.sessionkey,
                        message:JSON.stringify(obj)
                    }
                }).then(res=>{
                    if(res.status===1){
                        message.toast({
                            title:"提交成功！",
                            delta:1
                        })
                    }
                })
            }catch(e){
                console.log(e);
            }
        }
    }
}
</script>
<style lang="scss">
@font-face {
    font-family: 'iconfont';
    src: url('data:font/truetype;charset=utf-8;base64,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') format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.icon-shijian:before {
    content: "\e600";
}

.icon-canyuren:before {
    content: "\e601";
}

.icon-jiahao:before {
    content: "\e602";
}

.icon-quxiao:before {
    content: "\e603";
}

.icon-tianjia:before {
    content: "\e604";
}

.icon-shijian-copy:before {
    content: "\e605";
}
    .wrap{
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding-bottom: 100px;
		.header{
		    padding: 0 26rpx;
		    background: #fff;
		    .row{
		        display: flex;
		        padding: 26rpx 0;
		        .avatar{
		            width: 75rpx;
		            height: 75rpx;
		            line-height: 75rpx;
		            text-align: center;
		            font-size: 24rpx;
		            color: #fff;
		            background: #d03a28;
		            border-radius: 50%;
		        }
		        .info{
		            flex: 1;
		            margin-left: 25rpx;
		            .name{
		                font-size: 28rpx;
		                color: #333333;
		            }
		            .time{
		                font-size: 22rpx;
		                color: #999999;
		            }
		        }
		    }
		    .preview{
		        span{
		            font-size: 28rpx;
		            color: #d03a28;
		            border-bottom: 1rpx solid #d03a28;
		        }
		    }
		    .title{
		        font-size: 39rpx;
		        color: #d03a28;
		        font-weight: bold;
		        padding: 21rpx 0;
		    }
		    .describe{
		        font-size: 31rpx;
		        color: #666666;
		    }
		    .box{
		        display: flex;
		        padding: 28rpx 0;
		        align-items: center;
		        margin-top: 28rpx;
		        justify-content: space-between;
		        p{
		            font-size: 24rpx;
		            color: #999999;
		            display: flex;
		            align-items: center;
		            i{
		                margin-right: 10rpx;
		            }
		        }
		        .num{
		            display: flex;
		            margin-left: 20rpx;
		            align-items: center;
		            span{
		                font-size: 24rpx;
		                color: #999999;
		            }
		            .active{
		                font-size: 35rpx;
		                color: #d03a28;
		                font-weight: bold;
		            }
		        }
		    }
		}
        .center{
            padding: 35rpx;
            .block:first-child{
                margin: 0;
            }
            .block{
                margin-top: 34rpx;
                .title{
                    color: #333333;
                    font-size: 33rpx;
                    font-weight: bold;
                    padding-bottom: 19rpx;
                    span{
                        font-size: 20rpx;
                        color: #fff;
                        display: inline-block;
                        padding: 5rpx 10rpx;
                        border-radius: 5rpx;
                        margin-left: 10rpx;
                        background: red;
                    }
                }
                .content{
                    background: #fff;
                    border-radius: 12rpx;
                    .radio{
                        padding: 20rpx 37rpx;
                        border-bottom: 1rpx solid #e2e3e5;
                        font-size: 32rpx;
                        color: #666666;
                    }
                    .checkbox{
                        padding: 20rpx 37rpx !important;
                        border-bottom: 1rpx solid #e2e3e5;
                        font-size: 32rpx;
                        color: #666666;
                    }
                    .inp{
                        width: 100%;
                        height: 100rpx;
                        padding: 0 27rpx;
                    }
                    .textarea{
                        width: 100%;
                        height: 191rpx;
                        padding: 10rpx 27rpx;
                    }
                }
            }
        }
        .footer{
            width: 100%;
            position: fixed;
            bottom: 0;
            background: #fff;
            .box_wrap{
                display: flex;
                .box{
                    flex: 1;
                    padding: 24rpx 25rpx;
                    opacity: .4;
                    p{
                        text-align: center;
                        line-height: 88rpx;
                        font-size: 34rpx;
                        color: #fff;
                        background: #d03a28;
                        border-radius: 7rpx;
                    }
                }
                .box.active{
                    opacity: 1;
                }
            }
        }
    }
</style>