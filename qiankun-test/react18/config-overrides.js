const { name } = require('./package.json')
const path = require('path')

module.exports = {
  webpack: function (config, env) {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = `umd`;  // 把微应用打包成 umd 库格式
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
    config.output.globalObject = `window`; 
    
    return config
  },
  paths: function (paths, env) {
    // 打包
    paths.appBuild = path.join(__dirname, '../dist/react18-dist');
    paths.publicUrl = '/react18-dist/' // 好像无效，需要在 .env 中配置

    return paths;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);

      config.headers = {
        'Access-Control-Allow-Origin': '*',
      };
      config.historyApiFallback = true;
      config.hot = false;
      // config.watchContentBase = false; // webpack5 不存在了
      config.liveReload = false
      config.port = 8092  // 好像无效，需要在 .env 中配置

      return config
    }
  }
}