<template>
	<view class="index-contaioner">
		<button type="primary" @click="makeTicket">立即制作</button>
		<view class="tips" @click="showDialog">如有疑问请联系作者，wx: <text style="color:#e06c75;margin-left: 5px;">gkmdanran</text></view>
		<uni-popup ref="wxDialog" type="dialog">
			<image src="../../static/me.jpg" mode="widthFix" show-menu-by-longpress></image>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			showDialog(){
				this.$refs.wxDialog.open()
			},
			makeTicket() {
				uni.navigateTo({
					url: '/pages/ticket/ticket'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.index-contaioner {
		padding: 10px;

		button {
			margin-top: 80px
		}
		.tips{
			height: 30px;
			line-height: 30px;
			margin-top: 80px;
			text-align: center;
			font-size: 12px;
			color: #ccc1b9;
		}
		image{
			width: 200px!important;
		}
	}
</style>
