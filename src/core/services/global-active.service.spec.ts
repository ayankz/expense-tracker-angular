import { TestBed } from '@angular/core/testing';

import { GlobalActiveService } from './global-active.service';

describe('GlobalActiveService', () => {
  let service: GlobalActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
