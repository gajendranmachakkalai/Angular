import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsermasterComponent } from './usermaster/usermaster.component';
import { DepartmentmasterComponent } from './departmentmaster/departmentmaster.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path : 'user', component: UsermasterComponent, canActivate : [AuthGuard]},
  {path: 'department', component: DepartmentmasterComponent, canActivate : [AuthGuard]},  
  {path: '', component: LoginComponent},
  {path: '**', component: PagenotfoundComponent}
]; // sets up routes constant where you define your routes

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  providers: [AuthGuard]
})

export class AppRoutingModule { }
