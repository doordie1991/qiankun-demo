const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  lintOnSave: false,
  devServer: {
    port: 8001,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    }
  }
}
