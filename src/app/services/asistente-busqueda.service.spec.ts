import { TestBed } from '@angular/core/testing';

import { AsistenteBusquedaService } from './asistente-busqueda.service';

describe('AsistenteBusquedaService', () => {
  let service: AsistenteBusquedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsistenteBusquedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
