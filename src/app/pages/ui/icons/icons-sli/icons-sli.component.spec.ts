import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageIconsSliComponent } from './icons-sli.component';

describe('PageIconsSliComponent', () => {
  let component: PageIconsSliComponent;
  let fixture: ComponentFixture<PageIconsSliComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageIconsSliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageIconsSliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
