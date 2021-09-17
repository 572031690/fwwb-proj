module.exports = {
  lintOnSave: false,
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 8077,
    proxy:{
      '/api':{
        target: 'http://localhost:8081/controller_war',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
