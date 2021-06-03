import { AttributeTypeMap } from "./models";
import { DynamicFormItem } from "./dynamicFormItem";

export interface ConfirmInformation {
    title?: string;
    message?: string;
    accept?: string;
    deny?: string;
}

export interface DynamicFormOption<T = any> {
    id?: string;
    value?: T;
    label?: string | null;
    disabled?: boolean | null;
    category?: string;
    order?: number;
    confirm?: ConfirmInformation;
    followUpItems?: DynamicFormItem[];
}

export const attributeTypeMapDynamicFormOption: AttributeTypeMap[] = [
    { name: "value", type: "object" },
    { name: "label", type: "string" },
    { name: "disabled", type: "boolean" },
];
