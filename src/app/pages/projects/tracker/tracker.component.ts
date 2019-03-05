import { Component, OnInit } from '@angular/core';
import { Orientation } from '@app/components/floating-border-page/floating-border-page.component';
import { Icon } from '@app/components/tech-stack-icon/icons.const';

@Component({
  selector: 'pmp-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {
  public leftOrient = Orientation.LEFT;
  public techIcons = [
    Icon.ANGULAR,
    Icon.SASS,
    Icon.TYPESCRIPT,
    Icon.HTML5,
    /* Icon.WEBPACK,
      Icon.CSHARP, */
  ];

  constructor() { }

  ngOnInit() {
  }

}
