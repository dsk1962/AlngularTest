import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActionRequest, IContainer } from '../model/i-widget';
import { HttpClient,HttpParams, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';


const endpoint = 'http://localhost:8091/esignPOC/';
@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {
  constructor(private http: HttpClient) { }
  private aFormContainer: Subject<IContainer> = new Subject<IContainer>();    // consider putting the actual type of the data you will receive
  public formContainer = this.aFormContainer.asObservable();
  private aErrorMessage: Subject<string> = new Subject<string>();    // consider putting the actual type of the data you will receive
  public errorMessage = this.aErrorMessage.asObservable();

  pushFormContainer(container: IContainer){
    this.aFormContainer.next(container);
  }

  setErrorMessage(message: string){
    this.aErrorMessage.next(message);
  }

  getStaticForm(obj:any,formName: string) {
    let request = new ActionRequest();
    request.action = "staticForm";
    request.parameters = new HttpParams().append("formPath",formName);
    this.runAction(request);
  }
  private aBlockUI: Subject<boolean> = new Subject<boolean>();    // consider putting the actual type of the data you will receive
  public blockUI = this.aBlockUI.asObservable();

  setBlockUI(value: boolean) {
    this.aBlockUI.next(value);
  }

  runAction(request: ActionRequest|string, successHandler?: any): void {
    this.setBlockUI(true);
    if( typeof request === "string" ){
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
            if (successHandler)
              successHandler(data.result);
          };
        },
        error: error => {
          this.setBlockUI(false);
          this.setErrorMessage(error.message);
          console.error('runAction error!', error);
        }
      });
  }

}
