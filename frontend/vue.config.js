const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  pluginOptions: {
    vuetify: {},
  },
});
