<template>
  <view class="page">
    <view class="weui-form">
      <view class="weui-form__text-area">
        <view class="weui-form__desc">显示您的个性昵称</view>
      </view>
      <view class="weui-form__control-area">
        <view class="weui-cells__group weui-cells__group_form">
          <view class="weui-cells__title">
            {{ fonts ? fonts : allFonts }}
          </view>
          <view class="weui-cells weui-cells_form">
            <view class="weui-cell">
              <view class="weui-cell__bd">
                <textarea
                  class="weui-textarea"
                  rows="2"
                  placeholder="请输入"
                  v-model="textareaVal"
                  @input="inputVal"
                >
                </textarea>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="weui-form__opr-area">
        <view class="weui-flex">
          <view class="weui-flex__item">
            <button
              class="weui-btn weui-btn_warn"
              style="margin-right: 32px"
              form-type="reset"
              @click="resetVal"
            >
              重置
            </button>
          </view>
          <view class="weui-flex__item">
            <button
              class="weui-btn weui-btn_primary"
              style="margin-left: 32px"
              @click="copyFonts"
            >
              复制
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { msgSecCheck } from '../../common/functions';
import { reactive, ref } from "vue";

const fontArr = [
  "🇦 ",
  "🇧 ",
  "🇨 ",
  "🇩 ",
  "🇪 ",
  "🇫 ",
  "🇬 ",
  "🇭 ",
  "🇮 ",
  "🇯 ",
  "🇰 ",
  "🇱 ",
  "🇲 ",
  "🇳 ",
  "🇴 ",
  "🇵 ",
  "🇶 ",
  "🇷 ",
  "🇸 ",
  "🇹 ",
  "🇺 ",
  "🇻 ",
  "🇼 ",
  "🇽 ",
  "🇾 ",
  "🇿 ",
];
const allFonts = ref(fontArr.join(""));
const textareaVal = ref("");

let fonts = ref("");
let content = "";

const inputVal = () => {
  content = textareaVal.value;

  let num = content.length;
  let start = 97; // 小写 a 的 ascii 码
  let regx = /^[A-Za-z]*$/;
  let key = 0;
  let str = "";

  content = content.toLowerCase();
  for (let i = 0; i < num; i++) {
    if (regx.test(content[i])) {
      key = content[i].charCodeAt() - start;
      str += fontArr[key];
    } else {
      str += content[i];
    }
  }
  fonts.value = str;
};
const copyFonts = async () => {
  if (!content) {
    return;
  }

  const isCheck = await msgSecCheck(content);
  if (!isCheck) {
    uni.showToast({
      title: "内容含有敏感内容",
      icon: "none",
    });
    return;
  }

  uni.setClipboardData({
    data: fonts.value,
    success(res) {
      uni.getClipboardData({
        success(res) {
          console.log(res.data); // data
        },
      });
    },
  });
};
const resetVal = () => {
  textareaVal.value = "";
  fonts.value = "";
};
</script>

<style lang='scss' scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
}
.weui-form {
  height: 90vh;
  width: 98%;
  min-height: auto;
}

.weui-form__opr-area .weui-btn {
  width: auto;

  &::after {
    border: none;
  }
}
.weui-form__desc {
  color: var(--weui-LINK);
}
.weui-cells__title {
  font-size: 36rpx;
  height: 80rpx;
}
.weui-form__control-area {
  margin-bottom: 0;
  flex: initial;
}
</style>