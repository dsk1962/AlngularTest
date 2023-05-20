import { Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ApplicationServiceService } from '../../services/application-service.service';


@Component({
  selector: 'external-html',
  templateUrl: './external-html.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./external-html.component.scss']
})
export class ExternalHtmlComponent {
  constructor(private applicationServiceService: ApplicationServiceService,private sanitizer: DomSanitizer) { }
  htmlText: SafeHtml | undefined;
  @Input()externalName?: String;

  ngOnInit() {
    if (this.externalName)
      this.applicationServiceService.getResource(this.externalName).then(value => this.htmlText = this.sanitizer.bypassSecurityTrustHtml(value));
  };

}
