import { Injectable } from '@angular/core';
import { Page, NAVIGATION_TYPE, ProjectsConfig } from '@app/routing/page.config';

export enum Direction {
  NEXT,
  PREVIOUS
}

interface SubNavigationStateConfig {
  currentView?: Page;
  nextView?: Page;
  mainPageState?: string;
  secondaryPageState?: string;
  reversedAnimationDirection?: boolean;
}

export class SubNavigationState {
  public currentView: Page;
  public nextView: Page;
  public mainPageState;
  public secondaryPageState;
  public reversedAnimationDirection: boolean;
  public projectPages = Object.values(ProjectsConfig).map((project) => new Page(project));

  constructor(config: SubNavigationStateConfig) {
    this.currentView = config.currentView || this.projectPages[0];
    this.nextView = config.nextView || new Page({
      path: 'not-found',
      order: null
    });
    this.reversedAnimationDirection = config.reversedAnimationDirection || false;
    this.mainPageState = config.mainPageState || 'base';
    this.secondaryPageState = config.secondaryPageState || 'offRight';
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProjectPageStateManagerService {

  private currentPageState = new SubNavigationState({});
  private pageConfiguration = ProjectsConfig;
  private canNavigate = true;

  constructor() { }

  linearTransition(direction): SubNavigationState {
    if (!this.canNavigate) {
      return this.currentPageState;
    }
    this.canNavigate = false;

    const newState = this.getNewBasePageState(this.currentPageState, direction),
      currentView = this.currentPageState.currentView,
      nextViewConf = this.getNextView(currentView, direction);

    return this.currentPageState = new SubNavigationState({
      reversedAnimationDirection: nextViewConf.reverseAnimation,
      currentView: currentView,
      nextView: nextViewConf.nextView,
      mainPageState: newState.mainPageState,
      secondaryPageState: newState.secondaryPageState
    });
  }

  navigationComplete() {
    this.currentPageState.currentView = this.currentPageState.nextView;
    this.currentPageState.nextView = new Page({
      path: 'not-found',
      order: null
    });
    this.canNavigate = true;
  }

  getNextView(currentView, direction: Direction) {
    let to: Page,
      reverseAnimation = false;
    if (direction === Direction.NEXT) {
      if ((currentView.order + 1) > this.currentPageState.projectPages.length) {
        reverseAnimation = true;
        to = this.currentPageState.projectPages[0];
      } else {
        to = this.currentPageState.projectPages.find((page) => {
          return page.order === (currentView.order + 1);
        });
      }
    } else if (direction === Direction.PREVIOUS) {
      if ((currentView.order - 1) <= 0) {
        reverseAnimation = true;
        to = this.currentPageState.projectPages[this.currentPageState.projectPages.length - 1];
      } else {
        to = this.currentPageState.projectPages.find((page) => {
          return page.order === (currentView.order - 1);
        });
      }
    }
    return {
      nextView: to,
      reverseAnimation: reverseAnimation
    };
  }

  getNewBasePageState(currentState, direction) {// TODO: This can probably be improved with a strategy or some such.
    let mainPageState,
      secondaryPageState;
    if ((direction === Direction.NEXT && currentState.mainPageState === 'right') ||
      (direction === Direction.PREVIOUS && currentState.mainPageState === 'left')) {

      mainPageState = 'base';
      secondaryPageState = 'offRight';

    } else if ((direction === Direction.NEXT && currentState.mainPageState === 'base') ||
      (direction === Direction.PREVIOUS && currentState.mainPageState === 'offLeft')) {

      mainPageState = 'left';
      secondaryPageState = 'offRight';

    } else if (direction === Direction.NEXT && currentState.mainPageState === 'left') {

      mainPageState = 'offLeft';
      secondaryPageState = 'right';

    } else if (direction === Direction.NEXT && currentState.mainPageState === 'offLeft' && currentState.secondaryPageState === 'right') {

      mainPageState = 'offRight';
      secondaryPageState = 'base';

    } else if (direction === Direction.PREVIOUS && currentState.mainPageState === 'right') {

      mainPageState = 'offRight';
      secondaryPageState = 'left';

    } else if (direction === Direction.NEXT && currentState.mainPageState === 'offRight' && currentState.secondaryPageState === 'base') {

      mainPageState = 'offRight';
      secondaryPageState = 'left';

    } else if (direction === Direction.PREVIOUS && currentState.mainPageState === 'offRight' && currentState.secondaryPageState === 'left') {

      mainPageState = 'offRight';
      secondaryPageState = 'base';

    } else if ((direction === Direction.PREVIOUS && currentState.mainPageState === 'base') || (direction === Direction.NEXT && currentState.mainPageState === 'offRight')) {

      mainPageState = 'right';
      secondaryPageState = 'offLeft';

    } else if (direction === Direction.PREVIOUS && currentState.mainPageState === 'offRight' && currentState.secondaryPageState === 'base') {

      mainPageState = 'offLeft';
      secondaryPageState = 'right';

    } else if (direction === Direction.NEXT && currentState.mainPageState === 'offLeft' && currentState.secondaryPageState === 'base') {

      mainPageState = 'offRight';
      secondaryPageState = 'left';

    }
    console.log('STATE of Base Layer: ', {
      mainPageState: mainPageState,
      secondaryPageState: secondaryPageState,
    });
    return {
      mainPageState: mainPageState,
      secondaryPageState: secondaryPageState,
    };
  }

  directNavigation(nextView) {
    // TODO: Handle Direct Navigation...
    /* console.groupCollapsed('__ Direct Sub Navigation __');
     console.log('project', project);
     console.log('innerPagePosition', this.innerPagePosition);
     if (project.order > this.innerPagePosition) {
       this.mainPageState = 'left';
       nextView =  Direction.NEXT;
       this.innerPagePosition = project.order;
     } else if (project.order < this.innerPagePosition) {
       this.mainPageState = 'right';
       nextView =  Direction.PREVIOUS;
       this.innerPagePosition = project.order;
     }
     console.log('mainPageState', this.mainPageState);
     console.groupEnd();
     this.navigationTrigger.next(`${nextView}`);
     */


    // this.router.navigate([`projects/${nextView}`]);

    // this.currentView = to;
    // this.previousScroll = pos;
    // this.canNavigate = false;
    // this.holdNavigationForAnimation$.next(event);
  }

}
