import { Component, ElementRef, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectPageStateManagerService, SubNavigationState, Direction } from '@app/services/state/project-page-state-manager.service';
import { Subject } from 'rxjs';

import { oneThirdHorizontalTransition } from './animations';
import { ProjectsConfig } from '@app/routing/page.config';

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
    this.linearTransition((event.key === 'ArrowRight') ? Direction.NEXT : Direction.PREVIOUS);
  }

  constructor(public el: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private projectPageStateManagerService: ProjectPageStateManagerService) { }

  ngOnInit() {
  }

  linearTransition(direction) {
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
