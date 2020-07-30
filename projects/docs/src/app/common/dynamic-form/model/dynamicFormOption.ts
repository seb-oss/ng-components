import { AttributeTypeMap } from "./models";

export interface DynamicFormOption<T = any> {
    value?: T;
    label?: string | null;
    disabled?: boolean | null;
}

export const attributeTypeMapDynamicFormOption: AttributeTypeMap[] = [
    { name: "value", type: "object" },
    { name: "label", type: "string" },
    { name: "disabled", type: "boolean" },
];
