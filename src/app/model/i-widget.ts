export interface IWidget {
    id : number | string,
    type : string,
    label?:string,
    name? : string,
    classNames? : string,
    subType? : string
}

export enum WIDGET_TYPES {
    // backend supported type
    CONTAINER = 'container',
    INPUTFIELD = 'inputfield',
    OTHER = 'inputfield'
}

export enum WIDGET_SUB_TYPES {
    // backend supported type(input fields)
    TEXT = 'text',
    TEXTAREA = 'textarea',
    COMBOBOX = 'combo',
    DATE = 'date',
    NUMERIC = 'numeric',
    // backend supported type(others)
    IMAGE = 'image'
}