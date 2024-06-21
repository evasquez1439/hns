import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosDemograficosComponent } from './datos-demograficos.component';

describe('DatosDemograficosComponent', () => {
  let component: DatosDemograficosComponent;
  let fixture: ComponentFixture<DatosDemograficosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatosDemograficosComponent]
    });
    fixture = TestBed.createComponent(DatosDemograficosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
