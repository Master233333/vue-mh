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
      // 数据没有加载过，加载数据
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
