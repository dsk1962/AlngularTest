import { Component, Input, SimpleChanges } from '@angular/core';
import { Calendar } from 'primeng/calendar';
import { Dropdown } from 'primeng/dropdown';
import { IWidget, WIDGET_TYPES, LAYOUT_TYPES, IInputField, IContainer, ActionRequest } from '../../model/i-widget';
import { Helper } from '../../shared/helper';
import { BaseWidget } from '../../shared/base-widget';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { DynamicFormServiceService } from '../../services/dynamic-form-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationServiceService } from '../../services/application-service.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent extends BaseWidget {
  @Input() dynamicFormGroup?: FormGroup;
  @Input() container?: IContainer;
  @Input() widgets?: IWidget[];
  @Input() formName?: string;
  WTYPES = WIDGET_TYPES;

  constructor(private api: DynamicFormServiceService, private formBuilder: FormBuilder, sanitizer: DomSanitizer, private applicationServiceService: ApplicationServiceService) {
    super(sanitizer);
    this.applicationServiceService.blockUI.subscribe((v) => {
      this.blockDocument(v);
    });
    this.applicationServiceService.formContainer.subscribe((container) => {
      if (container) {
        this.container = container;
        this.init(this.container);
      }
    })
  }
  blockedDocumentCounter: number = 0;
  blockedDocument: boolean = false;

  blockDocument(v: boolean) {
    if (v)
      this.blockedDocumentCounter++;
    else
      if (this.blockedDocumentCounter > 0)
        this.blockedDocumentCounter--;
    this.blockedDocument = this.blockedDocumentCounter > 0;
    console.log("this.blockedDocument=", this.blockedDocument);
    console.log("this.blockedDocumentCounter=", this.blockedDocumentCounter);
  }

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
    this.widgetDefinition = container;
    this.container = container;
    this.addField(container);
    this.setInitValue(this.container);
  }

  addField(widget: IWidget): void {
    if (widget.type === WIDGET_TYPES.INPUTFIELD) {
      let field = widget as IInputField;
      const validators = Helper.getValidatorsFn(field);
      this.dynamicFormGroup?.addControl(Helper.getControlName(widget), new FormControl());
      let control = this.getField(Helper.getControlName(widget));
      control && Helper.setValidator(control, validators);
    }
    if (widget.type === WIDGET_TYPES.CONTAINER) {
      (widget as IContainer).children?.forEach(entry => this.addField(entry));
    }
  }

  private isDisabled(field: IInputField): boolean {
    return !!field.disabled;
  }
  private setInitValue(widget?: IWidget): void {
    if (widget?.type === WIDGET_TYPES.INPUTFIELD) {
      let field = widget as IInputField;
      let value = field.initValue ? field.initValue : null;
      let contol = this.getField(Helper.getControlName(widget));
      contol?.setValue(value);
      contol?.updateValueAndValidity();
      if (contol?.valid === false)
        contol?.markAsDirty();
      if (this.isDisabled(field)) contol?.disable();
    }
    if (widget?.type === WIDGET_TYPES.CONTAINER) {
      (widget as IContainer).children?.forEach(entry => this.setInitValue(entry));
    }
    /**
    * This setTimeout is needed to apply Rules after initialization of the fields
    */
    setTimeout(() => this.dynamicFormGroup?.updateValueAndValidity());
  }

  // patchValues(ids: string[], values: string[], options: object[] = []): void {
  //     for (let i = 0; i < ids.length; i++) {
  //         if (ids[i] && values[i] !== undefined) {
  //             this.patchValue(ids[i], values[i], options[i] || {});
  //         }
  //     }
  // }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.dynamicFormGroup) {
      //
      // We should set dirty false by hands if form doesn't contain controls. 
      // It may be set to true somewhere in a past
      //
      //this.dynamicFormGroup.markAsPristine();
      //this.setInitValue(this.container);
    }
  }


  ngOnInit() {
    if (!this.dynamicFormGroup)
      this.dynamicFormGroup = this.formBuilder.group({});
    if (this.formName) {
      let actionRequest = new ActionRequest();
      actionRequest.action = "staticForm";
      actionRequest.parameters=new HttpParams().append("formPath",this.formName);
      this.api.runAction(actionRequest);
    }
    this.widgetDefinition = this.container;
    this.dynamicFormGroup.valueChanges.subscribe(selectedValue => {
      //console.log(selectedValue);
    })
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    //console.warn(this.dynamicFormGroup?.value);
    this.getField('phoneNumber')?.setValue("");
    this.getField('phoneNumber')?.markAsDirty();
  }


}
