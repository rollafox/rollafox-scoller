import { Direction } from '@app/routing/configuration/navigation.enums';

import { PositionedPanel, Panel } from './position-panel';


export class PageState {
  private currentPanel: PositionedPanel;
  private panels: PositionedPanel[];

  get positionCount() {
    return this.panels.length;
  }

  get allPanels() {
    return [...this.panels];
  }

  set Panel(panel: PositionedPanel) {
    this.currentPanel = panel;
  }

  constructor(panels: Panel[]) {
    this.panels = panels.map((panel: Panel) => new PositionedPanel(panel));
    this.currentPanel = this.panels[0]; // init position.
  }

  linearNavigate(direction: Direction): void {
    if (direction === Direction.NEXT) {
      this.currentPanel.nextState(this);
    } else {
      this.currentPanel.previousState(this);
    }
  }

  directNavigate(position: number): void {
    console.log('__Inner pos: ', position);
    this.currentPanel.jumpState(this, position);
  }

  getCurrent(): PositionedPanel {
    return this.currentPanel;
  }

  findPosition(position: number): PositionedPanel {
    return this.panels.find((panel) => panel.position === position);
  }

}
