import Vue from 'vue';
import { PromiseValue } from './promiseValue';
import { isPromise } from '@/utils';
import { PromiseFunc } from '@/common/types';
import { PromiseFuncValue } from '@/asyncValue/primiseFuncValue';

interface AsyncValueParams {
  func: PromiseFunc | Promise<any>;
  cache?: boolean;
  default?: any;
}

/**
 * 异步加载数据的注解
 * 如果func是一个Promise方法，注解的值的类型是Promise返回的值
 * 如果func是一个PromiseFunc方法，注解的值是一个方法，参数是Promise的参数，返回值是Promise返回的值
 * @param options
 * @constructor
 */
export function AsyncValue(options: AsyncValueParams) {
  const { func, cache = true } = options;
  if (isPromise(func)) {
    // func是Promise
    const obj = Vue.observable(new PromiseValue(func as Promise<any>, options.default));
    return <T>(target: T, key: keyof T) => {
      Object.defineProperty(target, key, {
        get: () => obj.value,
        set: (val: any) => obj.value = val,
        enumerable: true,
      });
    };
  } else {
    // func是PromiseFunc
    const obj = new PromiseFuncValue(func as PromiseFunc, Vue.observable, options.default, cache);
    return <T>(target: T, key: keyof T) => {
      Object.defineProperty(target, key, {
        get: () => (...params: any) => {
          return obj.value(params);
        },
      });
    };
  }
}
