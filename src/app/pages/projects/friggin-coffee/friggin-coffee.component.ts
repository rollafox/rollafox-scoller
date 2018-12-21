import { Component, OnInit } from '@angular/core';
import { Orientation } from '@app/components/floating-border-page/floating-border-page.component';

@Component({
  selector: 'pmp-friggin-coffee',
  templateUrl: './friggin-coffee.component.html',
  styleUrls: ['./friggin-coffee.component.css']
})
export class FrigginCoffeeComponent implements OnInit {
  public rightOrient = Orientation.RIGHT;

  constructor() { }

  ngOnInit() {
  }

}
