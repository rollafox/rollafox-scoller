import { Component, Input, OnInit } from '@angular/core';

import { Icon } from './icons.const';

@Component({
  selector: 'pmp-tech-stack-icon',
  templateUrl: './tech-stack-icon.component.html',
  styleUrls: ['./tech-stack-icon.component.scss']
})
export class TechStackIconComponent implements OnInit {
  @Input() icon: string = Icon.ANGULAR;
  @Input() color = '#3E3E3E';

  get imgSrc() {
    return `./assets/img/tech-icons/${this.icon}.png`;
  }

  constructor() { }

  ngOnInit() {
  }

}
