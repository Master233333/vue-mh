import Vue from 'vue';
import { PromiseValue } from './promiseValue';
import { isPromise } from '@/utils';
import { PromiseFunc } from '@/common/types';

interface AsyncValueParams {
  func: PromiseFunc | Promise<any>;
  cache?: boolean;
  default?: any;
}


/**
 * 异步加载数据的注解
 * 如果func是一个Promise方法，注解的值的类型是Promise返回的值
 * 如果func是一个PromiseFunc方法，注解的值是一个方法，参数是Promise的参数，返回值是Promise返回的值
 * @param params
 * @constructor
 */
export function AsyncValue(params: AsyncValueParams) {
  const { func, cache = true } = params;
  if (isPromise(func)) {
    // func是Promise
    const obj = Vue.observable(new PromiseValue(func as Promise<any>, params.default));
    return <T>(target: T, key: keyof T) => {
      Object.defineProperty(target, key, {
        get: () => obj.value,
        set: (val: any) => obj.value = val,
        enumerable: true,
      });
    };
  } else {
    // func是PromiseFunc
    // 缓存块
    const cacheBlock = new Map();
    // 缓存params
    let currentKey = 'default';
    return <T>(target: T, key: keyof T) => {
      Object.defineProperty(target, key, {
        get: () => (...params: any) => {
          const key = JSON.stringify(params) || 'default';
          if (!cache && key !== currentKey) {
            // 不缓存数据
            currentKey = key;
            cacheBlock.clear();
          }
          let obj = cacheBlock.get(key);
          if (!obj) {
            // 首次加载数据
            obj = Vue.observable(new PromiseValue((func as PromiseFunc)(...params), params.default));
            cacheBlock.set(key, obj);
          }
          return obj.value;
        },
      });
    };
  }
}
