import { Component, OnInit } from '@angular/core';
import { Orientation } from '@app/components/floating-border-page/floating-border-page.component';

@Component({
  selector: 'pmp-dvt-internal',
  templateUrl: './dvt-internal.component.html',
  styleUrls: ['./dvt-internal.component.css']
})
export class DvtInternalComponent implements OnInit {
  public rightOrient = Orientation.RIGHT;
  
  constructor() { }

  ngOnInit() {
  }

}
