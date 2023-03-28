import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { Observable, throwError,lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { SafeHtml } from '@angular/platform-browser';

const endpoint = 'http://localhost:8099/test/content/';
@Injectable({
  providedIn: 'root'
})
export class DynamicFormServiceService {

  constructor(private http: HttpClient) { }

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

  getResource(name: String): Promise<string>{
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    const requestOptions: Object = {
      headers: headers,
      responseType: 'text'
    } 
    return lastValueFrom(this.http.get<string>(
      endpoint + name,requestOptions));
  }
}
