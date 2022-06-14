import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageInvoiceComponent } from './invoice.component';

describe('PageInvoiceComponent', () => {
  let component: PageInvoiceComponent;
  let fixture: ComponentFixture<PageInvoiceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
