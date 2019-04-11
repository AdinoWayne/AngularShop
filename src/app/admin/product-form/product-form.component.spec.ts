import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponent } from './product-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFormComponent ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
