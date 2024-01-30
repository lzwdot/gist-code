// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  env: 'tools-s248b'
});

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    console.log('event', event);
    var result = await cloud.openapi.security.msgSecCheck({
      content: event.content,
    });
    return result;
  } catch (err) {
    throw err;
  }
}