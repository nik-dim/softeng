import { TestBed } from '@angular/core/testing';

import { BlogDataService } from './blog-data.service';

describe('BlogDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogDataService = TestBed.get(BlogDataService);
    expect(service).toBeTruthy();
  });
});
