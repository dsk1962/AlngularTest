import { Component, Input } from '@angular/core';
import { IWidget, WIDGET_TYPES, ITable, IContainer } from '../../model/i-widget';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { BaseWidget } from '../../shared/base-widget';
import { ApplicationServiceService } from '../../services/application-service.service';

@Component({
  selector: 'dynamic-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent  extends BaseWidget {
  @Input() dynamicFormGroup?: FormGroup;
  @Input() table?: ITable;
  @Input() inputWidget?: IWidget;
  WTYPES = WIDGET_TYPES;

  constructor(sanitizer :DomSanitizer,private applicationServiceService: ApplicationServiceService){
    super(sanitizer);
  }

  ngOnInit() {
    this.table = this.inputWidget as ITable;
    this.widgetDefinition = this.inputWidget;
  };
}
