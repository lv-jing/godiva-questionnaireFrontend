const SCORE_KEY_NAME = '评分'
const SHORTANSWER_KEY_NAME = '简答'

const utils = {
  SCORE_KEY_NAME,
  SHORTANSWER_KEY_NAME,
  // the map of question type and it`s code
  SCORE_MAP: [
    { name: SCORE_KEY_NAME, code: 1 },
    { name: SHORTANSWER_KEY_NAME, code: 2 },
  ],

  toNumberzhCN(i) {
    return ["一", "二", "三"][i];
  }
}

export default utils