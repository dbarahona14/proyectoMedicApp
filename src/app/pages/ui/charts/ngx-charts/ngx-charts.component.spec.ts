import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageNgxChartsComponent } from './ngx-charts.component';

describe('PageNgxChartsComponent', () => {
  let component: PageNgxChartsComponent;
  let fixture: ComponentFixture<PageNgxChartsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNgxChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNgxChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
