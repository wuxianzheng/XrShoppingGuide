import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityresultPage } from './activityresult.page';

describe('ActivityresultPage', () => {
  let component: ActivityresultPage;
  let fixture: ComponentFixture<ActivityresultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityresultPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityresultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
