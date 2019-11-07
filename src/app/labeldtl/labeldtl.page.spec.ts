import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeldtlPage } from './labeldtl.page';

describe('LabeldtlPage', () => {
  let component: LabeldtlPage;
  let fixture: ComponentFixture<LabeldtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabeldtlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeldtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
