<template>
	<view class="index-contaioner">
		<view class="banner">
			<button type="primary" size="mini" v-for="item in templateList" :key="item.id"
				@click="makeTicket(item.id)">{{item.name}}</button>
		</view>
		<view class="saoma">
			<text> 领取大红包啦！保存下方图片打开z hi怤保扫一扫，或搜索 816201194</text>
			<image src="../../static/hb.jpg" mode="widthFix" show-menu-by-longpress></image>
		</view>

		<view class="tips" @click="showDialog">如有疑问请联系作者，wx: <text
				style="color:#e06c75;margin-left: 5px;">gkmdanran</text></view>
		<uni-popup ref="wxDialog" type="dialog">
			<image src="../../static/me.jpg" mode="widthFix" show-menu-by-longpress></image>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				templateList: [{
					id: 'TemplateB',
					name: '简约版',
				}, {
					id: 'TemplateA',
					name: '详细版',
				}, ]

			}
		},
		methods: {
			showDialog() {
				this.$refs.wxDialog.open()
			},
			makeTicket(id) {
				uni.navigateTo({
					url: `/subPages/ticket/ticket?id=${id}`
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.index-contaioner {
		padding: 10px;

		.banner {
			display: flex;
			justify-content: space-between;
			margin- top: 40px;
			;
		}
		.saoma{
			font-size: 14px;
			margin-top: 20px;
			text-align: center;
			color: red;
		}
		.tips {
			height: 30px;
			line-height: 30px;
			margin-top: 80px;
			text-align: center;
			font-size: 12px;
			color: #ccc1b9;
		}

		image {
			width: 200px !important;
		}
	}
</style>
