import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeofflistPage } from './chargeofflist.page';

describe('ChargeofflistPage', () => {
  let component: ChargeofflistPage;
  let fixture: ComponentFixture<ChargeofflistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeofflistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeofflistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
