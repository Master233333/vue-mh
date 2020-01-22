export declare class PromiseValue {
    private val;
    private loading?;
    private loadFlag?;
    private func;
    private defaultValue;
    constructor(func: Promise<any>, defaultValue: any);
    value: any;
}
