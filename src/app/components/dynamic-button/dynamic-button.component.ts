import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IWidget,IButton, WIDGET_SUB_TYPES } from '../../model/i-widget';
import { BaseWidget } from '../../shared/base-widget';

@Component({
  selector: 'dynamic-button',
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss']
})
export class DynamicButtonComponent extends BaseWidget{
  @Input() dynamicFormGroup?: FormGroup;
  @Input() iWidget?: IWidget;
  public iButton?: IButton;

  constructor(sanitizer :DomSanitizer){
    super(sanitizer);
  }


  ngOnInit() {
    this.iButton = this.iWidget as IButton;
    this.widgetDefinition = this.iWidget;
  }
}
