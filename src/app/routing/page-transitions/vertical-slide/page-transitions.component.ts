import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { routerVerticalTransition } from '@app/routing/page-transitions/vertical-slide/animations';
import { Page, PAGES, NAVIGATION_TYPE } from '@app/routing/page.config';
import { Subject } from 'rxjs';
import { debounceTime, delay, distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'pmp-vertical-page-transitions-router',
  animations: [
    routerVerticalTransition
  ],
  templateUrl: './page-transitions.component.html',
  styleUrls: ['./page-transitions.component.css']
})
export class VerticalPageTransitionsComponent implements OnInit, OnDestroy {
  canNavigate = true;
  state = '';
  pages: Array<Page> = PAGES.map((page) => new Page(page));
  currentView: Page = this.pages[0];
  previousScroll = 0;
  holdNavigationForAnimation$: Subject<any> = new Subject();
  timer$: Subject<any> = new Subject<any>();
  routeSubscription;
  routeInitialSubscription;
  totalHeight = 0;

  @HostListener('window:scroll', ['$event']) checkScroll(event) {
    this.pageTransitionHandle(event);
  }

  constructor(public el: ElementRef, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    /* this.totalHeight = this.pages.reduce((accumulator, page) => {
      const area = (page.area === 0) ?
        (this.el.nativeElement.children[0].children[0].clientWidth * this.el.nativeElement.children[0].children[0].clientHeight) :
        page.area;
      console.log('vp width: ', this.el.nativeElement.children[0].children[0].clientWidth);
      console.log('page height: ', (area / this.el.nativeElement.children[0].children[0].clientWidth));
      return accumulator + (area / this.el.nativeElement.children[0].children[0].clientWidth);
    }, 0); */
    // console.log('TOTAL HEIGHT: ', this.totalHeight);

    /*  TODO: get init load route and scroll to correct position HERE */
    console.log('Init Router: ', this.router.initialNavigation());


    this.routeSubscription = this.router.events.pipe(
      filter((data: any) => {
        return (data.url !== undefined);
      }),
      distinctUntilChanged((p: RouterEvent, q: RouterEvent) => {
        return p.url === q.url;
      })
    ).subscribe((data: any) => {
      console.log(`UPDATING MAIN VIEW`, data);

      const routeUrlPieces = data.url.split('/'),
        mainRoute = routeUrlPieces[1].replace('/', ''),
        to = this.pages.find((page) => {
          return page.path === mainRoute;
        });

      if (to.type === NAVIGATION_TYPE.MAIN) {
        console.log(`UPDATING MAIN VIEW - ${mainRoute}`, to);
        if (to.order > 1) {
          // set previous scroll position:
          const windowSize = this.el.nativeElement.parentElement.offsetHeight,
            scrollTo = (to.order * windowSize) - windowSize;
            console.log('Window Height: ', scrollTo);
          this.previousScroll = scrollTo;
          window.scrollTo(0, scrollTo);

        }
        this.currentView = to;
      }
    });

    /* updates previous scroll position after short debounceTime */
    this.checkTimer().pipe(debounceTime(20), distinctUntilChanged())
      .subscribe(x => {
        this.previousScroll = x;
      });

    /* updates scroll position to current view then enables navigation.
     * After 900 ms (the duration of the page transition animation is 800ms)
    */
    this.resetTimer().pipe(delay(620)).subscribe(event => {
      const windowSize = event.target.scrollingElement.clientHeight,
        scrollTo = (this.currentView.order * windowSize) - windowSize;
      window.scrollTo(0, scrollTo);
      this.previousScroll = scrollTo;
      this.state = '';
      this.canNavigate = true;
    });
  }

  getState(outlet) {
    return this.state;
  }

  private pageTransitionHandle(event) {
    const componentPosition = this.el.nativeElement.offsetTop;
    const componentWidth = this.el.nativeElement.offsetWidth;
    const componentHeight = this.el.nativeElement.offsetHeight;
    const scrollPosition = event.pageY || event.target.scrollingElement.scrollTop;
    const windowHeight = event.target.scrollingElement.clientHeight;
    const windowWidth = event.target.scrollingElement.clientWidth;
    this.timer$.next(scrollPosition);

    // FIXME: workout the height of the current view. Don't navigate whilst within the given view.

    /* dynamic component height calculations:
     *use the component are and viewport width to calc height...
     *if larger than vp height apply no page transition...
     *to do so, the total height of all components has to be calculated in conjunction with the current scroll position.
     *and some more stuff.
     */

    console.log(`This view `, this.currentView);
    console.log(`scrollPosition `, scrollPosition);
    console.log(`previousScroll `, this.previousScroll);

    if (this.currentView.area > 0) {
      const height = this.currentView.area / windowWidth;
      const componentRelativeScrollPosition = (this.currentView.order * windowHeight) - scrollPosition;
      const scrollDownMarker = (height - windowHeight) >= (height - componentRelativeScrollPosition);
      const scrollUpMarker = (height - windowHeight) <= (height - componentRelativeScrollPosition);

      /* console.groupCollapsed(`-------------Checking Scroll Area-------------`);
      console.log(`-__ EVENT __-`, event);
      console.log(`-__ Window __-`);
      console.log(`Window Height: ${windowHeight}`);
      console.log(`Window Width: ${windowWidth}`);
      console.log(`-__ Component __-`);
      console.log(`component Height:`, this.el.nativeElement.children[0].offsetHeight);
      console.log(`component Width: `, this.el.nativeElement.children[0].offsetWidth);
      console.log(`------------- Calculations -------------`);
      console.log(`Component Height From Area Calc: ${height}`);
      console.log(`Setting Initial scroll position of Component: ${componentRelativeScrollPosition}`);
      console.log(`Actual Scroll Position: ${scrollPosition}`); // calculate height of views above this...
      console.log(`Nav Down Marker: `, scrollDownMarker);
      console.log(`Nav Up Marker: `, scrollUpMarker);
      console.groupEnd(); */

      /* if (!scrollDownMarker && !scrollUpMarker) {
        return;
      } */
    }

    /* console.log(`Next view `, this.pages.find((page) => {
      return page.order === (this.currentView.order + 1);
    })); */

    // create scroll range in PAGES? check against scroll range instead of the default 20/-20


    if (!this.canNavigate) { return; }
    if ((this.previousScroll - scrollPosition) > 20) {
      // Go to previous page ...
      if (this.currentView.order !== 1) {
        const newView = this.pages.find((page) => {
          return page.order === (this.currentView.order - 1);
        });
        this.state = 'next';
        this.navigate(newView, scrollPosition, event);
      }
    } else if ((this.previousScroll - scrollPosition) < -20) {
      // Go to next page ...
      if (this.currentView.order !== (PAGES.length + 1)) {
        const newView = this.pages.find((page) => {
          return page.order === (this.currentView.order + 1);
        });
        this.state = 'previous';
        this.navigate(newView, scrollPosition, event);
      }
    }
  }

  private navigate(to, pos, event) {
    this.router.navigate([to.path]);
    this.currentView = to;
    this.previousScroll = pos;
    this.canNavigate = false;
    this.holdNavigationForAnimation$.next(event);
  }

  private checkTimer() {
    return this.timer$.asObservable();
  }

  private resetTimer() {
    return this.holdNavigationForAnimation$.asObservable();
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
  }
}
