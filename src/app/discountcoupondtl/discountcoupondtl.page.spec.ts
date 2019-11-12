import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountcoupondtlPage } from './discountcoupondtl.page';

describe('DiscountcoupondtlPage', () => {
  let component: DiscountcoupondtlPage;
  let fixture: ComponentFixture<DiscountcoupondtlPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountcoupondtlPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountcoupondtlPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
