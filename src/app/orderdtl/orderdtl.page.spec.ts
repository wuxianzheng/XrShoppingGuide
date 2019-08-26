import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderdtlPage } from './orderdtl.page';

describe('OrderdtlPage', () => {
  let component: OrderdtlPage;
  let fixture: ComponentFixture<OrderdtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderdtlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
