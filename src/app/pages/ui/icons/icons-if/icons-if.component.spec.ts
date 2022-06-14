import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageIconsIfComponent } from './icons-if.component';

describe('PageIconsIfComponent', () => {
  let component: PageIconsIfComponent;
  let fixture: ComponentFixture<PageIconsIfComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageIconsIfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageIconsIfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
