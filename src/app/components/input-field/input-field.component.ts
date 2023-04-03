import { Component, Input } from '@angular/core';
import { IInputField, ITextField, INumericField, IDateField, IWidget, LABEL_POSITION, WIDGET_SUB_TYPES, IComboboxField } from '../../model/i-widget';
import { Helper } from '../../shared/helper';
import { FormGroup } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DynamicFormServiceService } from '../../services/dynamic-form-service.service';


@Component({
  selector: 'dynamic-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Input() dynamicFormGroup?: FormGroup;
  @Input() inputWidget?: IWidget;
  public inputField?: IInputField;
  WSUBTYPES = WIDGET_SUB_TYPES;
  HELPER = Helper;
  @Input() options: [] = [];

  constructor(private api: DynamicFormServiceService
  ) { }


  getClassName(): string {
    let result = 'p-component field dynamic-field ';
    if (this.inputField) {
      if (this.inputField.classNames)
        result += this.inputField.classNames;
      result += (this.inputField.config?.labelPosition == LABEL_POSITION.TOP ? ' labeltop' : ' grid');
    }
    return result;
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

  getPlaceholder(): string {
    if (this.inputField?.placeholder) return this.inputField?.placeholder;
    let mask = this.getITextField().mask;
    return mask ? mask : '';
  }

  ngOnInit() {
    if (this.inputWidget) {
      this.inputField = this.inputWidget as IInputField;
      this.options = this.getOptions();
      if (this.inputField.subType == WIDGET_SUB_TYPES.COMBOBOX) {
        let c = this.inputField as IComboboxField;
        if (c.listName) {
          this.api.getOptions(c.listName).then(value => { this.options = value; });
        }
      }
    }
  }

}
