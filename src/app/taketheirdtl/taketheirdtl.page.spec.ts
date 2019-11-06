import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaketheirdtlPage } from './taketheirdtl.page';

describe('TaketheirdtlPage', () => {
  let component: TaketheirdtlPage;
  let fixture: ComponentFixture<TaketheirdtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaketheirdtlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaketheirdtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
