import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PagePricingComponent } from './pricing.component';

describe('PagePricingComponent', () => {
  let component: PagePricingComponent;
  let fixture: ComponentFixture<PagePricingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePricingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
