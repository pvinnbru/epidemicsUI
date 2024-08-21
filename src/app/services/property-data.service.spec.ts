import { TestBed } from '@angular/core/testing';

import { PropertyDataService } from './property-data.service';

describe('PropertyDataService', () => {
  let service: PropertyDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
