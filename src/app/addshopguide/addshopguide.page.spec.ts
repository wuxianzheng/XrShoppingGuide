import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ADDshopguidePage } from './addshopguide.page';

describe('ADDshopguidePage', () => {
  let component: ADDshopguidePage;
  let fixture: ComponentFixture<ADDshopguidePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ADDshopguidePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ADDshopguidePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
