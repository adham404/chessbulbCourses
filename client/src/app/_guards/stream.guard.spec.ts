import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { streamGuard } from './stream.guard';

describe('streamGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => streamGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
