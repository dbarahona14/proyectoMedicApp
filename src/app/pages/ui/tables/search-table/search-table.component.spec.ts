import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSearchTableComponent } from './search-table.component';

describe('PageSearchTableComponent', () => {
  let component: PageSearchTableComponent;
  let fixture: ComponentFixture<PageSearchTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSearchTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSearchTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
