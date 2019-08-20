import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycenterPage } from './mycenter.page';

describe('MycenterPage', () => {
  let component: MycenterPage;
  let fixture: ComponentFixture<MycenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycenterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
