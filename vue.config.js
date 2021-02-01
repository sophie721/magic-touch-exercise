const path = require("path")
const resolve = dir => path.join(__dirname, dir)
const debug = process.env.NODE_ENV !== "production"

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH || "./",
  lintOnSave: true,
  runtimeCompiler: true,
  productionSourceMap: !debug,
  chainWebpack: config => {
    config.resolve.alias
      .set("vue$", "vue/dist/vue.esm-bundler.js")
      .set("@", resolve("src"));
    config.plugin("html").tap((args) => {
      args[0].title = (debug ? "(測試)" : "") + process.env.APP_TITLE;
      return args;
    });
  }
};
