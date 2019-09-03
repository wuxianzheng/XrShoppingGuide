import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewimgPage } from './previewimg.page';

describe('PreviewimgPage', () => {
  let component: PreviewimgPage;
  let fixture: ComponentFixture<PreviewimgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewimgPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewimgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
