import { TestBed } from '@angular/core/testing';

import { CharactersDataManagementService } from './characters-data-management.service';

describe('CharactersDataManagementService', () => {
  let service: CharactersDataManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharactersDataManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
