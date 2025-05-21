const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist', // 預設已是 dist，可省略
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
  },
  devServer: {
    historyApiFallback: true
  }
});
