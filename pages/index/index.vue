<template>
	<view class="index-contaioner">
		<view class="banner">
			<button type="primary" size="mini" v-for="item in templateList" :key="item.id"
				@click="makeTicket(item.id)">{{item.name}}</button>
		</view>
		<view class="tips" @click="showDialog('wx')">如有疑问请联系作者，wx: <text
				style="color:#e06c75;margin-left: 5px;">gkmdanran</text></view>
		<view  @click="showDialog('money')" style="color:#e06c75;text-align: center;margin-top: 15px;">点击打赏作者~</view>
		<uni-popup ref="wxDialog" type="dialog">
			<image v-if="dialogType==='wx'" src="../../static/me.jpg" mode="widthFix" show-menu-by-longpress></image>
			<view v-else style="background: #fff;text-align: center;">
				<view>长按图片扫码打赏</view>
				<image src="../../static/skm.jpg" mode="widthFix" show-menu-by-longpress></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dialogType: 'wx',
				templateList: [{
						id: 'TemplateB',
						name: '简约版',
					}, {
						id: 'TemplateA',
						name: '详细版',
					},
					{
						id: 'TemplateC',
						name: '截图版',
					},
				]

			}
		},
		methods: {
			showDialog(type) {
				this.dialogType = type
				this.$refs.wxDialog.open()
			},
			makeTicket(id) {
				uni.navigateTo({
					url: `/subPages/ticket/ticket?id=${id}`
				});
			},
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

		.btns {
			display: flex;
			justify-content: space-between;
		}

		.saoma {
			font-size: 14px;
			margin-top: 20px;
			text-align: center;
			color: red;
			margin-bottom: 10px;
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
