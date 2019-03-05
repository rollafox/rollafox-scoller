import { Component, HostListener, OnInit } from '@angular/core';
import { oneThirdHorizontalTransition } from '@app/routing/animations/one-third-transition-animation';
import { Direction } from '@app/routing/configuration/navigation.enums';
import { PositionedPanel } from '@app/routing/configuration/position-panel';
import { ProjectPageStateManagerService } from '@app/services/state-management/project-page-state-manager.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'pmp-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [oneThirdHorizontalTransition]
})
export class ProjectsComponent implements OnInit {
  public hiddenOverlay = false;
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

  constructor(private projectPageStateManagerService: ProjectPageStateManagerService) { }

  ngOnInit() {
    this.setNavigationState(this.projectPageStateManagerService.state);
    // TODO: Get current navigation state from state manager

    console.log('Setting Initial State to: ', this.navigationState);
  }

  linearNavigation(direction: Direction) {
    this.setNavigationState(this.projectPageStateManagerService.linearTransition(direction));
    this.navigationTrigger.next(this.navigationState);
  }

  directSubNavigation(destination: number) {
    this.setNavigationState(this.projectPageStateManagerService.directNavigation(destination));
    this.navigationTrigger.next(this.navigationState);
  }

  setNavigationState(state: PositionedPanel) {
    this.navigationState = state;
    if (state.position === 1 || state.position === 4) {
      this.hideOverlay();
    } else {
      this.showOverlay();
    }
  }

  onNavigationComplete($event) {
    this.projectPageStateManagerService.navigationComplete();
  }

  showOverlay() {
    this.hiddenOverlay = false;
  }

  hideOverlay() {
    this.hiddenOverlay = true;
  }

}
