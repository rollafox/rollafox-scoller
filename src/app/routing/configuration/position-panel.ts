import { PositionType } from './navigation.enums';
import { DetailedPage } from './page';
import { PageState } from './page-state';
import { NOT_FOUND_PAGE } from './core-page.config';


export interface Panel {
  position: number;
  basePanelState: PositionType;
  secondaryPanelState: PositionType;
  page: DetailedPage;
}

export class PositionedPanel {
  position: number;
  basePanelState: PositionType;
  secondaryPanelState: PositionType;
  page: DetailedPage = new DetailedPage(NOT_FOUND_PAGE);

  constructor(panelConfig: Panel) {
    this.position = panelConfig.position;
    this.basePanelState = panelConfig.basePanelState;
    this.secondaryPanelState = panelConfig.secondaryPanelState;
    this.page = panelConfig.page;
  }

  setPage(pageState: PageState, position: number): void {
    pageState.Panel = new PositionedPanel(pageState.findPosition(position));
  }

  nextState(pageState: PageState): void {
    this.setPage(pageState, this.nextPosition(pageState));
  }

  previousState(pageState: PageState): void {
    this.setPage(pageState, this.previousPosition(pageState));
  }

  jumpState(pageState: PageState, toPosition: number): void {
    this.setPage(pageState, toPosition);
  }

  nextPosition(pageState: PageState): number {
    return (pageState.getCurrent().position === pageState.positionCount) ? 1 : pageState.getCurrent().position + 1;
  }

  previousPosition(pageState: PageState): number {
    return (pageState.getCurrent().position === 1) ? pageState.positionCount : pageState.getCurrent().position - 1;
  }

}
