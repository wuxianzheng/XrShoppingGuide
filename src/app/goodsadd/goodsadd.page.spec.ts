import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsaddPage } from './goodsadd.page';

describe('GoodsaddPage', () => {
  let component: GoodsaddPage;
  let fixture: ComponentFixture<GoodsaddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsaddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsaddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
