export declare class PromiseValue {
    val: any | null;
    loading?: boolean;
    loadFlag?: boolean;
    func: Promise<any>;
    constructor(func: Promise<any>);
    value: any;
}
export declare function AsyncValue(func: Promise<any>): <T>(target: T, key: keyof T) => void;
