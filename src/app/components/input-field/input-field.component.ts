import { Component, Input } from '@angular/core';
import { IInputField, ITextField, INumericField, IDateField, IWidget, LABEL_POSITION, WIDGET_SUB_TYPES, IComboboxField, IMethodCall } from '../../model/i-widget';
import { FormGroup } from '@angular/forms';
import { BaseWidget } from '../../shared/base-widget';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationServiceService } from '../../services/application-service.service';

@Component({
  selector: 'div[dynamic-input-field]',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent extends BaseWidget {
  @Input() dynamicFormGroup?: FormGroup;
  @Input() inputWidget?: IWidget;
  public inputField?: IInputField;
  WSUBTYPES = WIDGET_SUB_TYPES;
  @Input() options: [] = [];


  constructor(sanitizer: DomSanitizer, private applicationServiceService: ApplicationServiceService) {
    super(sanitizer);
  }

  getErrorList(errorObject: any) {
    return errorObject ? Object.keys(errorObject) : [];
  }

  getWrapperClass(): string {
    return this.inputWidget?.config?.labelPosition == LABEL_POSITION.TOP ? ' labeltop ' : ' labelleft ';
  }
  getError(errorObject: any): string {
    let keys = Object.keys(errorObject);
    if (keys.includes('required'))
      return 'This field is required';
    if (keys.includes('pattern'))
      return (this.inputWidget as any)?.patternError ? (this.inputWidget as any)?.patternError : ('Value must match pattern: ' + (this.inputWidget as any)?.pattern);
    if (keys.includes('minlength'))
      return 'Text length must be greater or equal  ' + (this.inputWidget as any)?.minLength + ' characters';
    if (keys.includes('maxlength'))
      return 'Text length must be less or equal  ' + (this.inputWidget as any)?.maxLength + ' characters';
    if (keys.includes('min'))
      return 'Value must be greater or equal  ' + (this.inputWidget as any)?.minValue;
    if (keys.includes('max'))
      return 'Value must be less or equal  ' + (this.inputWidget as any)?.maxValue;
    return '';
  }

  getIInputField(): IInputField {
    return this.inputWidget as IInputField;
  }
  getITextField(): ITextField {
    return this.inputWidget as ITextField;
  }
  getINumericField(): INumericField {
    return this.inputWidget as INumericField;
  }
  getIDateField(): IDateField {
    return this.inputWidget as IDateField;
  }
  getIComboboxField(): IComboboxField {
    return this.inputWidget as IComboboxField;
  }

  getOptions(): [] {
    let c = this.getIComboboxField().options;
    if (!c) return [];
    return c;
  }

  getLabelClassName(): string {
    return 'dif-label';
  }
  getLabelStyle(): string {
    return this.inputField?.labelStyle ? this.inputField?.labelStyle : "";
  }

  getPlaceholder(): string {
    if (this.inputField?.placeholder) return this.inputField?.placeholder;
    let mask = this.getITextField().mask;
    return mask ? mask : '';
  }
  getTooltip(): string {
    return this.inputField?.tooltip ? this.inputField?.tooltip : '';
  }

  ngOnInit() {
    if (this.inputWidget) {
      this.inputField = this.inputWidget as IInputField;
      this.widgetDefinition = this.inputWidget;
      this.options = this.getOptions();
      if (this.inputField.subType == WIDGET_SUB_TYPES.COMBOBOX) {
        let c = this.inputField as IComboboxField;
        var me = this;
        setTimeout(function () { if (c.listName) me.applicationServiceService.getOptions(me, c.listName); }, 3);
      }
    }
  }

}
