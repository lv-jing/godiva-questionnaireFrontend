/**
 * axios封装：
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import { Message } from 'element-ui';

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 404请求不存在
    case 404:
      Message('请求的资源不存在');
      break;
    default:
      console.log(other);
  }
}

let instance = axios.create({ timeout: 1000 * 12 })

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 请求拦截器 
 */
instance.interceptors.request.use(
  config => {
    return config;
  },
  error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else if (error.message.indexOf('timeout') > -1) {
      Message('接口请求超时，请稍后重试！' + error.config.url);
    } else {
      return Promise.reject(error);
    }
  });

export default instance;