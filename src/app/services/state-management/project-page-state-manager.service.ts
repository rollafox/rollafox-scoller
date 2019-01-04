import { Injectable } from '@angular/core';
import { NOT_FOUND_PAGE } from '@app/routing/configuration/core-page.config';
import { Direction } from '@app/routing/configuration/navigation.enums';
import { DetailedPage } from '@app/routing/configuration/page';
import { ProjectsConfig } from '@app/routing/configuration/projects-routing.config';
import { SubNavigationState } from '@app/routing/configuration/sub-navigation-state.config';

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
      viewConf = (direction === Direction.NEXT) ? this.getNextView(currentView) :
        this.getPreviousView(currentView);

    return this.currentPageState = new SubNavigationState({
      reversedAnimationDirection: viewConf.reverseAnimation,
      currentView: currentView,
      nextView: viewConf.view,
      mainPageState: newState.mainPageState,
      secondaryPageState: newState.secondaryPageState
    });
  }

  navigationComplete() {
    this.currentPageState.currentView = this.currentPageState.nextView;
    this.currentPageState.nextView = new DetailedPage(NOT_FOUND_PAGE);
    this.canNavigate = true;
  }

  getNextView(currentView) {
    let to: DetailedPage,
      reverseAnimation = false;
    if ((currentView.order + 1) > this.currentPageState.projectPages.length) {
      reverseAnimation = true;
      to = this.currentPageState.projectPages[0];
    } else {
      to = this.currentPageState.projectPages.find((page) => {
        return page.order === (currentView.order + 1);
      });
    }
    return {
      view: to,
      reverseAnimation: reverseAnimation
    };
  }

  getPreviousView(currentView) {
    let to: DetailedPage,
      reverseAnimation = false;
    if ((currentView.order - 1) <= 0) {
      reverseAnimation = true;
      to = this.currentPageState.projectPages[this.currentPageState.projectPages.length - 1];
    } else {
      to = this.currentPageState.projectPages.find((page) => {
        return page.order === (currentView.order - 1);
      });
    }
    return {
      view: to,
      reverseAnimation: reverseAnimation
    };
  }

  getNewBasePageState(currentState, direction) {
    // TODO: This can probably be improved with a strategy or some such.... Hhmmmmmm - maybe I should checkout redux
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

    } else if ((direction === Direction.NEXT && currentState.mainPageState === 'left') ||
      (direction === Direction.PREVIOUS && currentState.mainPageState === 'offRight' && currentState.secondaryPageState === 'base')) {

      mainPageState = 'offLeft';
      secondaryPageState = 'right';

    } else if ((direction === Direction.NEXT && currentState.mainPageState === 'offLeft' && currentState.secondaryPageState === 'right') ||
      (direction === Direction.PREVIOUS && currentState.mainPageState === 'offRight' && currentState.secondaryPageState === 'left')) {

      mainPageState = 'offRight';
      secondaryPageState = 'base';

    } else if ((direction === Direction.PREVIOUS && currentState.mainPageState === 'right') ||
      (direction === Direction.NEXT && currentState.secondaryPageState === 'base')) {

      mainPageState = 'offRight';
      secondaryPageState = 'left';

    } else if ((direction === Direction.PREVIOUS && currentState.mainPageState === 'base') ||
      (direction === Direction.NEXT && currentState.mainPageState === 'offRight')) {

      mainPageState = 'right';
      secondaryPageState = 'offLeft';

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
