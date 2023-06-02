import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IWidget, IButton, IMethodCall } from '../../model/i-widget';
import { BaseWidget } from '../../shared/base-widget';
import { ApplicationServiceService } from '../../services/application-service.service';
import { Helper } from '../../shared/helper';


@Component({
  selector: 'dynamic-button',
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss']
})
export class DynamicButtonComponent extends BaseWidget {
  @Input() dynamicFormGroup?: FormGroup;
  @Input() iWidget?: IWidget;
  @Input() data?: any;
  public iButton?: IButton;

  constructor(sanitizer: DomSanitizer, private applicationServiceService: ApplicationServiceService) {
    super(sanitizer);
  }

  onClick() {
    if (this.iButton?.onclick)
      Helper.runMethod(this, this.iButton?.onclick);
  }

  getTooltip(): string {
    return this.iButton?.tooltip ? this.iButton?.tooltip : '';
  }

  ngOnInit() {
    this.iButton = this.iWidget as IButton;
    this.widgetDefinition = this.iWidget;
  }
}
