import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PagePaymentsComponent } from './payments.component';

describe('PagePaymentsComponent', () => {
  let component: PagePaymentsComponent;
  let fixture: ComponentFixture<PagePaymentsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
