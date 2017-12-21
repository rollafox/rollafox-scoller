import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigTitleComponent } from './big-title.component';

describe('BigTitleComponent', () => {
  let component: BigTitleComponent;
  let fixture: ComponentFixture<BigTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
