import { notNull } from '@/utils';
import { Form, message } from 'ant-design-vue';

export type FormRule = {
  type: string,
  // 效验的值
  value?: any,
  // 错误时提示的message，%d 表单的值，%v FormRule的value，%l 表单label的值，%n 表单的name值
  message?: string,
  // 触发效验函数的时机
  trigger?: string[],
  // 当type为diy时，自定义效验函数
  validator?: (data: any, value: any) => boolean,
  transform?: (data: any) => any,
};

export type ValidatorError = {
  // 错误类型
  type: string;
  // 错误消息
  message: string;
};

export type ValidatorRule = {
  // @param data: 需要效验的值 @param value: FormRule传入的value @return true为通过
  validator: (data: any, value: any) => boolean,
  // 默认FormRule的value
  defaultValue?: any,
  // 默认FormRule的message
  defaultMessage?: string,
}

export type ValidatorRules = {
  [name: string]: ValidatorRule,
};

function validatorMaxOrMin(type: string) {
  return (data: any, value: number) => {
    value = Number(value);
    if (isNaN(value)) {
      message.error('validatorRules: can not set value not number!');
      return true;
    }
    if (type === 'maxLength' || type === 'minLength') {
      if (data.length !== undefined) {
        return type === 'maxLength' ? data.length <= value : data.length >= value;
      } else {
        return true;
      }
    } else {
      // 是数字
      return type === 'max' ? data <= value : data >= value;
    }
  };
}

const validatorRules: ValidatorRules = {
  required: { validator: (data: any) => notNull(data) && data !== '', defaultMessage: '%l不能为空' },
  min: { validator: validatorMaxOrMin('min'), defaultMessage: '%l不能小于%v' },
  max: { validator: validatorMaxOrMin('max'), defaultMessage: '%l不能大于%v' },
  minLen: { validator: validatorMaxOrMin('minLength'), defaultMessage: '%l长度不能小于%v' },
  maxLen: { validator: validatorMaxOrMin('maxLength'), defaultMessage: '%l长度不能大于%v' },
  isPhone: { validator: (data: any) => /^1[3456789]\d{9}$/.test(data), defaultMessage: '%l格式不正确' },
  pattern: { validator: (data: any, value: RegExp) => value.test(data), defaultMessage: '%l格式不正确' },
  isEmail: {
    validator: (data: any) => /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/.test(data),
    defaultMessage: '%l格式不正确',
  },
};

export function addRules(rs: ValidatorRules) {
  Object.assign(validatorRules, rs);
}

export function validateRules(data: any, rules: FormRule[], trigger: string) {
  const errors: ValidatorError[] = [];
  rules.forEach(rule => {
    if (rule.trigger && !rule.trigger.includes(trigger)) {
      // 如果设置了 trigger ,且 当前的trigger不包含于其中
      return;
    }
    // 当前效验规则
    let validatorRule: ValidatorRule;
    if (rule.type === 'diy' && rule.validator) {
      validatorRule = { validator: rule.validator };
    } else {
      validatorRule = validatorRules[rule.type];
    }
    if (validatorRule && !validatorRule.validator(data, rule.value || validatorRule.defaultValue)) {
      const message = rule.message || validatorRule.defaultMessage || 'error';
      errors.push({
        type: rule.type,
        message,
      });
    }
  });
  return errors;
}
