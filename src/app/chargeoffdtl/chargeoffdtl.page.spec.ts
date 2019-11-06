import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeoffdtlPage } from './chargeoffdtl.page';

describe('ChargeoffdtlPage', () => {
  let component: ChargeoffdtlPage;
  let fixture: ComponentFixture<ChargeoffdtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargeoffdtlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargeoffdtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
