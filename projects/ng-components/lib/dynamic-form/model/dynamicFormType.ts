export type DynamicFormType =
    | "Text"
    | "TextArea"
    | "Checkbox"
    | "Dropdown"
    | "Datepicker"
    | "Radio"
    | "Number"
    | "Card"
    | "ToggleSelector"
    | "Disclaimer"
    | "None";

export const DynamicFormType = {
    Text: "Text" as DynamicFormType,
    TextArea: "TextArea" as DynamicFormType,
    Checkbox: "Checkbox" as DynamicFormType,
    Dropdown: "Dropdown" as DynamicFormType,
    Datepicker: "Datepicker" as DynamicFormType,
    Radio: "Radio" as DynamicFormType,
    Number: "Number" as DynamicFormType,
    Card: "Card" as DynamicFormType,
    ToggleSelector: "ToggleSelector" as DynamicFormType,
    Disclaimer: "Disclaimer" as DynamicFormType,
    None: "None" as DynamicFormType,
};
