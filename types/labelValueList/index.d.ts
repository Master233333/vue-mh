import { ILabelValue } from '@/common/types';
declare type LabelValueListParam = Array<ILabelValue | string> | {
    [key: string]: string;
};
export declare class LabelValueList {
    private list;
    constructor(list: LabelValueListParam);
    setList(list: LabelValueListParam): void;
    getLabelValue(): ILabelValue[];
}
export {};
