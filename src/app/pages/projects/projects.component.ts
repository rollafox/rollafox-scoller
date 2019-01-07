import { Component, HostListener, OnInit } from '@angular/core';
import { oneThirdHorizontalTransition } from '@app/routing/animations/one-third-transition-animation';
import { Direction } from '@app/routing/configuration/navigation.enums';
import { PositionedPanel } from '@app/routing/configuration/position-panel';
import { ProjectPageStateManagerService } from '@app/services/state-management/project-page-state-manager.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'pmp-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [oneThirdHorizontalTransition]
})
export class ProjectsComponent implements OnInit {
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
    this.navigationState = this.projectPageStateManagerService.state;
    // TODO: Get current navigation state from state manager

    console.log('Setting Initial State to: ', this.navigationState);
  }

  linearNavigation(direction: Direction) {
    this.navigationState = this.projectPageStateManagerService.linearTransition(direction);
    this.navigationTrigger.next(this.navigationState);
  }

  directSubNavigation(destination: number) {
    this.navigationState = this.projectPageStateManagerService.directNavigation(destination);
    this.navigationTrigger.next(this.navigationState);
  }

  onNavigationComplete($event) {
    this.projectPageStateManagerService.navigationComplete();
  }

}
