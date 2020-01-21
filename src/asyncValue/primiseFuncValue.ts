import { PromiseFunc } from '@/common/types';
import { PromiseValue } from '@/asyncValue/promiseValue';

export class PromiseFuncValue {
  private cacheBlock = new Map();
  private currentKey = 'default';
  private func: PromiseFunc;
  private cache: boolean;

  public constructor(func: PromiseFunc, cache = true) {
    this.func = func;
    this.cache = cache;
  }
  public get value() {
    const { cache, cacheBlock, currentKey, func } = this;
    return (...params: any) => {
      const key = JSON.stringify(params) || 'default';
      if (!cache && key !== currentKey) {
        // 不缓存数据
        this.currentKey = key;
        cacheBlock.clear();
      }
      let obj = cacheBlock.get(key);
      if (!obj) {
        // 首次加载数据
        obj = new PromiseValue((func as PromiseFunc)(...params), params.default);
        cacheBlock.set(key, obj);
      }
      return obj.value;
    }
  }
}
