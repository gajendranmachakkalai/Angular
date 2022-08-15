import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../model/login';
import { catchError, Observable, tap } from 'rxjs';
import { Jwtresponse } from '../model/jwtresponse';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly userApiUrl  = "http://localhost:5099";

  constructor(private http : HttpClient, 
    private tokenservice : TokenService,
    private helperService:HelperService ) { }

  validateUser(data : Login) : Observable<any> {    
    //Clear the existing token
    this.tokenservice.removeToken();
    this.tokenservice.removeRefreshToken();
    var HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(data.userName + ':' + data.password) //Buffer.from(data.userName + ':' + data.password, 'utf8').toString('base64')
      })
    };
    return this.http.post<Jwtresponse>(this.userApiUrl+ '/api/OAuth',null, HTTP_OPTIONS)
    .pipe(
      tap(
        res => {
            this.tokenservice.saveToken(res.accessToken);
            this.tokenservice.saveRefreshToken(res.refreshToken);
            this.tokenservice.saveUserDetails(JSON.stringify(res));
        }
      ),
      catchError(this.helperService.handleError)
    )
  }

  isloggedin() : boolean {
    var userdetails = this.tokenservice.getUserDetails();
    return !!userdetails;
  }

  refreshToken() : Observable<any> {    
    //Clear the existing token
    this.tokenservice.removeToken();
    var HTTP_OPTIONS = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    //Construct the model
    var refreshtoken = this.tokenservice.getRefreshToken();
    var userdetails = this.tokenservice.getUserDetails();
    var usermodel = JSON.parse(userdetails);
    var model = {
      userId : usermodel.userId,
      refreshToken : refreshtoken
    }
    return this.http.post<Jwtresponse>(this.userApiUrl+ '/api/OAuthRefreshToken',model, HTTP_OPTIONS)
    .pipe(
      tap(
        res => {
            this.tokenservice.saveToken(res.accessToken);
            this.tokenservice.saveRefreshToken(res.refreshToken);
            this.tokenservice.saveUserDetails(JSON.stringify(res));
        }
      ),
      catchError(this.helperService.handleError)
    )
  }
}
