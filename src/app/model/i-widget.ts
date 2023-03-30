import { ValidatorFn } from '@angular/forms';

export interface IWidget {
    id : number | string,
    type : string,
    label?:string,
    name? : string,
    style?: string,
    classNames? : string,
    subType? : string
}

export interface IContainer extends IWidget{
    layout? : string,
    html? : string,
    children? : IWidget[]
}

export interface IInputField extends IWidget{
    isRequired?: boolean;
    maxLength?: number | null;
    minLength?: number | null;
    minValue?: number | string | Date;
    maxValue?: number | string | Date;
    mask?: string;
    placeholder?: string;
    pattern?: RegExp | string;
    value?: string | number | null | Date | boolean;
    config?:any;
    /**
     * The field 'initValue' is used only on UI side 
     */
    initValue?: string | number | null | Date | boolean;
    validators?: ValidatorFn[]
}
export interface IOther {
}

export enum WIDGET_TYPES {
    // backend supported type
    CONTAINER = 'container',
    INPUTFIELD = 'inputfield',
    OTHER = 'otherfield'
}

export enum WIDGET_SUB_TYPES {
    // backend supported type(input fields)
    CHECKBOX = 'checkbox',
    COMBOBOX = 'combo',
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