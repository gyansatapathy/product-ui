import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
