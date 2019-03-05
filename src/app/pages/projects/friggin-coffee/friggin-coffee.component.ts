import { Component, OnInit } from '@angular/core';
import { Orientation } from '@app/components/floating-border-page/floating-border-page.component';
import { Icon } from '@app/components/tech-stack-icon/icons.const';

@Component({
  selector: 'pmp-friggin-coffee',
  templateUrl: './friggin-coffee.component.html',
  styleUrls: ['./friggin-coffee.component.scss']
})
export class FrigginCoffeeComponent implements OnInit {
  public rightOrient = Orientation.RIGHT;
  public icons = Icon;
  public techIcons = [
    Icon.JQUERY,
    Icon.PHP,
    Icon.MY_SQL,
    Icon.APACHE
  ];

  constructor() { }

  ngOnInit() {
  }

}
