import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { IWidget, WIDGET_TYPES } from '../model/i-widget';
import { IInputField } from '../model/i-input-field';
import { IContainer } from '../model/i-container';

export class BaseForm {
    public group?: FormGroup;
    public widgets?: IWidget[];

    init(widgets: IWidget[], group: FormGroup) {
        this.group = group;
        this.widgets = widgets;
        this.addFields(widgets);
    }

    getField(id: string): AbstractControl | null | undefined {
        return this.group?.get(id.toString());
    }

    getLabel(id: string) {
        return this.widgets?.find(widget => widget.id.toString() === id)?.label;
    }

    isValid(id: string): boolean {
        let c = this.getField(id) as AbstractControl;
        return c?.valid && (c?.dirty || c?.touched);
    }

    addField(widget: IWidget): void {
        if (widget.type === WIDGET_TYPES.INPUTFIELD) {
            let field = widget as IInputField;
            //        const validators: ValidatorFn[] = Helper.getValidatorsFn(field, VALIDATORS);
            const id: string = field.id.toString();
            this.group?.addControl(id, new FormControl(''));
            //        Helper.setValidator(this.group?.get(id), validators);}
        }
        if (widget.type === WIDGET_TYPES.CONTAINER) {
            this.addFields((widget as IContainer).children);
        }
    }

    // patchValues(ids: string[], values: string[], options: object[] = []): void {
    //     for (let i = 0; i < ids.length; i++) {
    //         if (ids[i] && values[i] !== undefined) {
    //             this.patchValue(ids[i], values[i], options[i] || {});
    //         }
    //     }
    // }

    // patchValue(id: string, value: object | string | number | boolean | null, options: object = {}): void {
    //     this.getField(id)?.patchValue(value, options);
    // }

    private addFields(widgets: IWidget[] | undefined): void {
        widgets?.forEach(widget => this.addField(widget));
    }
}