import { Component, OnInit } from '@angular/core';
import { Orientation } from '@app/components/floating-border-page/floating-border-page.component';
import { Icon } from '@app/components/tech-stack-icon/icons.const';

@Component({
  selector: 'pmp-huge-telecom',
  templateUrl: './huge-telecom.component.html',
  styleUrls: ['./huge-telecom.component.scss']
})
export class HugeTelecomComponent implements OnInit {
  public leftOrient = Orientation.LEFT;
  public icons = Icon;
  public techIcons = [
    Icon.ANGULAR,
    Icon.PHP,
    Icon.GIT,
    Icon.JQUERY
  ];

  constructor() { }

  ngOnInit() {
  }

}
