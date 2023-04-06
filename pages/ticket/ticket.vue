<template>
	<view class="ticket">
		<TemplateA ref="TemplateA" :ticketInfo="ticketInfo" @save="saveTemplate"></TemplateA>
		<view class="btn-area">
			<button type="primary" @click="createTicket">生成票根</button>
			<button @click="editTicket">编辑票根</button>
		</view>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" cancelText="取消" confirmText="同意" title="告知" content="此小程序仅供娱乐,不可商用!"
				@confirm="dialogConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	const img=require('../../static/lldq.jpg')
	export default {
		data() {
			return {
				ticketInfo: {},
				currentTemplate: 'TemplateA'
			}
		},
		methods: {
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
					url: '/pages/picture/picture'
				});
			},
		},
		onLoad() {
			//从缓存中读取
			const storageForm = uni.getStorageSync('ticket_form')
			if (storageForm) {
				this.ticketInfo = JSON.parse(storageForm)
			} else {
				this.ticketInfo = {
					bigImg: img,
					mainTitle: '流浪地球2',
					subTitle: 'The Wandering Earth II',
					duration: 147,
					kinds: '科幻/冒险/灾难',
					releaseTime: '2023-01-22',
					cinema: '幸福蓝海国际影城',
					hall: '5号全景声厅',
					seat: '5排14座',
					price: '52.00',
					dateTime: '2023-01-23 14:10',
					finishIcon: '../../static/finish.png',
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
	}
</style>
