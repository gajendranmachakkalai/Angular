import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Usermodel } from 'src/app/model/usermodel';
import { UserapiService } from 'src/app/service/userapi.service';
import { ShowuserComponent } from './showuser.component';
import {HttpClient, HttpHandler} from '@angular/common/http';

class MockUserApi extends UserapiService{  
  override getUsers() : Observable<Usermodel[]> {
    var usermodels : Usermodel[] = [{
      userId : 1,
      userName : 'TestUserName',
      password : 'test',
      phoneNumber : '98989898989',
      emailId :'test@gmail.com',
      address : 'address'
    }];
    return of(usermodels);
  }
}

describe('ShowuserComponent', () => {
  let component: ShowuserComponent;
  let fixture: ComponentFixture<ShowuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowuserComponent ],
      providers: [ { provide : UserapiService, useClass : MockUserApi }, HttpClient, HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the grid', () => {
    component.refreshGrid();
    component.listusers$.subscribe(result => {
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].userName).toEqual('TestUserName')
    })
  });

});
