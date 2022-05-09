import { TestBed } from '@angular/core/testing';

import { VerifyIdentityGuard } from './verify-identity.guard';

describe('VerifyIdentityGuard', () => {
  let guard: VerifyIdentityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifyIdentityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
