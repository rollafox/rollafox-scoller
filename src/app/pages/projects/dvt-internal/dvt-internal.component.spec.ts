import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DvtInternalComponent } from './dvt-internal.component';

describe('DvtInternalComponent', () => {
  let component: DvtInternalComponent;
  let fixture: ComponentFixture<DvtInternalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DvtInternalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DvtInternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
