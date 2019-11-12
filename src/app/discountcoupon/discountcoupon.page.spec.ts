import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountcouponPage } from './discountcoupon.page';

describe('DiscountcouponPage', () => {
  let component: DiscountcouponPage;
  let fixture: ComponentFixture<DiscountcouponPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountcouponPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountcouponPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
