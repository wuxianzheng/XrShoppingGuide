import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingmanagementPage } from './bookingmanagement.page';

describe('BookingmanagementPage', () => {
  let component: BookingmanagementPage;
  let fixture: ComponentFixture<BookingmanagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingmanagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingmanagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
