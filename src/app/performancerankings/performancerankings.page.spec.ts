import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformancerankingsPage } from './performancerankings.page';

describe('PerformancerankingsPage', () => {
  let component: PerformancerankingsPage;
  let fixture: ComponentFixture<PerformancerankingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerformancerankingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerformancerankingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
