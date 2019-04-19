import { Component, HostListener, OnInit } from '@angular/core';
import { oneThirdHorizontalTransition } from '@app/routes/animations/one-third-transition-animation';
import { Direction } from '@app/routes/helpers/navigation.enums';
import { PositionedPanel } from '@app/routes/helpers/position-panel';
import { ProjectPageStateManagerService } from '@app/services/state-management/project-page-state-manager.service';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'pmp-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [oneThirdHorizontalTransition]
})
export class ProjectsComponent implements OnInit {
  public hiddenOverlay = true;
  public direction = Direction;
  public navigationState: PositionedPanel;
  public navigationTrigger = new Subject<PositionedPanel>();

  get reverseAnimationObs() {
    return this.projectPageStateManagerService.reverseAnimationObs;
  }

  get panels() {
    return this.projectPageStateManagerService.panels;
  }

  @HostListener('window:keyup', ['$event']) startLinearNavigation(event) {
    switch (event.key) {
      case 'ArrowRight':
        this.linearNavigation(Direction.NEXT);
        break;
      case 'ArrowLeft':
        this.linearNavigation(Direction.PREVIOUS);
        break;
    }
  }
  skillsArr: Observable<any[]>;

  constructor(private projectPageStateManagerService: ProjectPageStateManagerService) { }

  ngOnInit() {
// this.skillsArr = this.skillService.getAll();

    // TODO: Get sub-route state from url here?
    this.setNavigationState(this.projectPageStateManagerService.state);
  }

  linearNavigation(direction: Direction) {
    this.setNavigationState(this.projectPageStateManagerService.linearTransition(direction));
    this.navigationTrigger.next(this.navigationState);
  }

  directSubNavigation(destination: number) {
    // TODO: this doesn't fix the issue of direct nav from random panel to base panel
    if (destination === this.navigationState.position) {
      return;
    }
    this.setNavigationState(this.projectPageStateManagerService.directNavigation(destination));
    this.navigationTrigger.next(this.navigationState);
  }

  onNavigationComplete($event) {
    this.projectPageStateManagerService.navigationComplete();
    if (this.navigationState.position === 1 || this.navigationState.position === 4) {
      this.hideOverlay();
    } else {
      this.showOverlay();
    }
  }

  showOverlay() {
    this.hiddenOverlay = false;
  }

  hideOverlay() {
    this.hiddenOverlay = true;
  }

  private setNavigationState(state: PositionedPanel) {
    this.navigationState = state;
    if (state.position === 1 || state.position === 4) {
      this.hideOverlay();
    }
  }

}
