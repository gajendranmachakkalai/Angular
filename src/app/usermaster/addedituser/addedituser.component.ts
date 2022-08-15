import { Component, Input, OnInit } from '@angular/core';
import { Usermodel } from  'src/app/model/usermodel';
import { UserapiService } from 'src/app/service/userapi.service';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup  } from '@angular/forms';

@Component({
  selector: 'app-addedituser',
  templateUrl: './addedituser.component.html',
  styleUrls: ['./addedituser.component.css']
})
export class AddedituserComponent implements OnInit {

  constructor(private userService: UserapiService, private fb: FormBuilder) { }
  userForm!: FormGroup;
  
  //Variable
  @Input() user!:Usermodel;
  userId : number = 0;
  userName : string = "";
  emailId :string = "";
  address :string = "";
  phoneNumber:string = "";
  
  ngOnInit(): void {
    this.userId = this.user.userId;
    this.userName = this.user.userName;
    this.emailId = this.user.emailId;
    this.address = this.user.address;
    this.phoneNumber = this.user.phoneNumber;

    //FormBuilder
    this.userForm = this.fb.group({
      userName : ['', Validators.required],
      emailId : [''],
      phoneNumber : [''],
      address : ['']
    })
  }

  get username() { return this.userForm.get('userName'); }

  AddUser() : void{
     this.user.userId = this.userId;
     this.user.userName = this.userName;
     this.user.emailId =  this.emailId;
     this.user.phoneNumber = this.phoneNumber;
     this.user.address = this.address;
     this.userService.addUser(this.user).subscribe(res =>{
       var closemodel = document.getElementById("addUserModalclose");
       if(closemodel){
         closemodel.click();
       }
       var successalert = document.getElementById("addusersuccess");
       if(successalert){
         successalert.style.display = "block";
       }
       setTimeout(function(){
         if(successalert){
           successalert.style.display = "none";
         }
       }, 4000);
     });
  }

  UpdateUser() : void{
    this.user.userId = this.userId;
    this.user.userName = this.userName;
    this.user.emailId =  this.emailId;
    this.user.phoneNumber = this.phoneNumber;
    this.user.address = this.address;
    this.userService.updateUser(this.user).subscribe(res =>{
      var closemodel = document.getElementById("addUserModalclose");
      if(closemodel){
        closemodel.click();
      }
      var successalert = document.getElementById("updateusersuccess");
      if(successalert){
        successalert.style.display = "block";
      }
      setTimeout(function(){
        if(successalert){
          successalert.style.display = "none";
        }
      }, 4000);
    });
  }
}
