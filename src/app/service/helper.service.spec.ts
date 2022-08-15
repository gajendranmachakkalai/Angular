import { TestBed } from '@angular/core/testing';
import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('encrypt should encrypt the given string', () => {
    expect(service.encrypt("value")).not.toBeNull();    
  });

  it('decrypt should decrypt the given string', () => {
    const value = 'U2FsdGVkX18JOy09t7pyeKVb1G/WfjnWl6KH5PJrylQ=';
    const actualvalue = "value"
    expect(service.decrypt(value)).toEqual(actualvalue);    
  });
});
