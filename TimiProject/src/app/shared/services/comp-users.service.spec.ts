import { TestBed } from '@angular/core/testing';

import { CompUsersService } from './comp-users.service';

describe('CompUsersService', () => {
  let service: CompUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
