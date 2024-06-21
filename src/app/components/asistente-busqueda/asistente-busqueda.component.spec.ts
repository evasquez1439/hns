import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenteBusquedaComponent } from './asistente-busqueda.component';

describe('AsistenteBusquedaComponent', () => {
  let component: AsistenteBusquedaComponent;
  let fixture: ComponentFixture<AsistenteBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsistenteBusquedaComponent]
    });
    fixture = TestBed.createComponent(AsistenteBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
