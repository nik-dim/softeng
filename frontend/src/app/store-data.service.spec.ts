import { TestBed } from '@angular/core/testing';

import { StoreDataService } from './store-data.service';

describe('StoreDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreDataService = TestBed.get(StoreDataService);
    expect(service).toBeTruthy();
  });
});
