import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalPageTransitionsComponent } from './page-transitions.component';

describe('VerticalPageTransitionsComponent', () => {
  let component: VerticalPageTransitionsComponent;
  let fixture: ComponentFixture<VerticalPageTransitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerticalPageTransitionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalPageTransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
