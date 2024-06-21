import { TestBed } from '@angular/core/testing';

import { ManejoSeleccionBotonService } from './manejo-seleccion-boton.service';

describe('ManejoSeleccionBotonService', () => {
  let service: ManejoSeleccionBotonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManejoSeleccionBotonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
