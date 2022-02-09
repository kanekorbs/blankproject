import { TestBed } from '@angular/core/testing';

import { CompravenduteService } from './compravendute.service';

describe('CompravenduteService', () => {
  let service: CompravenduteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompravenduteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
