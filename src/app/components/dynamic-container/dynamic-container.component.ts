import { Component, Input } from '@angular/core';
import { IWidget, WIDGET_TYPES, LAYOUT_TYPES, IInputField, IContainer } from '../../model/i-widget';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { BaseWidget } from '../../shared/base-widget';

@Component({
  selector: 'div[dynamic-container]',
  templateUrl: './dynamic-container.component.html',
  styleUrls: ['./dynamic-container.component.scss']
})
export class DynamicContainerComponent extends BaseWidget {
  @Input() dynamicFormGroup?: FormGroup;
  @Input() container?: IContainer;
  @Input() inputWidget?: IWidget;
  WTYPES = WIDGET_TYPES;

  constructor(sanitizer :DomSanitizer){
    super(sanitizer);
  }

  ngOnInit() {
    this.container = this.inputWidget as IContainer;
    this.widgetDefinition = this.inputWidget;
  };
}
