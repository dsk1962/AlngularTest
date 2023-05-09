import { ChangeDetectorRef, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { ApplicationServiceService } from '../../services/application-service.service';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  constructor(private applicationServiceService: ApplicationServiceService) { }
  formName:string="startForm.json";
}
