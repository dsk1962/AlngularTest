import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {
  constructor() { }
  private aFormName: Subject<string> = new Subject<string>();    // consider putting the actual type of the data you will receive
  public formName = this.aFormName.asObservable();

  setFormName( name:string){
    this.aFormName.next(name);
  }
}