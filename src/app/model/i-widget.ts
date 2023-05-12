import { ValidatorFn } from '@angular/forms';
import { HttpParams } from '@angular/common/http';


export interface IWidget {
    id: number | string,
    type: string,
    label?: string,
    name?: string,
    style?: string,
    classNames?: string,
    subType?: string
    config?: any;
}

export interface IContainer extends IWidget {
    layout?: string,
    html?: string,
    children?: IWidget[]
}

export interface IButton extends IWidget {
    buttonType?: string;
    onclick?: IMethodCall;
}

export interface IInputField extends IWidget {
    required?: boolean;
    placeholder?: string;
    disabled: boolean;
    readonly: boolean;
    value?: string | number | null | Date | boolean;
    /**
     * The field 'initValue' is used only on UI side 
     */
    initValue?: string | number | null | Date | boolean;
    validators?: ValidatorFn[]
}

export interface ITextField extends IInputField {
    maxLength?: number | null;
    minLength?: number | null;
    mask?: string;
    pattern?: RegExp | string;
}

export interface INumericField extends IInputField {
    minValue?: number | string;
    maxValue?: number | string;
}
export interface IComboboxField extends IInputField {
    options?: [];
    optionLabel?: string;
    optionValue?: string;
    listName?: string;
}

export interface IDateField extends IInputField {
    minValue?: string | Date;
    maxValue?: string | Date;
}

export interface IOther {
}

export interface IMethodCall {
    member?: string;
    method?: string;
    params?: [];
}


export enum WIDGET_TYPES {
    // backend supported type
    CONTAINER = 'container',
    INPUTFIELD = 'inputfield',
    BUTTON = 'button',
    OTHER = 'otherfield'
}

export enum WIDGET_SUB_TYPES {
    // backend supported type(input fields)
    CHECKBOX = 'checkbox',
    COMBOBOX = 'combobox',
    DATE = 'date',
    MASK = 'mask',
    NUMERIC = 'numeric',
    PASSWORD = 'password',
    TEXT = 'text',
    TEXTAREA = 'textarea',
    // backend supported type(others)
    IMAGE = 'image',
}

export enum LABEL_POSITION {
    // backend supported type(input fields)
    LEFT = 'left',
    TOP = 'top'
}

export enum LAYOUT_TYPES {
    // backend supported type(input fields)
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal'
}

export class FormRequest {
    formName?: string;
    action?:string;
    parameters?: HttpParams;
}
