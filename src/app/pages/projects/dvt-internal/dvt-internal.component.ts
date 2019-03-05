import { Component, OnInit } from '@angular/core';
import { Orientation } from '@app/components/floating-border-page/floating-border-page.component';
import { Icon } from '@app/components/tech-stack-icon/icons.const';

@Component({
  selector: 'pmp-dvt-internal',
  templateUrl: './dvt-internal.component.html',
  styleUrls: ['./dvt-internal.component.scss']
})
export class DvtInternalComponent implements OnInit {
  public rightOrient = Orientation.RIGHT;
  public icons = Icon;
  public techIcons = [
    Icon.ANGULAR,
    Icon.NODE,
    /* Icon.DOCKER, */
    /* Icon.AZURE_DEVOPTS, */
    Icon.TYPESCRIPT,
    Icon.SASS
  ];

  constructor() { }

  ngOnInit() {
  }

}
