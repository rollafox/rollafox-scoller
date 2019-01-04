import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { oneThirdHorizontalTransition } from '@app/routing/animations/one-third-transition-animation';
import { Direction } from '@app/routing/configuration/navigation.enums';
import { ProjectsConfig } from '@app/routing/configuration/projects-routing.config';
import { SubNavigationState } from '@app/routing/configuration/sub-navigation-state.config';
import { ProjectPageStateManagerService } from '@app/services/state-management/project-page-state-manager.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'pmp-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [oneThirdHorizontalTransition]
})
export class ProjectsComponent implements OnInit {
  public projects = ProjectsConfig;
  public selected = null;
  public expanded = false;
  public backgroundColor = 'light';
  public direction = Direction;

  public navigationState = new SubNavigationState({});

  public innerPagePosition = 0;
  navigationTrigger = new Subject();
  linearNavigationTrigger = new Subject();


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

  constructor(public el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private projectPageStateManagerService: ProjectPageStateManagerService) { }

  ngOnInit() {
    // TODO: Get current navigation state from state manager
  }

  linearNavigation(direction) {
    this.navigationState = this.projectPageStateManagerService.linearTransition(direction);
    this.linearNavigationTrigger.next(this.navigationState);
  }

  directSubNavigation(destination) {
    // this.navigationState = this.projectPageStateManagerService.directNavigation(destination);
    this.navigationInitiated(this.navigationState);
  }

  navigationInitiated(destination) {
    this.navigationTrigger.next(destination);
  }

  onNavigationComplete($event) {
    this.projectPageStateManagerService.navigationComplete();
    console.log('Navigated event: ', $event);
  }

}
