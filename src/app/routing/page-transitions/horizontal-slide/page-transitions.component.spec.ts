import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalPageTransitionsComponent } from './page-transitions.component';

describe('PageTransitionsComponent', () => {
  let component: HorizontalPageTransitionsComponent;
  let fixture: ComponentFixture<HorizontalPageTransitionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HorizontalPageTransitionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalPageTransitionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
