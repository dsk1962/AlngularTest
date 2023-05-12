import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ApplicationServiceService } from '../../services/application-service.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(private applicationServiceService: ApplicationServiceService) {
    this.applicationServiceService.blockUI.subscribe((name) => {
      this.blockDocument(name);
    });
    //this.applicationServiceService.formName.subscribe((name) => {
      //this.setFormName(name);
    //})
  }
  setFormName(name: string) {
    this.formName = name;
  }

  ngOnInit() {
    console.log("MainPage oninit");
  }

  blockedDocumentCounter: number = 0;
  blockedDocument: boolean = false;
  formName: string = "startForm.json";

    blockDocument(v: boolean) {
    if (v)
      this.blockedDocumentCounter++;
    else
      if (this.blockedDocumentCounter > 0)
        this.blockedDocumentCounter--;
    this.blockedDocument = this.blockedDocumentCounter > 0;
    console.log("this.blockedDocument=", this.blockedDocument);
    console.log("this.blockedDocumentCounter=", this.blockedDocumentCounter);
  }
}
