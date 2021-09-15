import ApiConfig from './api/index'
import { post, get } from './index'

var sendAxios = function (url, data, sendHeader) {
  console.log(data, 'dadada')
  // debugger
  const start = url.lastIndexOf('/') + 1 // 获得最后一次出现‘/’的位置
  const strName = url.slice(start) // 取得从该位置到结束的名字也就是方法name
  const filepath = url.slice(0, start - 1)// 取得路径名

  const axiosData = ApiConfig[filepath]
  if (!axiosData) {
    console.log('api地址错误!!')
    return
  }
  if (axiosData.length) {
    var ajaxData = ''
    axiosData.forEach(element => {
      if (element.name === strName) {
        ajaxData = element
      }
    })

    if (ajaxData.method === 'GET') {
      if (!ajaxData.params) {
        alert('参数头错误')
        return
      }
      for (const i in ajaxData.params) {
        ajaxData.params[i] = data.params[i]
      }
      return get(ajaxData.path, ajaxData.params)
    } else if (ajaxData.method === 'POST') {
      for (const i in ajaxData.data) {
        ajaxData.data[i] = data[i]
      }
      return post(ajaxData.path, ajaxData.data)
    } else {
      alert('请求类型错误!!!')
    }
  }
}

export default sendAxios
