/**
 * 关键字回复基本模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const questionnare = {
  // 关键字列表
  qsList(params) {
    return axios.post(`${base.automessage}/getAutomessageList`, params);
  },
  // 素材列表
  materialList(params) {
    return axios.post(`${base.automessage}/getMediaList`, params);
  },
  // 新增/修改关键字回复
  addOrUpdate(params) {
    return axios.post(`${base.automessage}/addOrUpdate`, params);
  },
  // 删除关键字
  deleteItem(params) {
    return axios.post(`${base.automessage}/delete`, params);
  },
  // 单个关键字回复
  keywordItem(params) {
    return axios.post(`${base.automessage}/selectByID`, params);
  },
  // 更新素材数据
  updateMaterial(params) {
    return axios.post(`${base.scrm}/updateMaterial`, params);
  },
}

export default questionnare;