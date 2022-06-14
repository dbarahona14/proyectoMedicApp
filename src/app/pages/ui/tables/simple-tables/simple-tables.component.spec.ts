import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageSimpleTablesComponent } from './simple-tables.component';

describe('PageTablesComponent', () => {
  let component: PageSimpleTablesComponent;
  let fixture: ComponentFixture<PageSimpleTablesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSimpleTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSimpleTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
