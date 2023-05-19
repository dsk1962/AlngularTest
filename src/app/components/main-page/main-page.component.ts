import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ApplicationServiceService } from '../../services/application-service.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(private applicationServiceService: ApplicationServiceService) {
  }
  
  ngOnInit() {
    console.log("MainPage oninit");
  }

  formName: string = "forms/startForm.json";

}
