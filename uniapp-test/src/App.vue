<script>
import request from "./common/request";

export default {
  onLaunch: function () {
    console.log("App Launch");
    const storageKey = "token";

    // 登录
    try {
      const token = uni.getStorageSync(storageKey);
      uni.login({
        success: (loginRes) => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log(loginRes);
          request.get({
            url: "/applet/jscodeToSession",
            data: {
              code: loginRes.code || "",
            },
            success: (res) => {
              // console.log(res);
              const { data } = res;
              if (data && data.data) {
                uni.setStorage({ key: storageKey, data: data.data });
              }
            },
          });
        },
      });
    } catch (e) {
      // error
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style>
@import "./common/weui.wxss";

page,
.page {
  width: 100vw;
  height: 100vh;
  background-color: #ededed;
}
</style>
