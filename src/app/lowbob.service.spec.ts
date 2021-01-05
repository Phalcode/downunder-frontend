import { TestBed } from '@angular/core/testing';

import { LowbobService } from './lowbob.service';

describe('LowbobService', () => {
  let service: LowbobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LowbobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
