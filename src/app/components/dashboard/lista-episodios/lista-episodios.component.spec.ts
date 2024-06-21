import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEpisodiosComponent } from './lista-episodios.component';

describe('ListaEpisodiosComponent', () => {
  let component: ListaEpisodiosComponent;
  let fixture: ComponentFixture<ListaEpisodiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaEpisodiosComponent]
    });
    fixture = TestBed.createComponent(ListaEpisodiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
