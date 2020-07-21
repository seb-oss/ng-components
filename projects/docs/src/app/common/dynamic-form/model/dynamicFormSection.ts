import { DynamicFormItem } from "./dynamicFormItem";
import { AttributeTypeMap } from "./models";

export interface DynamicFormSection {
    title?: string | null;
    className?: string | null;
    key?: string | null;
    order?: number;
    multi?: boolean;
    items?: Array<DynamicFormItem> | null;
}

export const attributeTypeMapDynamicFormSection: AttributeTypeMap[] = [
    { name: "title", type: "string" },
    { name: "className", type: "string" },
    { name: "key", type: "string" },
    { name: "order", type: "number" },
    { name: "multi", type: "boolean" },
    { name: "items", type: "Array<DynamicFormItem>" },
];
