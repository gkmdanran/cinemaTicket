export default {
	data() {
		return {
			
		}
	},
	// 1.发送给朋友
    onShareAppMessage(res) {
       uni.share({
       	provider: "weixin",
       	scene: "WXSceneSession",
       	type: 1,
       	summary: "我正在使用小程序制作电影票根，赶紧跟我一起来体验！",
       	success: function (res) {
       		console.log("success:" + JSON.stringify(res));
       	},
       	fail: function (err) {
       		console.log("fail:" + JSON.stringify(err));
       	}
       });
    },
	//2.分享到朋友圈
    onShareTimeline(res) {
        uni.share({
        	provider: "weixin",
        	scene: "WXSceneTimeline",
        	type: 1,
        	summary: "我正在使用小程序制作电影票根，赶紧跟我一起来体验！",
        	success: function (res) {
        		console.log("success:" + JSON.stringify(res));
        	},
        	fail: function (err) {
        		console.log("fail:" + JSON.stringify(err));
        	}
        });
    },
}