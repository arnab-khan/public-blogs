export interface FormsInformation {
    login: () => FormInformation;
    signUp: () => FormInformation;
}
export interface FormInformation {
    formFields: FormFields[];
}
export interface FormFields {
    information: FieldInformation;
    sequence: number;
}
export interface FieldInformation {
    controllName: string;
    fieldType: string;
    type: string;
    label?: string;
    placeholder?: string;
    validation?: Validation[];
}
export interface Validation {
    type: string;
    message: string;
    value: any;
}