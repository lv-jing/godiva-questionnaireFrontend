/**
 * 接口域名的管理
 */
const apiHub = {
  'development': {
    'API_BASE': ''
  },
  'production': {
    // 'API_BASE': 'https://godiva.db0909.com',
    'API_BASE': 'https://wechatsys.godiva.cn'
  }
}
const base = {
  apiBase: `${apiHub[process.env.NODE_ENV].API_BASE}`,
  get scrm() {
    return `${this.apiBase}/scrm`
  },
  get qs() {
    return `${this.scrm}/questionnaire/godivaQuestionnaireInfo`
  },
  get qsHis() {
    return `${this.scrm}/questionnaire/godivaQuestionnaireHistory`
  },
  get automessage() {
    return `${this.scrm}/questionnaire/godivaMemberAutomessage`
  }
}

export default base;
