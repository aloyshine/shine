import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DemographicsService {

  constructor() {
   
   }
  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  changeMessage(message:any) {
    console.log("inservice",message)
    this.messageSource.next(message)
  }
  
}
