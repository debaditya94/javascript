import { TestBed, inject } from '@angular/core/testing';

import { SavingService } from './saving.service';

describe('SavingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SavingService]
    });
  });

  it('should be created', inject([SavingService], (service: SavingService) => {
    expect(service).toBeTruthy();
  }));
});
