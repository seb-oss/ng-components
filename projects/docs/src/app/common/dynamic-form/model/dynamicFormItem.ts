import { DynamicFormType } from "./dynamicFormType";
import { DynamicFormOption } from "./dynamicFormOption";
import { AttributeTypeMap } from "./models";

export interface DynamicFormItem {
    key: string | null;
    value?: any;
    label?: string | null;
    description?: string | null;
    className?: string | null;
    required?: boolean;
    multi?: boolean;
    min?: any;
    max?: any;
    order?: number;
    placeholder?: string | null;
    options?: Array<DynamicFormOption> | null;
    rulerKey?: string | null;
    condition?: any;
    controlType: DynamicFormType;
}

export const attributeTypeMapDynamicFormItem: AttributeTypeMap[] = [
    { name: "key", type: "string" },
    { name: "value", type: "object" },
    { name: "label", type: "string" },
    { name: "className", type: "string" },
    { name: "required", type: "boolean" },
    { name: "multi", type: "boolean" },
    { name: "min", type: "object" },
    { name: "max", type: "object" },
    { name: "order", type: "number" },
    { name: "placeholder", type: "string" },
    { name: "options", type: "Array<DynamicFormOption>" },
    { name: "rulerKey", type: "string" },
    { name: "condition", type: "object" },
    { name: "controlType", type: "DynamicFormType" },
];
