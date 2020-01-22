import { PromiseValue } from '@/asyncValue/promiseValue';
export class PromiseFuncValue {
  constructor(func, observable, defaultValue, cache = true) {
    this.cacheBlock = {};
    this.currentKey = 'default';
    this.func = void 0;
    this.cache = void 0;
    this.defaultValue = void 0;
    this.observable = void 0;
    this.func = func;
    this.cache = cache;
    this.defaultValue = defaultValue;
    this.observable = observable;
  }

  get value() {
    const {
      cache,
      currentKey,
      func,
      defaultValue,
      observable
    } = this;
    return (...params) => {
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
    };
  }

}