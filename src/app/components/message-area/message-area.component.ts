import { Component, Input } from '@angular/core';
import { Helper } from '../../shared/helper';
import { BaseWidget } from '../../shared/base-widget';
import { DomSanitizer } from '@angular/platform-browser';
import { ApplicationServiceService } from '../../services/application-service.service';

@Component({
  selector: 'message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent extends BaseWidget {
  constructor(sanitizer: DomSanitizer, private applicationServiceService: ApplicationServiceService) {
    super(sanitizer);
    this.applicationServiceService.errorMessage.subscribe((v) => {
      this.setErrorMessage(v);
    });
    this.applicationServiceService.infoMessage.subscribe((v) => {
      this.setInfoMessage(v);
    });
  }
  @Input() infoMessage?: string;
  @Input() errorMessage?: string;

  setErrorMessage(msg: string | undefined) {
    this.errorMessage = msg;
  }
  clearErrorMessage() {
    delete this.errorMessage;
  }
  clearInfoMessage() {
    delete this.errorMessage;
  }

  setInfoMessage(msg: string) {
    delete this.infoMessage;
  }

}
