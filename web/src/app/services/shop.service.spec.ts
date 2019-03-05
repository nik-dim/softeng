import { TestBed } from '@angular/core/testing';

import { ShopService } from './shop.service';
import { HttpClientModule } from '@angular/common/http';

describe('ShopService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ]
  }));

  it('should be created', () => {
    const service: ShopService = TestBed.get(ShopService);
    expect(service).toBeTruthy();
  });
});
