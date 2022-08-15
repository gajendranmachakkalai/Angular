import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private router: Router, 
        private authservice : AuthService, 
        private tokenservice : TokenService){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Read the token 
        const accesstoken = this.tokenservice.getToken();
        const refreshtoken = this.tokenservice.getRefreshToken();

        //If the token is availabe add to authorization header
        if(accesstoken){
            req = req.clone({
                setHeaders: {
                    Authorization : 'Bearer ' + accesstoken
                }
            });
        }

        //Passing model as json object
        if(!req.headers.has('Content-Type')){
            req = req.clone({
                setHeaders: {
                    'Content-Type' : 'application/json'
                }
            });
        }
        
        //Accepting the response as json object
        req = req.clone({
            headers : req.headers.set('Accept', 'application/json')
        });
        
        return next.handle(req).pipe(
            map((event : HttpEvent<any>) => {
                if(event instanceof HttpResponse){
                    console.log('event --->', event);
                }
                return event;
            }), 
            catchError((requestError : HttpErrorResponse) => {
              if(requestError && requestError.status === 401){
                if (requestError.statusText === 'Unauthorized') {
                    this.authservice.refreshToken()
                      .subscribe(() => {
                        location.reload();
                      });
                  } else {
                    this.router.navigate(['login']).then(_ => console.log('redirect to login'));
                  }
              }
              this.router.navigate(['login']).then(_ => console.log('redirect to login'));
              return throwError(() => new Error(requestError.message));
            })
        );
    }
}
