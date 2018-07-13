import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from '@app/routing/page-transitions/animations';
import { PAGES, Page } from '@app/routing/page.config';
import { debounceTime, delay, distinctUntilChanged } from 'rxjs/operators';
import { filter } from 'rxjs/operators/filter';
import { Subject } from 'rxjs/Subject';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'pmp-page-transitions-router',
    animations: [
        routerTransition
    ],
    templateUrl: './page-transitions.component.html',
    styleUrls: ['./page-transitions.component.css']
})
export class PageTransitionsComponent implements OnInit, OnDestroy {
    canNavigate = true;
    state = '';
    pages: Array<Page> = PAGES.map((page) => new Page(page));
    currentView: Page = this.pages[0];
    previousScroll = 0;
    holdNavigationForAnimation$: Subject<any> = new Subject();
    timer$: Subject<any> = new Subject<any>();
    routeSubscription;

    @HostListener('window:scroll', ['$event']) checkScroll(event) {
        this.pageTransitionHandle(event);
    }

    constructor(public el: ElementRef, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        /*  TODO: get init load route and scroll to correct position HERE */
        this.routeSubscription = this.router.events.pipe(
            filter((data: any) => {
                return (data.url !== undefined);
            }),
            distinctUntilChanged()
        ).subscribe((data: any) => {
            const routeUrl = data.url.replace('/', ''),
                to = this.pages.find((page) => {
                    return page.path === routeUrl;
                });
            console.log(routeUrl, PAGES);
            this.currentView = to;
        });

        /* updates previous scroll position after short debounceTime */
        this.checkTimer().pipe(debounceTime(20), distinctUntilChanged())
            .subscribe(x => {
                this.previousScroll = x;
            });

        /* updates scroll position to current view then enables navigation.
         * After 900 ms (the duration of the page transition animation is 800ms)
        */
        this.resetTimer().pipe(delay(900)).subscribe(event => {
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
        const scrollPosition = event.pageY || event.target.scrollingElement.scrollTop;
        const windowHeight = event.target.scrollingElement.clientHeight;
        const windowWidth = event.target.scrollingElement.clientWidth;
        this.timer$.next(scrollPosition);

        // FIXME: workout the height of the current view. Don't navigate whilst within the given view.

        /* dynamic component height calculations:
         *use the component are and viewport width to calc height...
         *if large than vp height apply no page transition...
         *to do so, the total height of all components has to be calculated in conjunction with the current scroll position.
         *and some more stuff.
         */

        console.log(`This view `, this.currentView);

        if (this.currentView.area > 0) {
            const height = this.currentView.area / windowWidth;
            const componentRelativeScrollPosition = (this.currentView.order * windowHeight) - scrollPosition;
            const scrollDownMarker = (height - windowHeight) >= (height - componentRelativeScrollPosition);

            console.log(`-------------Window-------------`);
            console.log(`Window Height: ${windowHeight}`);
            console.log(`Window Width: ${windowWidth}`);
            console.log(`-------------Start-------------`);
            console.log(`Component Actual Height: ${height}`);
            console.log(`Set Initial scroll position of Component: ${componentRelativeScrollPosition}`);
            console.log(`Scroll Position: ${scrollPosition}`); // calculate height of views above this...
            console.log(`Nav Down Marker:
            ${(height - windowHeight) >= (height - componentRelativeScrollPosition)} _
            -- (${height} - ${windowHeight}):
            ${height - windowHeight} >= ${height - componentRelativeScrollPosition}:
            -- (${height} - ${componentRelativeScrollPosition})`);

            console.log(`____________END___________________`);
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
