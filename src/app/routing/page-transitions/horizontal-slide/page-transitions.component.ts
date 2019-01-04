import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerHorizontalTransition } from '@app/routing/animations/horizontal-route-animation';
import { NAVIGATION_TYPE } from '@app/routing/configuration/navigation.enums';
import { Page } from '@app/routing/configuration/page';
import { SubNavigationState } from '@app/routing/configuration/sub-navigation-state.config';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay, distinctUntilChanged, filter } from 'rxjs/operators';

const SUB_PAGES = [{
  order: 1,
  path: 'projects/',
  type: NAVIGATION_TYPE.SECONDARY
}, {
  order: 2,
  path: 'projects/tracker',
  type: NAVIGATION_TYPE.SECONDARY
}, {
  order: 3,
  path: 'projects/dvt-internal',
  type: NAVIGATION_TYPE.SECONDARY
}, {
  order: 4,
  path: 'projects/huge-telecom',
  type: NAVIGATION_TYPE.SECONDARY
}, {
  order: 5,
  path: 'projects/friggin-coffee',
  type: NAVIGATION_TYPE.SECONDARY
}];

@Component({
  selector: 'pmp-horizontal-page-transitions-router',
  animations: [
    routerHorizontalTransition
  ],
  templateUrl: './page-transitions.component.html',
  styleUrls: ['./page-transitions.component.css']
})
export class HorizontalPageTransitionsComponent implements OnInit, OnDestroy {
  canNavigate = true;
  state = '';
  pages: Array<Page> = SUB_PAGES.map((page) => new Page(page));
  currentView: Page = this.pages[0];
  previousScroll = 0;
  holdNavigationForAnimation$: Subject<any> = new Subject();
  timer$: Subject<any> = new Subject<any>();
  routeSubscription: Subscription;
  linearNavigationSubscription: Subscription;
  @Input() navigationTrigger: Observable<string>;
  @Input() linearNavigationTrigger: Observable<SubNavigationState>;
  @Output() navigated: EventEmitter<string> = new EventEmitter();

  constructor(public el: ElementRef, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.routeSubscription = this.navigationTrigger.pipe(
      filter((data: string) => {
        return (data !== undefined && data !== null);
      }),
      distinctUntilChanged((previous, newValue) => {
        console.log([previous, newValue], `${this.currentView.path}`);
        return newValue === `${this.currentView.path}`;
      })
    ).subscribe((data) => {
      // TODO: Update this to handle Direct Navigations
      console.log('Starting Direct Navigation Transition: ', data);
      let to: Page;
      const routeUrlPieces = data.split('/'),
        mainRoute = routeUrlPieces[0].replace('/', '');
      if (mainRoute === 'projects') {
        to = this.pages.find((page) => {
          return page.path === data;
        });
      }

      console.log(`to: ${data}`, to);
      if (to.type === NAVIGATION_TYPE.SECONDARY && this.canNavigate && to !== undefined) {
        this.pageTransitionHandle(to, false);
        this.navigated.emit(to.path);
        console.log('Assess Nav: ', [data, this.currentView]);
      }
    });

    this.linearNavigationSubscription = this.linearNavigationTrigger.pipe(
      filter((data: SubNavigationState) => {
        return (data !== undefined && data !== null);
      }),
      distinctUntilChanged((previous: SubNavigationState, newValue: SubNavigationState) => {
        return newValue.nextView.path === `${this.currentView.path}`;
      })
    ).subscribe((data: SubNavigationState) => {
      if (data.nextView.type === NAVIGATION_TYPE.SECONDARY && this.canNavigate && data.nextView !== undefined) {
        this.pageTransitionHandle(data.nextView, data.reversedAnimationDirection);
      }
    });

    /* updates scroll position to current view then enables navigation.
     * After 900 ms (the duration of the page transition animation is 800ms)
    */
    this.resetTimer().pipe(delay(450)).subscribe(event => {
      console.log('Resetting state');
      this.navigated.emit(this.currentView.path);
      this.state = '';
      this.canNavigate = true;
    });
  }

  getState(outlet) {
    return this.state;
  }


  private pageTransitionHandle(to, reverseAnimation) {
    // this.timer$.next(scrollPosition);
    this.canNavigate = false;
    // console.log()
    const direction = (to.order < this.currentView.order) ? 'backward' : 'forward';
    console.log('Direction : ', direction);
    this.state = ((reverseAnimation && direction === 'forward') || (!reverseAnimation && direction === 'backward')) ? 'next' : 'previous';
    console.log('State : ', this.state);
    this.navigate(to);
  }


  private navigate(to) {
    this.router.navigate([`${to.path}`]);
    this.currentView = to;
    this.holdNavigationForAnimation$.next(to);
  }

  private resetTimer() {
    return this.holdNavigationForAnimation$.asObservable();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.linearNavigationSubscription.unsubscribe();
  }
}
