import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TCTableComponent } from './table.component';

describe('TCTableComponent', () => {
  let component: TCTableComponent;
  let fixture: ComponentFixture<TCTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TCTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TCTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
