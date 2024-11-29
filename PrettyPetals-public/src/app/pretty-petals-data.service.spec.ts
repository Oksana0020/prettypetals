import { TestBed } from '@angular/core/testing';

import { PrettyPetalsDataService } from './pretty-petals-data.service';

describe('PrettyPetalsDataService', () => {
  let service: PrettyPetalsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrettyPetalsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
