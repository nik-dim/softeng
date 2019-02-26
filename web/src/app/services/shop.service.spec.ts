import { TestBed } from '@angular/core/testing';

import { ShopService } from './shop.service';

describe('ShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopService = TestBed.get(ShopService);
    expect(service).toBeTruthy();
  });
});
