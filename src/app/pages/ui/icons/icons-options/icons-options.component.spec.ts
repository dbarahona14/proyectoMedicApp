import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageIconsOptionsComponent } from './icons-options.component';

describe('PageIconsOptionsComponent', () => {
  let component: PageIconsOptionsComponent;
  let fixture: ComponentFixture<PageIconsOptionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageIconsOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageIconsOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
