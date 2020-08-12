import { TestBed, inject } from '@angular/core/testing';

import { DigiserveService } from './digiserve.service';

describe('DigiserveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DigiserveService]
    });
  });

  it('should be created', inject([DigiserveService], (service: DigiserveService) => {
    expect(service).toBeTruthy();
  }));
});
