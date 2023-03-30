import { Component, Input, SimpleChanges } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { IWidget, WIDGET_TYPES,LAYOUT_TYPES, IInputField, IContainer } from '../../model/i-widget';
import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { DynamicFormServiceService } from '../../services/dynamic-form-service.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent {
  @Input() formGroup?: FormGroup = new FormGroup({});
  @Input() container?: IContainer;
  @Input() widgets?: IWidget[];
  @Input() formName?: string;
  WTYPES = WIDGET_TYPES;

  constructor(private api: DynamicFormServiceService) { }

  getField(id: string): AbstractControl | null | undefined {
    return this.formGroup?.get(id.toString());
  }

  getLabel(id: string): string | undefined {
    return this.widgets?.find(widget => widget.id.toString() === id)?.label;
  }

  isValid(id: string): boolean {
    this.widgets = [];
    let c = this.getField(id) as AbstractControl;
    return c?.valid && (c?.dirty || c?.touched);
  }

  init(container: IContainer) {
    this.container = container;
    this.addField(container);
  }

  addField(widget: IWidget): void {
    if (widget.type === WIDGET_TYPES.INPUTFIELD) {
      let field = widget as IInputField;
      //        const validators: ValidatorFn[] = Helper.getValidatorsFn(field, VALIDATORS);
      const id: string = field.id.toString();
      this.formGroup?.addControl(id, new FormControl(''));
      //        Helper.setValidator(this.group?.get(id), validators);}
    }
    if (widget.type === WIDGET_TYPES.CONTAINER) {
      (widget as IContainer).children?.forEach(entry => this.addField(entry));
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

  getClassName(): string {
    let result = 'dynamic-container dynamic-form ' + (this.container?.layout == LAYOUT_TYPES.HORIZONTAL ? 'formgrid grid ' : 'card ');
    if (this.container) {
      if (this.container.classNames)
        result += this.container.classNames;
    }
    return result;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formGroup) {
      //
      // We should set dirty false by hands if form doesn't contain controls. 
      // It may be set to true somewhere in a past
      //
      this.formGroup.markAsPristine();
      //this.addFields(this.widgets);
      //      this.setInitValues(this.fields);
    }
  }
  ngOnInit() {
    if (this.formName) {
      this.api.getFormDefinition(this.formName).then(value => { this.init(value); });
    }
  };

}
