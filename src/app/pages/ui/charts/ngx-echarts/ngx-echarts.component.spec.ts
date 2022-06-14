import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageNgxEchartsComponent } from './ngx-echarts.component';

describe('PageNgxEchartsComponent', () => {
  let component: PageNgxEchartsComponent;
  let fixture: ComponentFixture<PageNgxEchartsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNgxEchartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNgxEchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
