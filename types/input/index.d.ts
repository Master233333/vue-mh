import { Component as Tsx } from "vue-tsx-support";
import { VNode } from 'vue';
export interface IInput {
    value?: string | number;
    onChange?: (value: string | number) => void;
}
export declare class Input extends Tsx<IInput> {
    value?: string | number;
    size?: string;
    placeholder?: string;
    type?: string;
    private readonly attrs;
    render(): VNode;
}
