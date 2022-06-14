import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSortingTableComponent } from './sorting-table.component';

describe('PageSortingTableComponent', () => {
  let component: PageSortingTableComponent;
  let fixture: ComponentFixture<PageSortingTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSortingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSortingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
