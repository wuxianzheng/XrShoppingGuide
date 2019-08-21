import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopguiderankingPage } from './shopguideranking.page';

describe('ShopguiderankingPage', () => {
  let component: ShopguiderankingPage;
  let fixture: ComponentFixture<ShopguiderankingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopguiderankingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopguiderankingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
