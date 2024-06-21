import { TestBed } from '@angular/core/testing';

import { ListadoEpisodiosService } from './listado-episodios.service';

describe('ListadoEpisodiosService', () => {
  let service: ListadoEpisodiosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListadoEpisodiosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
