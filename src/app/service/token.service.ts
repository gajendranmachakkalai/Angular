import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  ACCESS_TOKEN : string = 'access_token';
  REFRESH_TOKEN : string = 'refresh_token';
  USER_DETAILS : string = 'user_details';


  constructor(private helperService:HelperService) { }

  getToken(): string {  
    const accesstoken = localStorage.getItem(this.ACCESS_TOKEN);
    return accesstoken == null ? "" : this.helperService.decrypt(accesstoken);
  }

  getRefreshToken(): string {
    const refreshtoken = localStorage.getItem(this.REFRESH_TOKEN);
    return refreshtoken == null ? "" : this.helperService.decrypt(refreshtoken);
  }

  getUserDetails(): string {
    const userdetails = localStorage.getItem(this.USER_DETAILS);
    return userdetails == null ? "" : this.helperService.decrypt(userdetails);
  }

  saveToken(token:string): void {
    localStorage.setItem(this.ACCESS_TOKEN, this.helperService.encrypt(token));
  }

  saveUserDetails(userdetails:string): void {
    localStorage.setItem(this.USER_DETAILS, this.helperService.encrypt(userdetails));
  }

  saveRefreshToken(refreshToken:string): void {
    localStorage.setItem(this.REFRESH_TOKEN, this.helperService.encrypt(refreshToken));
  }

  removeToken(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
  }

  removeRefreshToken(): void {
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
