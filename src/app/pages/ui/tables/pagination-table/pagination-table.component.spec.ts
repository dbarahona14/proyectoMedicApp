import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PagePaginationTableComponent } from './pagination-table.component';

describe('PagePaginationTableComponent', () => {
  let component: PagePaginationTableComponent;
  let fixture: ComponentFixture<PagePaginationTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PagePaginationTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePaginationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
