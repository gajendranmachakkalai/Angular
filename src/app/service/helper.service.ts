import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import  *  as CryptoJS from  'crypto-js';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  key:string = 'XYZuyjkghjg4kj6hbhg7Jgfgf7iuij';
  constructor() { }
  
  public encrypt(data :string) : string {
    return CryptoJS.AES.encrypt(data,this.key).toString();
  }

  public decrypt(data :string) : string {
    return CryptoJS.AES.decrypt(data,this.key).toString(CryptoJS.enc.Utf8);
  }

  public handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => 
      new Error('Something bad happened; please try again later.'));
  }

  public log(message: string): any {
    console.log(message);
  }
}
