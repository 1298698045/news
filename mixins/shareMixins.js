export const shareMixins = {
    data () {
        return {
            shareData: {
                title: '',
                path: '',
                imageUrl: '',
                content: '',
                desc: ''
            }
        }
    },

    //#ifdef MP-WEIXIN
    onShareAppMessage () {
        return {
            title: this.shareData.title,
            path: this.shareData.path,
            imageUrl: this.shareData.imageUrl,
            content: this.shareData.content,
            desc: this.shareData.desc,
            success: res => {
                console.info(res)
            }
        }
    },
    //#endif

    onLoad(option) {
    }
}
// 分享到朋友圈
export const shareWechat = {
	data(){
		return {
			share:{
				title:'',
				path: ''
			}
		}
	},
	onShareTimeline(){
		return {
		  title: this.share.title,
		  path: this.share.path
		}
	} 
}