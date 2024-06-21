import { TestBed } from '@angular/core/testing';

import { ListadoAyudasDxService } from './listado-ayudas-dx.service';

describe('ListadoAyudasDxService', () => {
  let service: ListadoAyudasDxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoAyudasDxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
