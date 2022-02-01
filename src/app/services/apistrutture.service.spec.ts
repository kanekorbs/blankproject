import { TestBed } from '@angular/core/testing';

import { ApistruttureService } from './apistrutture.service';

describe('ApistruttureService', () => {
  let service: ApistruttureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApistruttureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
