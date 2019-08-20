import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagedialogPage } from './messagedialog.page';

describe('MessagedialogPage', () => {
  let component: MessagedialogPage;
  let fixture: ComponentFixture<MessagedialogPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagedialogPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagedialogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
