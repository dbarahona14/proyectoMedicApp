import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSearchPaginationTableComponent } from './search-pagination-table.component';

describe('PageSearchPaginationTableComponent', () => {
  let component: PageSearchPaginationTableComponent;
  let fixture: ComponentFixture<PageSearchPaginationTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSearchPaginationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSearchPaginationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
