import {Component, Prop} from "vue-property-decorator";
import {Component as Tsx} from "vue-tsx-support";

export interface IInput {
  value?: string | number;
  onChange?: (value: string | number) => void;
}

@Component
export class Input extends Tsx<IInput> {
  @Prop()
  public value?: string | number;
  @Prop()
  public size?: string;
  @Prop()
  public placeholder?: string;
  @Prop()
  public type?: string;

  private get attrs() {
    const { size, placeholder, type, value } = this;
    return {
      class: {
        'mh-input': true,
        'mh-input-big': size === 'big',
        'mh-input-small': size === 'small',
      },
      attrs: {
        placeholder,
        type,
      },
      domProps: {
        value,
      },
      on: {
        blur: () => this.$emit('blur'),
        focus: () => this.$emit('focus'),
      },
      ref: 'input',
    };
  }
  public render() {
    return <input {...this.attrs}/>;
  }
}
