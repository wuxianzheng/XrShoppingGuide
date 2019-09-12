import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeoffPage } from './chargeoff.page';

describe('ChargeoffPage', () => {
  let component: ChargeoffPage;
  let fixture: ComponentFixture<ChargeoffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeoffPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeoffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
