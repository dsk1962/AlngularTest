import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DynamicFormServiceService } from '../../services/dynamic-form-service.service';


@Component({
  selector: 'external-html',
  templateUrl: './external-html.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./external-html.component.scss']
})
export class ExternalHtmlComponent {
  constructor(private api: DynamicFormServiceService,private sanitizer: DomSanitizer) { }
  htmlText: SafeHtml | undefined;
  @Input()externalName?: String;

  ngOnInit() {
    if (this.externalName)
      this.api.getResource(this.externalName).then(value => {this.htmlText = this.sanitizer.bypassSecurityTrustHtml(value);console.log(this.htmlText)});
  };

}
