import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import {AuthService} from "../services/auth/auth.service";
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  const authService = jasmine.createSpyObj('AuthService', ['getLoggedInUser']);
  authService.getLoggedInUser.and.returnValue({sub: {username: 'test'}})

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      providers: [{provide: AuthService, useValue: authService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
