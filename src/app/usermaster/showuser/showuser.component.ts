import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserapiService } from 'src/app/service/userapi.service';
import { Usermodel } from  'src/app/model/usermodel';

@Component({
  selector: 'app-showuser',
  templateUrl: './showuser.component.html',
  styleUrls: ['./showuser.component.css']
})
export class ShowuserComponent implements OnInit {

  listusers$!:Observable<Usermodel[]>;

  constructor(private userservice: UserapiService) { }

  //Variable
  modaltitle:string = "";
  activateaddEdituser:boolean = false;
  user!:Usermodel;

  ngOnInit(): void {
    this.refreshGrid();
  } 

  showUserModal(): void{
    this.activateaddEdituser = true;
    this.modaltitle = "Add User";
  }

  updateUserModel(usermodal: Usermodel): void{
    this.activateaddEdituser = true;
    this.modaltitle = "Edit User";
    this.user = usermodal;
  }

  deleteUser(usermodal : Usermodel):void{
    if(confirm(`Are you sure want to delete the user ${usermodal.userName}`)){
       this.userservice.deleteUser(usermodal.userId).subscribe(data => {
          var successalert = document.getElementById("deleteusersuccess");
          if(successalert){
            successalert.style.display = "block";
          }
          setTimeout(function(){
            if(successalert){
              successalert.style.display = "none";
            }
          }, 4000);
          this.refreshGrid();
       })
    }
  }

  refreshGrid() : void{
    this.listusers$ = this.userservice.getUsers();
    this.activateaddEdituser = false;
    this.user = {
      userId : 0,
      userName :"",
      password :"",
      phoneNumber :"",
      emailId :"",
      address :""
    };
  }
}
