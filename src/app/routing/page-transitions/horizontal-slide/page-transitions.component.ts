import { Component, ElementRef, HostListener, OnDestroy, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { routerHorizontalTransition } from '@app/routing/page-transitions/horizontal-slide/animations';
import { Page, PAGES, NAVIGATION_TYPE } from '@app/routing/page.config';
import { Subject, Observable } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter, finalize, tap } from 'rxjs/operators';

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
  path: 'projects/huge-telecom',
  type: NAVIGATION_TYPE.SECONDARY
}, {
  order: 4,
  path: 'projects/dvt-internal',
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
  routeSubscription;
  @Input() navigationTrigger: Observable<string>;

  /* @HostListener('window:scroll', ['$event']) checkScroll(event) {
    this.pageTransitionHandle(event);
  } */

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
      // console.log('data:', data.split('/'));
      let to,
        reverseAnimation = false;
      const routeUrlPieces = data.split('/'),
        mainRoute = routeUrlPieces[0].replace('/', '');
      if (data === 'next') {
        if ((this.currentView.order + 1) > this.pages.length) {
          reverseAnimation = true;
          to = this.pages[0];
        } else {
          to = this.pages.find((page) => {
            return page.order === (this.currentView.order + 1);
          });
        }
      } else if (data === 'previous') {
        if ((this.currentView.order - 1) <= 0) {
          reverseAnimation = true;
          to = this.pages[this.pages.length - 1];
        } else {
          to = this.pages.find((page) => {
            return page.order === (this.currentView.order - 1);
          });
        }
      } else if (mainRoute === 'projects') {
        to = this.pages.find((page) => {
          return page.path === data;
        });
      }

      console.log(`to: ${data}`, to);
      if (to.type === NAVIGATION_TYPE.SECONDARY && this.canNavigate && to !== undefined) {
        this.pageTransitionHandle(to, reverseAnimation);
        console.log('Assess Nav: ', [data, this.currentView]);
      }
    });

    /* updates scroll position to current view then enables navigation.
     * After 900 ms (the duration of the page transition animation is 800ms)
    */
    this.resetTimer().pipe(delay(400)).subscribe(event => {
      console.log('Resetting state');
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
  }
}
