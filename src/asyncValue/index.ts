import Vue from 'vue';

interface AsyncValueParams {
  func: Promise<any>;
  default?: any;
}

export class PromiseValue {
  private val: any | null = null;
  private loading?: boolean;
  private loadFlag?: boolean;
  private func: Promise<any>;
  private defaultValue: any;

  public constructor(func: Promise<any>, defaultValue: any) {
    this.func = func;
    this.val = defaultValue;
    this.defaultValue = defaultValue;
  }
  public set value(val: any) {
    this.val = val;
  }
  public get value() {
    const { val, loading, loadFlag, func, defaultValue } = this;
    if (!loadFlag && !loading) {
      this.loading = true;
      func.then((data: any) => {
        this.val = data || defaultValue;
        this.loading = false;
        this.loadFlag = true;
      })
    }
    return val;
  }
}

export function AsyncValue(params: AsyncValueParams) {
  const obj = Vue.observable(new PromiseValue(params.func, params.default));
  return <T>(target: T, key: keyof T) => {
    Object.defineProperty(target, key, {
      get: () => obj.value,
      set: (val: any) => obj.value = val,
      enumerable: true,
    });
  }
}
