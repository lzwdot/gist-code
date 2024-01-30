<template>
  <view class="page">
    <view class="weui-article">
      <view class="weui-article__h1">使用说明</view>
      <view class="weui-article__section">
        <view class="weui-article__h4">复制昵称</view>
        <view class="weui-article__p">
          1、在输入框输入带字母的昵称，比如”Ｓòrγy“
        </view>
        <view class="weui-article__p">
          2、点击复制按钮
        </view>
      </view>
      <view class="weui-article__section">
        <view class="weui-article__h4">粘贴昵称</view>
        <view class="weui-article__p">
          把“Ｓòrγy”粘贴到微信里，显示效果如下：
        </view>
        <view class="weui-article__p">
          <image
            class="weui-article__img"
            src="@/static/1.png"
            mode="aspectFit"
          />
        </view>
      </view>
    </view>
  </view>
</template>
<style scoped>
.weui-article image {
  height: 200rpx;
  border: 1px solid #eee;
}
</style>