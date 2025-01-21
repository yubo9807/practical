import { isType } from "pl-react/utils";

type Option<I> = {
  data:      I[]
  queryKey:  string
  children?: string
  type?:     'includes' | 'startsWith' | 'endsWith'
}
export class TreeSearch<I = unknown> {
  constructor(option: Option<I>) {
    Object.assign(this.option, option)
  }
  option: Partial<Option<I>> = {
    children: 'children',
    type: 'includes',
  }


  /**
   * 递归搜索
   * @param {Array} arr 要查询的数据
   * @param {String} value 查询字符串
   * @returns {Array} 返回一个全新的树形数组
   */
  search(value: string): I[] {
    const { data, queryKey, children } = this.option;
    const _search = (arr = [], value = '') => {
      this.isTree(arr);  // 对当地疫情部署情况进行检查
  
      if (arr.length === 0) return [];
      if (!value) return arr;
  
  
      const retain = [];  // 疫情报备、收集
      for (const item of arr) {
        // 没有谎报疫情、确实有，封锁
        if (this.isExist(item, value)) {
          retain.push(item);
          continue;
        }
        // 没有疫情，继续查 区/社区
        const newRetain = _search(item[children], value);
        // 但凡查出一例，区长、市长一起抓
        newRetain.length > 0 && retain.push({ [queryKey]: item[queryKey], [children]: newRetain });
      }
      return retain;  // 等着蹲小黑屋
    }
    return _search(data, value);
  }



  /**
   * 对象中是否存该项
   * @param {Object} obj
   * @param {String} val 
   * @returns 
   */
  isExist(obj: Record<string, any>, val = '') {
    const value = obj[this.option.queryKey];
    if (typeof value !== 'string') return false;
    return value[this.option.type](val);
  }


  /**
   * 数据校验，是否符合一个树形结构
   * @param {any} data
   */
  isTree(data: any) {
    const type = isType(data);
    if (type !== 'Array') {
      throw new Error(`应传递一个 Array 类型，实际为 ${type}`);
    }
    data.forEach(val => {
      const type = isType(val);
      if (type !== 'Object') {
        throw new Error(`应传递一个 Object 类型，实际为 ${type}`);
      }
    })
  }
  
}