import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";

var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

import { Component, Prop } from "vue-property-decorator";
import { Component as Tsx } from "vue-tsx-support";
export let Input = (_dec = Prop(), _dec2 = Prop(), _dec3 = Prop(), _dec4 = Prop(), Component(_class = (_class2 = (_temp = class Input extends Tsx {
  constructor(...args) {
    super(...args);

    _initializerDefineProperty(this, "value", _descriptor, this);

    _initializerDefineProperty(this, "size", _descriptor2, this);

    _initializerDefineProperty(this, "placeholder", _descriptor3, this);

    _initializerDefineProperty(this, "type", _descriptor4, this);
  }

  get attrs() {
    const {
      size,
      placeholder,
      type,
      value
    } = this;
    return {
      class: {
        'mh-input': true,
        'mh-input-big': size === 'big',
        'mh-input-small': size === 'small'
      },
      attrs: {
        placeholder,
        type
      },
      domProps: {
        value
      },
      on: {
        blur: () => this.$emit('blur'),
        focus: () => this.$emit('focus')
      },
      ref: 'input'
    };
  }

  render() {
    const h = arguments[0];
    return h("input", _mergeJSXProps([{}, this.attrs]));
  }

}, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "value", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "size", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "placeholder", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);