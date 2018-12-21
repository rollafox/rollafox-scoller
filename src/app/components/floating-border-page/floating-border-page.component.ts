import { Component, OnInit, Input } from '@angular/core';

export enum Orientation {
  LEFT = 'left',
  RIGHT = 'right'
}

@Component({
  selector: 'pmp-floating-border-page',
  templateUrl: './floating-border-page.component.html',
  styleUrls: ['./floating-border-page.component.css']
})
export class FloatingBorderPageComponent implements OnInit {
  @Input() color = '#ffffff';
  @Input() orientation: Orientation = Orientation.LEFT;
  @Input() headerWidth = '530px';

  get gridColumns() {
    return (this.orientation === Orientation.LEFT) ?
      `15px ${this.headerWidth} 1fr 1fr 1fr 1fr 1fr 1fr 15px` : `15px 1fr 1fr 1fr 1fr 1fr 1fr ${this.headerWidth} 15px`;
  }

  constructor() { }

  ngOnInit() {
  }

}
