import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodslistPage } from './goodslist.page';

describe('GoodslistPage', () => {
  let component: GoodslistPage;
  let fixture: ComponentFixture<GoodslistPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodslistPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodslistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
