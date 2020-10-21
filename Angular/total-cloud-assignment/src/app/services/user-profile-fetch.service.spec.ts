import { TestBed } from '@angular/core/testing';

import { UserProfileFetchService } from './user-profile-fetch.service';

describe('UserProfileFetchService', () => {
  let service: UserProfileFetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileFetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
