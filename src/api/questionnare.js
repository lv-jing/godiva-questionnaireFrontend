/**
 * 问卷基本模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/utils/http'; // 导入http中创建的axios实例
// import qs from 'qs'; // 根据需求是否导入qs模块

const questionnare = {
  // 问卷列表
  qsList(params) {
    return axios.post(`${base.qs}/getQuestionnaireList`, params);
  },
  // 新增/修改问卷
  addOrUpdateQs(params) {
    return axios.post(`${base.qs}/addOrUpdate`, params);
  },
  // 删除问卷
  deleteQS(params) {
    return axios.post(`${base.qs}/delete`, params);
  },
  // 单个问卷
  qsItem(params) {
    return axios.post(`${base.qs}/query`, params);
  },
  // 修改模板状态
  updateTemplateType(params) {
    return axios.post(`${base.qs}/updateQuestionnaireType`, params);
  },
  // 问卷记录
  qsRecord(params) {
    return axios.post(`${base.qs}/getHistoryList`, params);
  },
  // 问卷记录echarts
  qsRecordEchart(params) {
    return axios.post(`${base.qs}/getQuestionnaireStat`, params);
  },
  // 问卷记录table
  qsRecordTable(params) {
    return axios.post(`${base.qs}/getScoreStat`, params);
  },
}

export default questionnare;