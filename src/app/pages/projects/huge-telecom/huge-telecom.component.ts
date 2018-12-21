import { Component, OnInit } from '@angular/core';
import { Orientation } from '@app/components/floating-border-page/floating-border-page.component';

@Component({
  selector: 'pmp-huge-telecom',
  templateUrl: './huge-telecom.component.html',
  styleUrls: ['./huge-telecom.component.css']
})
export class HugeTelecomComponent implements OnInit {
  public leftOrient = Orientation.LEFT;

  constructor() { }

  ngOnInit() {
  }

}
