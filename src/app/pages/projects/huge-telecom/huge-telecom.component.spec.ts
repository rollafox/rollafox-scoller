import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HugeTelecomComponent } from './huge-telecom.component';

describe('HugeTelecomComponent', () => {
  let component: HugeTelecomComponent;
  let fixture: ComponentFixture<HugeTelecomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HugeTelecomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HugeTelecomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
