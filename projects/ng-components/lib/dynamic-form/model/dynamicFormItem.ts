import { DynamicFormType } from "./dynamicFormType";
import { DynamicFormOption } from "./dynamicFormOption";
import { AttributeTypeMap } from "./models";

export enum RuleType {
    required,
    min,
    max,
    minLength,
    maxLength,
    pattern,
    minThanReference,
    minThanEqualsReference,
    maxThanReference,
    maxThanEqualReference,
}

export interface formItemValidation {
    required?: boolean;
    min?: number | string;
    max?: number | string;
    minLength?: number | string;
    maxLength?: number | string;
}

export interface Rule {
    value?: any;
    message?: string;
    type: RuleType;
}

export interface DynamicFormItem {
    key: string | null;
    value?: any;
    label?: string | null;
    description?: string | null;
    className?: string | null;
    multi?: boolean;
    order?: number;
    placeholder?: string | null;
    options?: Array<DynamicFormOption> | null;
    rulerKey?: string | null;
    condition?: any;
    controlType: DynamicFormType;
    rules?: Rule[];
}

export const attributeTypeMapDynamicFormItem: AttributeTypeMap[] = [
    { name: "key", type: "string" },
    { name: "value", type: "object" },
    { name: "label", type: "string" },
    { name: "description", type: "string" },
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
