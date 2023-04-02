import { Component, Input, SimpleChanges } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { IWidget, WIDGET_TYPES, LAYOUT_TYPES, IInputField, IContainer } from '../../model/i-widget';
import { Helper } from '../../shared/helper';
import { BaseWidget } from '../../shared/base-widget';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { DynamicFormServiceService } from '../../services/dynamic-form-service.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent extends BaseWidget{
  @Input() dynamicFormGroup?: FormGroup;
  @Input() container?: IContainer;
  @Input() widgets?: IWidget[];
  @Input() formName?: string;
  WTYPES = WIDGET_TYPES;

  constructor(private api: DynamicFormServiceService, private formBuilder: FormBuilder
  ) { super();}

  getField(id: string): AbstractControl | null | undefined {
    return this.dynamicFormGroup?.get(id.toString());
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
      this.dynamicFormGroup?.addControl(Helper.getControlName(widget), new FormControl(''));
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


  ngOnInit() {
    if (!this.dynamicFormGroup)
      this.dynamicFormGroup = this.formBuilder.group({})
    if (this.formName) {
      this.api.getFormDefinition(this.formName).then(value => { this.init(value); });
    }
    this.widgetDefinition = this.container;
    this.dynamicFormGroup.valueChanges.subscribe(selectedValue  => {
    })
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.dynamicFormGroup?.value);
  }

}
