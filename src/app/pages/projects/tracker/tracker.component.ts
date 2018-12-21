import { Component, OnInit } from '@angular/core';
import { Orientation } from '@app/components/floating-border-page/floating-border-page.component';

@Component({
  selector: 'pmp-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {
  public leftOrient = Orientation.LEFT;

  constructor() { }

  ngOnInit() {
  }

}
