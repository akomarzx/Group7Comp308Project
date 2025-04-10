import { TestBed } from '@angular/core/testing';

import { UserSecurityService } from './auth.service';

describe('UserSecurityService', () => {
  let service: UserSecurityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserSecurityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
