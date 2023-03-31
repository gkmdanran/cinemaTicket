<template>
	<view class="ticket">
		<TemplateA ref="templateA" @getUrl="ticketUrl=$event" :ticketInfo="ticketInfo"></TemplateA>
		<uni-drawer ref="drawer" mode="right" :width="320" @change="changeDrawer($event)">
			<view class="form">
				<uni-forms :modelValue="ticketInfo" label-align="right" label-width="90px">
					<uni-forms-item label="标题:" name="mainTitle">
						<uni-easyinput type="text" v-model="ticketInfo.mainTitle" placeholder="例:流浪地球2" />
					</uni-forms-item>
					<uni-forms-item label="副标题:" name="subTitle">
						<uni-easyinput type="text" v-model="ticketInfo.subTitle"
							placeholder="例:The Wandering Earth II" />
					</uni-forms-item>
					<uni-forms-item label="时长(分钟):" name="duration">
						<uni-easyinput type="number" v-model="ticketInfo.duration" maxlength="8" />
					</uni-forms-item>
					<uni-forms-item label="上映日期:" name="releaseTime">
						<uni-datetime-picker type="date" :clear-icon="false" v-model="ticketInfo.releaseTime" />
					</uni-forms-item>
					<uni-forms-item label="影院:" name="cinema">
						<uni-easyinput type="text" v-model="ticketInfo.cinema" placeholder="例:xxx影院" />
					</uni-forms-item>
					<uni-forms-item label="影厅:" name="hell">
						<uni-easyinput type="text" v-model="ticketInfo.hell" placeholder="例:7号IMAX厅" />
					</uni-forms-item>
					<uni-forms-item label="座位:" name="seat">
						<uni-easyinput type="text" v-model="ticketInfo.seat" placeholder="例:5拍9座" />
					</uni-forms-item>
					<uni-forms-item label="票价(￥):" name="price">
						<uni-easyinput type="number" v-model="ticketInfo.price" maxlength="8" />
					</uni-forms-item>
					<uni-forms-item label="放映时间:" name="dateTime">
						<uni-datetime-picker type="datetime" :clear-icon="false" v-model="ticketInfo.dateTime"
							hide-second />
					</uni-forms-item>

				</uni-forms>
			</view>

		</uni-drawer>
		<div class="btn-area">
			<button type="primary" size="mini" @click="createImage">生成图片</button>
			<button size="mini" @click="showDrawer()">编辑票根</button>
		</div>

	</view>
</template>

<script>
	import TemplateA from '../../components/TemplateA/TemplateA.vue'

	export default {
		components: {
			TemplateA: TemplateA
		},
		data() {
			return {
				drawer: false,
				ticketUrl: '',
				ticketInfo: {
					bigImg: '/static/lldq.jpg',
					mainTitle: '流浪地球2',
					subTitle: 'The Wandering Earth II',
					duration: 147,
					kinds: ['科幻', '冒险', '灾难'],
					releaseTime: '2023-01-22',
					cinema: '幸福蓝海国际影城绿宝店',
					hell: 'IMAX震撼厅',
					seat: '5排9座',
					price: 52,
					dateTime: '2022-12-11 12:00',
				},
			}
		},
		methods: {
			changeDrawer(val) {
				this.drawer = true
			},
			showDrawer() {
				this.$refs['drawer'].open()
			},
			createImage() {
				this.$refs.templateA.createImage()
			},
			editTicketInfo() {

			}
		},

	}
</script>



<style lang="less">
	.ticket {
		.btn-area {
			display: flex;
			justify-content: space-between;
			padding: 60rpx 0;
		}
		.form{
			padding-right: 15px;
		}
	}
</style>
