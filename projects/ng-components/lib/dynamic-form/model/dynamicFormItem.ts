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
    confirm,
}

export enum MediaKind {
    Image,
    Video,
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

export interface Media {
    id: string;
    url: string;
    kind: MediaKind;
    mimeType: string;
    name: string;
    description: string;
}

export interface DynamicFormItem {
    key: string | null;
    category?: string | null; //subTitle
    title?: string | null; //name
    value?: any;
    label?: string | null;
    descriptionHeader?: string | null; //text
    description?: string | null;
    media?: Media[];
    className?: string | null;
    multi?: boolean;
    order?: number;
    placeholder?: string | null;
    options?: Array<DynamicFormOption> | null;
    rulerKey?: string | null;
    condition?: any;
    controlType: DynamicFormType;
    rules?: Rule[];
    controlMetaData?: {
        label?: string;
        description?: string;
        inputGroupLabel?: string;
        inputGroupPosition?: "left" | "right";
    };
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
    { name: "controlMetaData", type: "object" },
];
