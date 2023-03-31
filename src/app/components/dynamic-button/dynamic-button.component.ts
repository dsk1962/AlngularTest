import { Component, Input } from '@angular/core';
import { IWidget,IButton, WIDGET_SUB_TYPES } from '../../model/i-widget';

@Component({
  selector: 'dynamic-button',
  templateUrl: './dynamic-button.component.html',
  styleUrls: ['./dynamic-button.component.scss']
})
export class DynamicButtonComponent {
  @Input() iWidget?: IWidget;
  public iButton?: IButton;

  ngOnInit() {
    this.iButton = this.iWidget as IButton;
  }
}
