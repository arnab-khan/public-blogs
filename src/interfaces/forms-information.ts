export interface FormsInformation {
    login: () => FormInformation;
    signUp: () => FormInformation;
    post: () => FormInformation;
    editProfile: () => FormInformation;
    changePasssword: () => FormInformation;
}
export interface FormInformation {
    submitButton?: SubmitButton;
    formFields: FormFields[];
}
export interface FormFields {
    information: FieldInformation;
    sequence: number;
}
export interface FieldInformation {
    controlName: string;
    fieldType: string;
    type: string;
    label?: string;
    placeholder?: string;
    validation?: Validation[];
}
export interface Validation {
    type: string;
    message: string | null;
    value: any;
}
export interface SubmitButton {
    label?: string;
    classes?: string;
}

export interface ControllValue {
    [controllNAme: string]: any;
}