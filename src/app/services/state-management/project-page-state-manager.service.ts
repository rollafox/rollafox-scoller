import { Injectable } from '@angular/core';
import { NOT_FOUND_PAGE } from '@app/routing/configuration/core-page.config';
import { Direction, PositionType } from '@app/routing/configuration/navigation.enums';
import { DetailedPage } from '@app/routing/configuration/page';
import { PageState } from '../../routing/configuration/page-state';
import { PositionedPanel } from '@app/routing/configuration/position-panel';
import { BehaviorSubject } from 'rxjs';
import { ProjectPages } from '@app/routing/configuration/project-pages.config';

@Injectable({
  providedIn: 'root'
})
export class ProjectPageStateManagerService {
  private currentPageState: PageState;
  private canNavigate = true;
  private reverseAnimation = new BehaviorSubject<boolean>(false);
  private positions = [
    {
      position: 1,
      basePanelState: PositionType.BASE,
      secondaryPanelState: PositionType.OFF_RIGHT
    },
    {
      position: 2,
      basePanelState: PositionType.LEFT,
      secondaryPanelState: PositionType.OFF_RIGHT
    },
    {
      position: 3,
      basePanelState: PositionType.OFF_LEFT,
      secondaryPanelState: PositionType.RIGHT
    },
    {
      position: 4,
      basePanelState: PositionType.OFF_RIGHT,
      secondaryPanelState: PositionType.BASE
    },
    {
      position: 5,
      basePanelState: PositionType.OFF_RIGHT,
      secondaryPanelState: PositionType.LEFT
    },
    {
      position: 6,
      basePanelState: PositionType.RIGHT,
      secondaryPanelState: PositionType.OFF_LEFT
    }
  ];

  get reverseAnimationObs() {
    return this.reverseAnimation.asObservable();
  }

  get state() {
    return this.currentPageState.getCurrent();
  }

  get panels() {
    return this.currentPageState.allPanels;
  }

  constructor() {
    this.currentPageState = new PageState(this.positions.map((position) => {
      return new PositionedPanel({
        ...position,
        page: new DetailedPage(ProjectPages.find((project) => project.order === position.position))
      });
    }));
  }

  linearTransition(direction: Direction): PositionedPanel {
    if (!this.canNavigate) {
      return this.currentPageState.getCurrent();
    }
    this.canNavigate = false;
    this.currentPageState.linearNavigate(direction);
    const newPanel = this.currentPageState.getCurrent();
    if ((newPanel.position === 1 && direction === Direction.NEXT) ||
      (newPanel.position === this.currentPageState.positionCount && direction === Direction.PREVIOUS)) {
      // Reverse Animation (Completing the loop)
      // TODO: Split the difference and reverse if it's a shorter distance
      this.reverseAnimation.next(true);
    }
    return newPanel;
  }

  navigationComplete() {
    // resetting navigation
    this.canNavigate = true;
    this.reverseAnimation.next(false);
  }

  directNavigation(destination: number) {
    if (!this.canNavigate) {
      return this.currentPageState.getCurrent();
    }
    this.canNavigate = false;
    this.currentPageState.directNavigate(destination);
    return this.currentPageState.getCurrent();
  }

}
