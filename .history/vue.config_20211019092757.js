// const LOCAL = 'http://localhost:8081/controller_war'
const YS = 'http://10.1.8.199/controller_war'
module.exports = {
  lintOnSave: false,
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 8077,
    proxy: {
      '/api': {
        target: YS,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
