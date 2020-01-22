import { ILabelValue } from '@/common/types';

type LabelValueListParam = Array<ILabelValue | string> | { [key: string]: string };

export class LabelValueList {
  private list!: ILabelValue[];

  constructor(list: LabelValueListParam) {
    this.setList(list);
  }
  public setList(list: LabelValueListParam) {
    if (Array.isArray(list)) {
      // list 是数组
      this.list = list.map(item => {
        if (typeof item === 'string') {
          return {
            label: item,
            value: item,
          };
        } else {
          return { ...item };
        }
      });
    } else if (typeof list === 'object') {
      // list 是{ key: value }对象
      this.list = Object.keys(list).map(key => {
        const item = list[key];
        return {
          label: item,
          value: key,
        };
      })
    } else {
      console.error('EnumList: can not resolve the obj ', list);
      this.list = [];
    }
  }
  public getLabelValue() {
    return this.list;
  }
}
