import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionRequest, IContainer } from '../model/i-widget';
import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { FormGroup } from '@angular/forms';


const endpoint = 'http://localhost:8091/esignPOC/';
@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {
  constructor(private http: HttpClient) { }
  private aFormContainer: Subject<IContainer> = new Subject<IContainer>();    // consider putting the actual type of the data you will receive
  public formContainer = this.aFormContainer.asObservable();
  private anErrorMessage: Subject<string> = new Subject<string>();    // consider putting the actual type of the data you will receive
  public errorMessage = this.anErrorMessage.asObservable();
  private anInfoMessage: Subject<string> = new Subject<string>();    // consider putting the actual type of the data you will receive
  public infoMessage = this.anInfoMessage.asObservable();

  pushFormContainer(container: IContainer) {
    this.aFormContainer.next(container);
  }

  setErrorMessage(message: string) {
    this.anErrorMessage.next(message);
  }

  setInfoMessage(message: string) {
    this.anInfoMessage.next(message);
  }

  getStaticForm(obj: any, formName: string) {
    let request = new ActionRequest();
    request.action = "staticForm";
    request.parameters = new HttpParams().append("formPath", formName);
    this.runAction(request);
  }
  private aBlockUI: Subject<boolean> = new Subject<boolean>();    // consider putting the actual type of the data you will receive
  public blockUI = this.aBlockUI.asObservable();

  setBlockUI(value: boolean) {
    this.aBlockUI.next(value);
  }

  runAction(request: ActionRequest | string, successHandler?: any): void {
    this.setBlockUI(true);
    if (typeof request === "string") {
      let action = request;
      request = new ActionRequest();
      request.action = action;
    }

    var params = request.parameters ? request.parameters : {};
    this.http.get<any>(
      endpoint + request.action, { "params": params }).subscribe({
        next: data => {
          this.setBlockUI(false);
          if (data.success) {
            if (data.formRequest)
              this.runAction(data.formRequest);
            else if (data.formDefinition)
              this.pushFormContainer(data.formDefinition);
              if (data.infoMessage)
              this.setInfoMessage(data.infoMessage);
            if (data.newWindow && data.newWindow.url)
              window.open(data.newWindow.url, data.newWindow.name? data.newWindow.name : '_blank',data.newWindow.parameters? data.newWindow.parameters : 'location=yes,scrollbars=yes,status=yes') ;
            if (successHandler)
              successHandler(data.result);
          }
          else {
            let msg = data.errorMessage ? data.errorMessage : "Operation failed. No error message in response";
            this.setErrorMessage(msg);
          }
        },
        error: error => {
          this.setBlockUI(false);
          this.setErrorMessage(error.message);
          console.error('runAction error!', error);
        }
      });
  }

  postBody(action: string, body: any, successHandler?: any): void {
    this.setBlockUI(true);
    this.http.post<any>(
      endpoint + action, body).subscribe({
        next: data => {
          this.setBlockUI(false);
          if (data.success) {
            if (data.formRequest)
              this.runAction(data.formRequest);
            else if (data.formDefinition)
              this.pushFormContainer(data.formDefinition);
            if (data.infoMessage)
              this.setInfoMessage(data.infoMessage);
            if (successHandler)
              successHandler(data.result);
          }
          else {
            let msg = data.errorMessage ? data.errorMessage : "Operation failed. No error message in response";
            this.setErrorMessage(msg);
          }
        },
        error: error => {
          this.setBlockUI(false);
          this.setErrorMessage(error.message);
          console.error('postBody error!', error);
        }
      });
  }
  sendForm(obj: any, action: string) {
    let fgroup;
    if (obj instanceof FormGroup)
      fgroup = obj;
    else if (obj.dynamicFormGroup)
      fgroup = obj.dynamicFormGroup as FormGroup;
    let request = new ActionRequest();
    request.action = action;
    request.addParameters(fgroup?.value);
    this.runAction(request);
  }
  sendData(obj: any, action: string, ...params: string[]) {
    let request = new ActionRequest();
    request.action = action;
    if (obj.data) {
      if (params && params.length > 0) {
        const parameters: {[index: string]:any} = {}
        params.forEach(key => { 
          if(obj.data[key])
          parameters[key] = obj.data[key];
        });
        request.addParameters(parameters);
      }
      else
        request.addParameters({ "data": obj.data });
    }
    this.runAction(request);
  }

  postForm(obj: any, action: string) {
    let fgroup;
    if (obj instanceof FormGroup)
      fgroup = obj;
    else if (obj.dynamicFormGroup)
      fgroup = obj.dynamicFormGroup as FormGroup;
    let values = fgroup?.value;
    this.postBody(action, values);
  }
  getResource(name: String): Promise<string> {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    }
    return lastValueFrom(this.http.get<string>(
      endpoint + 'content/' + name, requestOptions));
  }

  getOptions(combo: any, listName: string): void {
    let request = new ActionRequest();
    request.action = 'options/' + listName;
    this.runAction(request, function (a: any) { combo.options = a; });
  }
}
