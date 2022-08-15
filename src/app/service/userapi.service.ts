import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usermodel } from  'src/app/model/usermodel';

@Injectable({
  providedIn: 'root'
})
export class UserapiService {

  readonly userApiUrl  = "http://localhost:5099/api";
  
  constructor(private http: HttpClient) { }

  getUsers() : Observable<Usermodel[]> {
    return this.http.get<Usermodel[]>(this.userApiUrl + "/UserMaster");
  }

  addUser(data : Usermodel){
    return this.http.post(this.userApiUrl + "/UserMaster", data);
  }

  updateUser(data : Usermodel){
    return this.http.put(this.userApiUrl + "/UserMaster", data);
  }

  deleteUser(id:number|string){
    return this.http.delete(this.userApiUrl + `/UserMaster/${id}`);
  }
}
