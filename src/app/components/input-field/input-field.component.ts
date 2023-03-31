import { Component, Input } from '@angular/core';
import { IInputField, IWidget, LABEL_POSITION, WIDGET_SUB_TYPES } from '../../model/i-widget';
import { Helper } from '../../shared/helper';
import { FormGroup } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';


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

  getInputClassName(): string {
    return 'dif-input';
  }

  getClassName(): string {
    let result = 'p-component field dynamic-field ';
    if (this.inputField) {
      if (this.inputField.classNames)
        result += this.inputField.classNames;
        result += (this.inputField.config?.labelPosition == LABEL_POSITION.TOP ? ' labeltop' : ' grid');
    }
    return result;
  }

  getLabelClassName(): string {
    return 'dif-label';
  }

  getPlaceholder(): string {
    if (this.inputField?.placeholder) return this.inputField?.placeholder;
    if (this.inputField?.mask) return this.inputField?.mask;
    return '';
  }

  ngOnInit() {
    this.inputField = this.inputWidget as IInputField;
  }

}
