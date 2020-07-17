import { AttributeTypeMap } from "./models";

export interface DynamicFormOption {
    value?: object | null;
    label?: string | null;
    key?: string | null;
    disabled?: boolean | null;
}

export const attributeTypeMapDynamicFormOption: AttributeTypeMap[] = [
    { name: "value", type: "object" },
    { name: "label", type: "string" },
    { name: "key", type: "string" },
    { name: "disabled", type: "boolean" },
];
