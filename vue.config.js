module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "点爭鮮 | 點餐系統";
      return args;
    });
  },
};
