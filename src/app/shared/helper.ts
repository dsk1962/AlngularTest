import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IWidget, IInputField } from '../model/i-widget';
export class Helper {

    static getControlName(iWidget: IWidget): string {
        if (iWidget?.name) return iWidget.name;
        if (iWidget.id) return iWidget.id.toString();
        return '';
    }
    static getValidatorsFn(field: IInputField): ValidatorFn[] {
        const validatorsFn: ValidatorFn[] = [];
        let f = field as any;
        if (field.isRequired)
            validatorsFn.push(Validators.required);
        if (typeof f.minLength !== 'undefined')
            validatorsFn.push(Validators.minLength(f.minLength));
        if (typeof f.maxLength !== 'undefined')
            validatorsFn.push(Validators.maxLength(f.maxLength));
        if (typeof f.config?.email !== 'undefined')
            validatorsFn.push(Validators.email);
        if (typeof f.minValue !== 'undefined')
            validatorsFn.push(Validators.min(f.minValue));
        if (typeof f.maxValue !== 'undefined')
            validatorsFn.push(Validators.min(f.maxValue));
        return validatorsFn;
    }

    /**
    * setValidator - custom function to set validators to Angular control field to prevent removing old validators.
    * Both removeValidator and setValidator functions should be used together
    */
    static setValidator(control: AbstractControl, validator: ValidatorFn | ValidatorFn[]): void {
        if (!(<any>control)?.validatorsList) {
            (<any>control).validatorsList = [];
        }
        if (Array.isArray(validator)) {
            (<any>control)?.validatorsList?.forEach((oldFn: ValidatorFn, i: number) => {
                validator?.forEach((newFn: ValidatorFn) => {
                    if (oldFn?.toString() === newFn?.toString()) {
                        (<any>control)?.validatorsList?.splice(i, 1);
                    }
                });
            });
            (<any>control).validatorsList = [...(<any>control)?.validatorsList, ...validator];
        } else {
            const index = (<any>control)?.validatorsList?.findIndex((fn: ValidatorFn) => fn?.toString() === validator?.toString());
            if (index === -1) {
                (<any>control)?.validatorsList.push(validator);
            } else {
                (<any>control)?.validatorsList.splice(index, 1, validator);
            }
        }
        this.updateValidators(control, (<any>control)?.validatorsList);
    }

    static removeValidator(control: AbstractControl, validatorFn: ValidatorFn): void {
        if (!(<any>control)?.validatorsList) {
            return;
        }
        const validator = (<any>control)?.validatorsList?.find((fn: ValidatorFn) => fn?.toString() === validatorFn?.toString());
        if (validator) {
            (<any>control)?.validatorsList?.forEach((fn: ValidatorFn, i: number) => {
                fn?.toString() === validatorFn?.toString() && (<any>control)?.validatorsList.splice(i, 1);
            });
            this.updateValidators(control, (<any>control)?.validatorsList);
        }
    }
    static validEmail(): ValidatorFn {
        return Validators.email;
    }

    static removeAllValidators(control: AbstractControl): void {
        if ((<any>control)?.validatorsList) {
            (<any>control).validatorsList = [];
        }
        control?.clearValidators();
        control?.updateValueAndValidity();
    }
    private static updateValidators = (control: AbstractControl, validators: ValidatorFn[]): void => {
        if (control && validators) {
            control?.clearValidators();
            control?.setValidators(validators);
            control?.updateValueAndValidity();
        }
    }
}


