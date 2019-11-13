import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyqrcodePage } from './myqrcode.page';

describe('MyqrcodePage', () => {
  let component: MyqrcodePage;
  let fixture: ComponentFixture<MyqrcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyqrcodePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyqrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
