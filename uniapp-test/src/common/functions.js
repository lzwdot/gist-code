wx.cloud.init();

import request from "./request";

export async function msgSecCheck(content) {
  try {
    // const res = await wx.cloud.callFunction({
    //   name: 'msgSecCheck',
    //   data: {
    //     content: content || ''
    //   }
    // })
    const res = await request.post({
      url: "/applet/msgSecCheck",
      data: {
        content: content || ''
      },
    })

    const { data } = res     
    if (data.data.errcode === 0) {
      return true
    }
    return false
  } catch (err) {
    console.log(err)
    return false
  }
}

