import { Component, Input } from '@angular/core';
import { IInputField, IWidget, LABEL_POSITION, WIDGET_SUB_TYPES } from '../../model/i-widget';

@Component({
  selector: 'dynamic-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Input() inputWidget?: IWidget;
  public inputField?: IInputField;

  getInputClassName(): string {
    return 'dif-input';
  }

  getClassName(): string {
    let result = '';
    if (this.inputField) {
      if (this.inputField.classNames)
        result += this.inputField.classNames;
      result += this.inputField.labelPosition == LABEL_POSITION.TOP ? ' dif-label-top' : ' dif-label-left';
    }
    return result;
  }
  getLabelClassName(): string {
    return 'dif-label';
  }

    ngOnInit() {
    this.inputField = this.inputWidget as IInputField;
  }

}
