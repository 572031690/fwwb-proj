import ApiConfig from './api/index'
import { post, get } from './index'

/*
  @desc: 通过地址路径找到文件并找到数据
*/
function getPathData (url) {
  const start = url.lastIndexOf('/') + 1 // 获得最后一次出现‘/’的位置
  const strName = url.slice(start) // 取得从该位置到结束的名字也就是方法name
  const filepath = url.slice(0, start - 1)// 取得路径名
  const axiosData = ApiConfig[filepath]
  if (!axiosData) {
    console.log('api地址错误!!')
    return false
  }
  const ajaxData = getApplyData(axiosData, strName)
  return ajaxData
}
/*
  @desc: 获得api类里面的参数数据
*/
function getApplyData (axiosData, strName) {
  let ajaxData = ''
  axiosData.forEach(element => {
    if (element.name === strName) {
      ajaxData = element
    }
  })
  return ajaxData
}
/*
  @desc: 判断请求类型发送请求
*/
function getMethod (ajaxData, data, sendType) {
  console.log(data, 'datadataDdsad爱仕达')
  if (!ajaxData[sendType]) {
    alert('参数头错误')
    return
  }
  if (sendType === 'params') {
    for (const i in ajaxData[sendType]) {
      ajaxData[sendType][i] = data[sendType][i]
    }
    return get(ajaxData.path, ajaxData[sendType])
  }
  if (sendType === 'data') {
    for (const i in ajaxData[sendType]) {
      ajaxData[sendType][i] = data[i]
    }
    return post(ajaxData.path, ajaxData[sendType])
  }
}

var sendAxios = function (url, data, sendHeader) {
  console.log(data, 'dadada')
  // debugger
  // const start = url.lastIndexOf('/') + 1 // 获得最后一次出现‘/’的位置
  // const strName = url.slice(start) // 取得从该位置到结束的名字也就是方法name
  // const filepath = url.slice(0, start - 1)// 取得路径名

  // const axiosData = getPathData(url)
  // if (!axiosData) {
  //   console.log('api地址错误!!')
  //   return
  // }

  // var ajaxData = ''
  // axiosData.forEach(element => {
  //   if (element.name === strName) {
  //     ajaxData = element
  //   }
  // })
  var ajaxData = getPathData(url)
  if (!ajaxData) return // 判断是否为请求地址错误

  if (ajaxData.method === 'GET') {
    // if (!ajaxData.params) {
    //   alert('参数头错误')
    //   return
    // }
    // for (const i in ajaxData.params) {
    //   ajaxData.params[i] = data.params[i]
    // }
    // return get(ajaxData.path, ajaxData.params)
    const sendData = getMethod(ajaxData, data, 'params')
    return sendData
  } else if (ajaxData.method === 'POST') {
    // if (!ajaxData.data) {
    //   alert('参数头错误')
    //   return
    // }
    // for (const i in ajaxData.data) {
    //   ajaxData.data[i] = data[i]
    // }
    // return post(ajaxData.path, ajaxData.data)
    const sendData = getMethod(ajaxData, data, 'data')
    return sendData
  } else {
    alert('请求类型错误!!!')
  }
}

export default sendAxios
