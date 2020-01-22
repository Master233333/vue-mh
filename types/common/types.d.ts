export declare type PromiseFunc = (...params: any) => Promise<any>;
export declare type ILabelValue = {
    label: string;
    value: string | number;
    key?: string | number;
    title?: string;
    children?: ILabelValue[];
    parentId?: string | number;
    [key: string]: any;
};
