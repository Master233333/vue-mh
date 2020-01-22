import { PromiseFunc } from '@/common/types';
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
export declare function AsyncValue(options: AsyncValueParams): <T>(target: T, key: keyof T) => void;
export {};
