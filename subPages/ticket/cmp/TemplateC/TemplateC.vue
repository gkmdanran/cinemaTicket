<template>
  <view class="TemplateC">
    <canvas
      class="canvas"
      canvas-id="TemplateC"
      id="TemplateC"
      :style="{ height: `${ticketHeight * 3 + filmHeight * 3}px` }"
    ></canvas>
    <image class="pic" :src="ticketUrl" mode="widthFix"></image>
    <FormC
      ref="form"
      @save="handleSave"
      :form="{ filmImg: filmImg, ticketImg: ticketImg }"
    >
    </FormC>
  </view>
</template>

<script>
import FormC from "../FormC/FormC.vue";
export default {
  name: "TemplateC",
  components: {
    FormC,
  },

  data() {
    return {
      loading: false,
      ticketUrl: "",
      filmImg: "",
      ticketImg: "",
      filmHeight: 420,
      ticketHeight: 450,
    };
  },
  methods: {
    //打开抽屉
    showDrawer() {
      this.$refs["form"].showDrawer();
    },
    //保存预览
    handleSave(form) {
      this.filmImg = form.filmImg;
      this.ticketImg = form.ticketImg;
      this.ticketHeight = form.ticketHeight;
      this.filmHeight = form.filmHeight;
      this.drawTemplate();
    },
    //生成图片
    createImage() {
      uni.canvasToTempFilePath(
        {
          quality: 1,
          canvasId: "TemplateC",
          success: (res) => {
            if (res.tempFilePath) {
              this.ticketUrl = res.tempFilePath.replace(/[\r\n]/g, "");
            }
          },
          complete: () => {
            this.loading = false;
            uni.hideLoading();
          },
        },
        this
      );
    },
    //绘制canvas
    drawTemplate() {
      if (this.loading) return;
      const width = 900;
      const ctx = uni.createCanvasContext("TemplateC", this);

      //票根
      ctx.beginPath();
      ctx.setFillStyle("#fff");
      ctx.fillRect(0, 0, width, this.ticketHeight * 3 + this.filmHeight * 3);
      //海报
      ctx.beginPath();
      ctx.setFillStyle("#f1f1f1");
      ctx.fillRect(0, 0, width, 1260);
      ctx.drawImage(this.filmImg, 0, 0, 900, this.filmHeight * 3);
      ctx.drawImage(
        this.ticketImg,
        0,
        this.filmHeight * 3,
        900,
        this.ticketHeight * 3
      );
      ctx.draw();
      this.loading = true;
      uni.showLoading({
        title: "生成中...",
        mask: true,
      });
      setTimeout(() => {
        this.createImage();
      }, 1000);
    },
  },
};
</script>
<style lang="less" scoped>
.TemplateC {
  position: relative;

  .canvas {
    position: absolute;
    top: -9999px;
    width: 900px;
    height: 2610px;
  }

  .pic {
    display: block;
    margin: 0 auto;
    margin-top: 20rpx;
    width: 360rpx;
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.302);
  }
}
</style>
