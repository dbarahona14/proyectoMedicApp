import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageTextareasComponent } from './textareas.component';

describe('PageTextareasComponent', () => {
  let component: PageTextareasComponent;
  let fixture: ComponentFixture<PageTextareasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTextareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTextareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
