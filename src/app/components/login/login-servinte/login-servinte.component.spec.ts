import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginServinteComponent } from './login-servinte.component';

describe('LoginServinteComponent', () => {
  let component: LoginServinteComponent;
  let fixture: ComponentFixture<LoginServinteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginServinteComponent]
    });
    fixture = TestBed.createComponent(LoginServinteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
