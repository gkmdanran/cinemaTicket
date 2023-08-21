<template>
	<view class="ticket">
		<view class="tips">自定义票根信息请滑动页面至底部，点击编辑票根</view>
		<TemplateA v-if="currentTemplate==='TemplateA'" ref="TemplateA" :ticketInfo="ticketInfo" @save="saveTemplate">
		</TemplateA>
		<TemplateB v-else-if="currentTemplate==='TemplateB'" ref="TemplateB" :ticketInfo="ticketInfo"
			@save="saveTemplate"></TemplateB>
		<TemplateC v-else-if="currentTemplate==='TemplateC'" ref="TemplateC"></TemplateC>
		<TemplateD v-else-if="currentTemplate==='TemplateD'" ref="TemplateD" :ticketInfo="ticketInfo"
			@save="saveTemplate"></TemplateD>
		<template v-if="currentTemplate">
			<view class="btn-area">
				<button type="primary" @click="createTicket">生成票根</button>
				<button @click="editTicket">编辑票根</button>
			</view>
		</template>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" cancelText="取消" confirmText="同意" title="告知" content="此小程序仅供娱乐,不可商用!不可用作非法途径!"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import TemplateA from './cmp/TemplateA/TemplateA.vue'
	import TemplateB from './cmp/TemplateB/TemplateB.vue'
	import TemplateC from './cmp/TemplateC/TemplateC.vue'
	import TemplateD from './cmp/TemplateD/TemplateD.vue'
	export default {
		components: {
			TemplateA,
			TemplateB,
			TemplateC,
			TemplateD
		},
		data() {
			return {
				ticketInfo: {},
				currentTemplate: ''
			}
		},
		methods: {
			//刷新
			refresh() {
				this.$refs[`${this.currentTemplate}`].drawTemplate()
			},
			//编辑票根
			editTicket() {
				this.$refs[`${this.currentTemplate}`].showDrawer()
			},
			//生成票根
			createTicket() {
				this.$refs.alertDialog.open()
			},
			//缓存票根
			saveTemplate(form) {
				uni.setStorageSync('ticket_form', JSON.stringify(form))
				this.ticketInfo = form
				this.$nextTick(() => {
					this.$refs[`${this.currentTemplate}`].drawTemplate()
				})
			},
			//确认生成
			dialogConfirm() {
				uni.setStorageSync('ticket_url', this.$refs[`${this.currentTemplate}`].ticketUrl)
				uni.navigateTo({
					url: `/pages/picture/picture?id=${this.currentTemplate}`
				});
			},
		},
		onLoad(option) {
			this.currentTemplate = option.id
			//从缓存中读取
			const storageForm = uni.getStorageSync('ticket_form')
			if (storageForm) {
				this.ticketInfo = JSON.parse(storageForm)
			} else {
				this.ticketInfo = {
					color: 'grey',
					lang: '国语2D',
					bigImg: '/static/lldq.jpg',
					mainTitle: '流浪地球2',
					subTitle: 'The Wandering Earth II',
					duration: 147,
					kinds: '科幻/冒险/灾难',
					releaseTime: '2023-01-22',
					cinema: '幸福蓝海国际影城',
					hall: '5号沙发杜比激光巨幕厅',
					seat: '5排14座',
					price: '52.00',
					dateTime: '2023-01-23 14:10',
					finishIcon: '/static/finish.png',
					star:5
				}
			}
		},
	}
</script>

<style lang="less" scoped>
	.ticket {
		.btn-area {
			display: flex;
			justify-content: space-between;
			padding: 20px 0;

			button {
				width: 100px;
				height: 36px;
				line-height: 36px;
				font-size: 14px;
			}
		}

		.tips {
			padding: 5px 0;
			text-align: center;
			font-size: 28rpx;
			color: #465a6c;
		}
	}
</style>
