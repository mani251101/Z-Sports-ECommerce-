import { TestBed } from '@angular/core/testing';

import { RolebasedGuard } from './rolebased.guard';

describe('RolebasedGuard', () => {
  let guard: RolebasedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolebasedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
