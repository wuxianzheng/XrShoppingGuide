import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaketheirPage } from './taketheir.page';

describe('TaketheirPage', () => {
  let component: TaketheirPage;
  let fixture: ComponentFixture<TaketheirPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaketheirPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaketheirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
