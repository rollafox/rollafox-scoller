import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PositionedPanel } from '@app/routes/helpers/position-panel';

export interface NavigationPoint {
  id: number;
  description: string;
  baseColor?: string;
}

@Component({
  selector: 'pmp-point-navigation',
  templateUrl: './point-navigation.component.html',
  styleUrls: ['./point-navigation.component.scss']
})
export class PointNavigationComponent implements OnInit {
  @Input() points: PositionedPanel[];
  @Input() currentPosition: number;
  @Output() pointClick = new EventEmitter();
  @Output() leftClick = new EventEmitter();
  @Output() rightClick = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onPointClick(panel: PositionedPanel, $event) {
    this.pointClick.emit(panel);
  }

  onLeftClick($event) {
    this.leftClick.emit($event);
  }

  onRightClick($event) {
    this.rightClick.emit($event);
  }
}
