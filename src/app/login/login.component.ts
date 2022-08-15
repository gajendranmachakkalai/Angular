import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../model/login';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router : Router) { }

  //Variable
  userName : string = "";
  password : string = "";

  //Validation
  loginForm = new FormGroup({
    username : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.userName = "";
    this.password = "";
  }

  get username(){
    return this.loginForm.get('username');
  }

  get passwordval(){
    return this.loginForm.get('password');
  }

  Login() : void{
    var data: Login = {
      userName : this.userName,
      password : this.password
    };

    this.authService.validateUser(data)
    .subscribe({
      next : (data) => {
        this.router.navigate(["/user"]);        
      },
      error: (msg) => {
        var alertbox = document.getElementById('loginfailure');
        if(alertbox)
          alertbox.style.display = 'block';        
        setTimeout(() => {          
          if(alertbox)
            alertbox.style.display = 'none';
        }, 4000);
      }
    });
  }

  Cancel() : void {
    this.userName = "";
    this.password = "";
  }
}
