import { ValidatorFn } from '@angular/forms';
import { IWidget } from "./i-widget";

export interface IInputField extends IWidget{
    isRequired?: boolean;
    maxLength?: number | null;
    minLength?: number | null;
    minValue?: number | null;
    maxValue?: number | null;
    pattern?: RegExp | string;
    value?: string | number | null | Date | boolean;
    /**
     * The field 'initValue' is used only on UI side 
     */
    initValue?: string | number | null | Date | boolean;
    validators?: ValidatorFn[]
}
