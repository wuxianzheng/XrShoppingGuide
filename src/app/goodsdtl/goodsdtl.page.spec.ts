import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsdtlPage } from './goodsdtl.page';

describe('GoodsdtlPage', () => {
  let component: GoodsdtlPage;
  let fixture: ComponentFixture<GoodsdtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsdtlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsdtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
