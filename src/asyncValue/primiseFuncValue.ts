import { PromiseFunc } from '@/common/types';
import { PromiseValue } from '@/asyncValue/promiseValue';

export class PromiseFuncValue {
  private cacheBlock: any = {};
  private currentKey = 'default';
  private func: PromiseFunc;
  private cache: boolean;
  private defaultValue: any;
  private observable: any;

  public constructor(func: PromiseFunc, observable: any, defaultValue: any, cache = true) {
    this.func = func;
    this.cache = cache;
    this.defaultValue = defaultValue;
    this.observable = observable;
  }
  public get value() {
    const { cache, currentKey, func, defaultValue, observable } = this;
    return (...params: any) => {
      const key = JSON.stringify(params) || 'default';
      if (!cache && key !== currentKey) {
        // 不缓存数据
        this.currentKey = key;
        this.cacheBlock = {};
      }
      let obj = this.cacheBlock[key];
      if (!obj) {
        // 首次加载数据
        obj = observable(new PromiseValue(func(...params), defaultValue));
        this.cacheBlock[key] = obj;
      }
      return obj.value;
    }
  }
}
