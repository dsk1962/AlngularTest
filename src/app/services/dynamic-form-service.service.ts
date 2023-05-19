import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { IContainer, ActionRequest } from '../model/i-widget'
import { ApplicationServiceService } from './application-service.service'

const endpoint = 'http://localhost:8091/esignPOC/';
@Injectable({
  providedIn: 'root'
})
export class DynamicFormServiceService {

  constructor(private http: HttpClient, private applicationServiceService: ApplicationServiceService) { }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => 'Something bad happened; please try again later.');
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

  runAction(request: ActionRequest|string, successHandler?: any): void {
    this.applicationServiceService.setBlockUI(true);
    if( typeof request === "string" ){
      let action = request;
      request = new ActionRequest();
      request.action = action;
    }

    var params = request.parameters ? request.parameters : {};
    this.http.get<any>(
      endpoint + request.action, { "params": params }).subscribe({
        next: data => {
          this.applicationServiceService.setBlockUI(false);
          if (data.success) {
            if (data.formRequest)
              this.runAction(data.formRequest);
            else if (data.formDefinition)
              this.applicationServiceService.pushFormContainer(data.formDefinition);
            if (successHandler)
              successHandler(data.result);
          };
        },
        error: error => {
          this.applicationServiceService.setBlockUI(false);
          this.applicationServiceService.setErrorMessage(error.message);
          console.error('runAction error!', error);
        }
      });
  }

  getOptions(combo:any,listName: string): void {
    let request = new ActionRequest();
    request.action = 'options/' + listName;
    this.runAction(request,function(a:any){ combo.options=a;});
  }
}
