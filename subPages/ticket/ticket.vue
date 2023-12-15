<template>
  <view class="ticket">
    <view class="tips">自定义票根信息请滑动页面至底部，点击编辑票根</view>
    <TemplateA
      v-if="currentTemplate === 'TemplateA'"
      ref="TemplateA"
      :ticketInfo="ticketInfo"
      @save="saveTemplate"
    >
    </TemplateA>
    <TemplateB
      v-else-if="currentTemplate === 'TemplateB'"
      ref="TemplateB"
      :ticketInfo="ticketInfo"
      @save="saveTemplate"
    ></TemplateB>
    <!-- <TemplateC v-else-if="currentTemplate==='TemplateC'" ref="TemplateC"></TemplateC>
		<TemplateD v-else-if="currentTemplate==='TemplateD'" ref="TemplateD" :ticketInfo="ticketInfo"
			@save="saveTemplate"></TemplateD>
		<TemplateE v-else-if="currentTemplate==='TemplateE'" ref="TemplateE" :ticketInfo="ticketInfo"
			@save="saveTemplate"></TemplateE> -->
    <template v-if="currentTemplate">
      <view class="btn-area">
        <button type="primary" @click="createTicket">下载票根</button>
        <button @click="editTicket">编辑票根</button>
      </view>
    </template>
  </view>
</template>

<script>
import TemplateA from "./cmp/TemplateA/TemplateA.vue";
import TemplateB from "./cmp/TemplateB/TemplateB.vue";
import TemplateC from "./cmp/TemplateC/TemplateC.vue";
import TemplateD from "./cmp/TemplateD/TemplateD.vue";
import TemplateE from "./cmp/TemplateE/TemplateE.vue";
export default {
  components: {
    TemplateA,
    TemplateB,
    TemplateC,
    TemplateD,
    TemplateE,
  },
  data() {
    return {
      ticketInfo: {
        deepColor: '#3d5265',
        shallowColor: '#324252',
        color: "grey",
        lang: "",
        bigImg: "",
        mainTitle: "",
        subTitle: "",
        duration: 120,
        kinds: "",
        releaseTime: "",
        cinema: "",
        hall: "",
        seat: "",
        price: 30.0,
        dateTime: "",
        star: 5,
      },
      currentTemplate: "",
    };
  },
  methods: {
    //编辑票根
    editTicket() {
      this.$refs[`${this.currentTemplate}`].showDrawer();
    },
    //保存票根
    createTicket() {
      if (this.$refs[`${this.currentTemplate}`].ticketUrl) {
        uni.saveImageToPhotosAlbum({
          filePath: this.$refs[`${this.currentTemplate}`].ticketUrl,
          success: function () {
            uni.showToast({
              title: "图片下载成功",
              icon: "none",
            });
          },
        });
      }
    },
    //缓存票根
    saveTemplate(form) {
      uni.setStorageSync("ticket_form", JSON.stringify(form));
      this.ticketInfo = form;
      this.$nextTick(() => {
        this.$refs[`${this.currentTemplate}`].drawTemplate();
      });
    },
  },
  onLoad({ id }) {
    this.currentTemplate = id;
    const storageForm = uni.getStorageSync("ticket_form");
    if (storageForm) {
      this.ticketInfo = JSON.parse(storageForm);
    }
  },
};
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
