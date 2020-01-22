import { PromiseFunc } from '@/common/types';
export declare class PromiseFuncValue {
    private cacheBlock;
    private currentKey;
    private func;
    private cache;
    private defaultValue;
    private observable;
    constructor(func: PromiseFunc, observable: any, defaultValue: any, cache?: boolean);
    readonly value: (...params: any) => any;
}
