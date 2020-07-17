import { DynamicFormItem } from "./dynamicFormItem";
import { AttributeTypeMap } from "./models";

export interface DynamicFormResponseItem {
    key?: string | null;
    value?: object | null;
    sectionId?: string | null;
    sectionIndex?: number;
    formItem?: DynamicFormItem | null;
}

export const attributeTypeMapDynamicFormResponseItem: AttributeTypeMap[] = [
    { name: "key", type: "string" },
    { name: "value", type: "object" },
    { name: "sectionId", type: "string" },
    { name: "sectionIndex", type: "number" },
    { name: "formItem", type: "DynamicFormItem" },
];
