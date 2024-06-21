import { TestBed } from '@angular/core/testing';

import { ReporteHCService } from './reporte-hc.service';

describe('ReporteHCService', () => {
  let service: ReporteHCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteHCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
