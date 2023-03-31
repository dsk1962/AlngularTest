import { Component, Input } from '@angular/core';
import { IWidget, WIDGET_TYPES, LAYOUT_TYPES, IInputField, IContainer } from '../../model/i-widget';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormGroup, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'dynamic-container',
  templateUrl: './dynamic-container.component.html',
  styleUrls: ['./dynamic-container.component.scss']
})
export class DynamicContainerComponent {
  @Input() dynamicFormGroup?: FormGroup;
  @Input() container?: IContainer;
  @Input() inputWidget?: IWidget;
  WTYPES = WIDGET_TYPES;
  html?: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  getClassName(): string {
    let result = 'dynamic-container ' + (this.container?.layout == LAYOUT_TYPES.HORIZONTAL ? 'formgrid grid ' : 'vlayout ');
    if (this.container) {
      if (this.container.classNames)
        result += this.container.classNames;
    }
    return result;
  }

  ngOnInit() {
    this.container = this.inputWidget as IContainer;
    if (this.container?.html)
      this.html = this.sanitizer.bypassSecurityTrustHtml(this.container?.html);
  };
}
