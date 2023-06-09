import { Component, Input } from '@angular/core';
import { IWidget, WIDGET_TYPES, IToolbarColumn, IContainer } from '../../model/i-widget';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { BaseWidget } from '../../shared/base-widget';
import { ApplicationServiceService } from '../../services/application-service.service';

@Component({
  selector: 'toolbar-column',
  templateUrl: './toolbar-column.component.html',
  styleUrls: ['./toolbar-column.component.scss']
})
export class ToolbarColumnComponent   extends BaseWidget {
  @Input() iWidget?: IWidget;
  @Input() column?: IToolbarColumn;
  @Input() data?: any;
  WTYPES = WIDGET_TYPES;

  constructor(sanitizer :DomSanitizer,private applicationServiceService: ApplicationServiceService){
    super(sanitizer);
  }

  ngOnInit() {
    this.widgetDefinition = this.iWidget;
    this.column = this.iWidget as IToolbarColumn;
  };
}
