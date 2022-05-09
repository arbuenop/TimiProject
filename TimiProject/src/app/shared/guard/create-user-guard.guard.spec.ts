import { TestBed } from '@angular/core/testing';

import { CreateUserGuardGuard } from './create-user-guard.guard';

describe('CreateUserGuardGuard', () => {
  let guard: CreateUserGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CreateUserGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
