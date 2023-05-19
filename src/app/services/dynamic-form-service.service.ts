import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { IContainer,FormRequest, ActionRequest } from '../model/i-widget'
import { ApplicationServiceService } from './application-service.service'

const endpoint = 'http://localhost:8091/esignPOC/';
@Injectable({
  providedIn: 'root'
})
export class DynamicFormServiceService {

  constructor(private http: HttpClient, private applicationServiceService:ApplicationServiceService) { }

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
      endpoint +'content/'+ name, requestOptions));
  }

  getFormDefinition(request: FormRequest): Promise<IContainer> {
    //this.applicationServiceService.setBlockUI(true);
    var params = request.parameters ? request.parameters : {};
    return lastValueFrom(this.http.get<IContainer>(
      endpoint + (request.action ? request.action:'content/forms/') + request.formName,{"params":params}));
  }

  runAction(request: ActionRequest): void {
    //this.applicationServiceService.setBlockUI(true);
    var params = request.parameters ? request.parameters : {};
    lastValueFrom(this.http.get<any>(
      endpoint + request.action,{"params":params})).then(value=>{
        if( value.error)
        ;
        else if( value.formRequest)
        this.applicationServiceService.pushFormRequest(value.formRequest);
        ;
      });
  }

  getOptions(listName: string): Promise<[]> {
    this.applicationServiceService.setBlockUI(true);
    var c = lastValueFrom(this.http.get<[]>(
      endpoint + 'options/' + listName)); 
      return c;
  }
}
