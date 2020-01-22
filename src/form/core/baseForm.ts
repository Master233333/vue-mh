type MetaOptions = {
  rules: any[],
  initData: any,
  trigger: string,
};

const defaultTrigger = 'change';

export class BaseForm {
  private values: { [key: string]: any } = {};
  private meta: { [key: string]: MetaOptions } = {};

  public addField(name: string) {
    if (this.values.hasOwnProperty(name)) {
      console.error('BaseForm: can not set FormItem with the same name ' + name);
      return;
    }
    this.values[name] = undefined;
    this.meta[name] = {
      rules: [],
      initData: undefined,
      trigger: defaultTrigger,
    };
  }
  public removeField(name: string) {
    delete this.values[name];
    delete this.meta[name];
  }
  public getValue(name: string): any {
    return this.values[name];
  }
  public getValues(names?: string[]) {
    const { values } = this;
    if (!names) {
      return { ...values }
    }
    const out: { [key: string]: any } = {};
    names.forEach((name) => {
      out[name] = values[name];
    });
    return out;
  }
  public getMeta(name: string): MetaOptions {
    return this.meta[name];
  }
  public setValues(obj: { [name: string]: any }) {
    Object.keys(obj).forEach((name) => {
      if (!this.values.hasOwnProperty(name)) {
        console.error('BaseForm: can not set value not in form, name: ' + name);
        return;
      }
      this.values[name] = obj[name];
    });
  }
  public setMeta(name: string, meta: MetaOptions) {
    if (!this.meta.hasOwnProperty(name)) {
      console.error('BaseForm: can not set value not in form, name: ' + name);
      return;
    }
    this.meta[name] = meta;
  }
}
