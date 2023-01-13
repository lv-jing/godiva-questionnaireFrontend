/** 
 * api接口的统一出口
 */

// 产品模块接口
import questionnare from '@/api/questionnare';
import keyword from '@/api/keyword';
// 其他模块的接口……

// 导出接口
export default {
  questionnare,
  keyword,
  // ……
}