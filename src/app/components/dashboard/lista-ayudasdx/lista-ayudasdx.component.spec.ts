import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAyudasdxComponent } from './lista-ayudasdx.component';

describe('ListaAyudasdxComponent', () => {
  let component: ListaAyudasdxComponent;
  let fixture: ComponentFixture<ListaAyudasdxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaAyudasdxComponent]
    });
    fixture = TestBed.createComponent(ListaAyudasdxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
