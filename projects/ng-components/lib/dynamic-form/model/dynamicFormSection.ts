import { DynamicFormItem } from "./dynamicFormItem";
import { AttributeTypeMap } from "./models";

export interface DynamicFormSection {
    title?: string | null;
    category?: string | null;
    description?: string | null;
    text?: string | null;
    className?: string | null;
    key?: string | null;
    order?: number;
    multi?: boolean;
    sectionType?: any;
    items?: DynamicFormItem[] | null;
}

export const attributeTypeMapDynamicFormSection: AttributeTypeMap[] = [
    { name: "title", type: "string" },
    { name: "category", type: "string" },
    { name: "description", type: "string" },
    { name: "className", type: "string" },
    { name: "key", type: "string" },
    { name: "order", type: "number" },
    { name: "multi", type: "boolean" },
    { name: "sectionType", type: "any" },
    { name: "items", type: "Array<DynamicFormItem>" },
];
