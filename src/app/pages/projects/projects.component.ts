import { Component, OnInit, ElementRef } from '@angular/core';
import { SkillsService } from '@app/services/skills/skills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { oneThirdHorizontalTransition } from './animations';

@Component({
  selector: 'pmp-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [oneThirdHorizontalTransition]
})
export class ProjectsComponent implements OnInit {
  public skills;
  public selected = null;
  public expanded = false;
  public backgroundColor = 'light';
  public innerPageState = 'base';
  navigationTrigger = new Subject();

  constructor(public el: ElementRef, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // this.skills = this.skillsService.getAll();
  }

  selectedTech(event, skill) {
    // console.log(event, skill);
    // console.log(this.selected, (this.selected));
    // // this.expanded = !this.expanded;
    // this.selected = skill;
  }

  navSubRoutes(destination) {
    if (destination === 'next' && this.innerPageState === 'right') {
      this.innerPageState = 'base';
    } else if (destination === 'next') {
      this.innerPageState = 'left';
    } else if (destination === 'previous' && this.innerPageState === 'left') {
      this.innerPageState = 'base';
    } else if (destination === 'previous') {
      this.innerPageState = 'right';
    }
    this.navigationTrigger.next(`${destination}`);

    // this.router.navigate([`projects/${destination}`]);

    // this.currentView = to;
    // this.previousScroll = pos;
    // this.canNavigate = false;
    // this.holdNavigationForAnimation$.next(event);
  }

  onNavigation($event) {
    console.log('Navigated event: ', $event);
    // this.backgroundColor = ($event !== 'projects/') ? 'dark' : 'light';
  }

}
