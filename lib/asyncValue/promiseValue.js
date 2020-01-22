export class PromiseValue {
  constructor(func, defaultValue) {
    this.val = null;
    this.loading = void 0;
    this.loadFlag = void 0;
    this.func = void 0;
    this.defaultValue = void 0;
    this.func = func;
    this.val = defaultValue;
    this.defaultValue = defaultValue;
  }

  set value(val) {
    this.val = val;
  }

  get value() {
    const {
      val,
      loading,
      loadFlag,
      func,
      defaultValue
    } = this;

    if (!loadFlag && !loading) {
      // 数据没有加载过，加载数据
      this.loading = true;
      func.then(data => {
        this.val = data || defaultValue;
        this.loading = false;
        this.loadFlag = true;
      });
    }

    return val;
  }

}