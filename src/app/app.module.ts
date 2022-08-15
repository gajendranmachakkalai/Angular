import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Interceptor } from './service/interceptor';

import { AppComponent } from './app.component';
import { UsermasterComponent } from './usermaster/usermaster.component';
import { ShowuserComponent } from './usermaster/showuser/showuser.component';
import { AddedituserComponent } from './usermaster/addedituser/addedituser.component';
import { UserapiService } from './service/userapi.service';
import { DepartmentmasterComponent } from './departmentmaster/departmentmaster.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

//Angular Routing
import { AppRoutingModule } from './app-routing.module';
import { TokenService } from './service/token.service';
import { AuthService } from './service/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UsermasterComponent,
    ShowuserComponent,
    AddedituserComponent,
    DepartmentmasterComponent,
    LoginComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [UserapiService, TokenService, AuthService, 
    {
      provide : HTTP_INTERCEPTORS,
      useClass : Interceptor,
      multi : true
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
