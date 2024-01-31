import { TestBed } from '@angular/core/testing';

import { AcademyService } from './academy.service';

describe('AcademyService', () => {
  let service: AcademyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
