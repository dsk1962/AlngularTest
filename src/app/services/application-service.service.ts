import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FormRequest } from '../model/i-widget';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {
  constructor() { }
  private aFormRequest: Subject<FormRequest> = new Subject<FormRequest>();    // consider putting the actual type of the data you will receive
  public formRequest = this.aFormRequest.asObservable();

  setFormRequest(obj: any, formName: string, action: string) {
    let request = new FormRequest();
    request.formName = formName;
    request.action = action;
    let params = new HttpParams();
    if (obj.dynamicFormGroup && obj.dynamicFormGroup.controls) {
      for (const field in obj.dynamicFormGroup.controls) {
        params = params.append(field, obj.dynamicFormGroup.controls[field].value);
      }
      request.parameters = params;
    }
    this.aFormRequest.next(request);
  }
  private aBlockUI: Subject<boolean> = new Subject<boolean>();    // consider putting the actual type of the data you will receive
  public blockUI = this.aBlockUI.asObservable();

  setBlockUI(value: boolean) {
    this.aBlockUI.next(value);
  }
}
