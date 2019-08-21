import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVersionPage } from './app-version.page';

describe('AppVersionPage', () => {
  let component: AppVersionPage;
  let fixture: ComponentFixture<AppVersionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppVersionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppVersionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
