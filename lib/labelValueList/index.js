export class LabelValueList {
  constructor(list) {
    this.list = void 0;
    this.setList(list);
  }

  setList(list) {
    if (Array.isArray(list)) {
      // list 是数组
      this.list = list.map(item => {
        if (typeof item === 'string') {
          return {
            label: item,
            value: item
          };
        } else {
          return { ...item
          };
        }
      });
    } else if (typeof list === 'object') {
      // list 是{ key: value }对象
      this.list = Object.keys(list).map(key => {
        const item = list[key];
        return {
          label: item,
          value: key
        };
      });
    } else {
      console.error('EnumList: can not resolve the obj ', list);
      this.list = [];
    }
  }

  getLabelValue() {
    return this.list;
  }

}