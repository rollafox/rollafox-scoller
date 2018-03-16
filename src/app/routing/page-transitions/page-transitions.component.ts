import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerTransition } from '@app/routing/page-transitions/animations';
import { PAGES } from '@app/routing/page.config';
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
    currentView = 1;
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
            // const windowSize = event.target.scrollingElement.clientHeight;
            const routeUrl = data.url.replace('/', ''),
                to = PAGES.find((page) => {
                    return page.path === routeUrl;
                });
            // console.info("Window-->", window.scrollTo())
                console.log(routeUrl, PAGES);
            this.currentView = to.order;
            // this.previousScroll = (this.currentView * windowSize) - windowSize;
        });

        /* updates previous scroll position after short debounceTime */
        this.checkTimer().pipe(debounceTime(20), distinctUntilChanged())
            .subscribe(x => {
                this.previousScroll = x;
            });
        /* updates scroll position to current view then enables navigation.
         * After 500 ms (the duration of the page transition animation)
        */
        this.resetTimer().pipe(delay(900)).subscribe(event => {
            const windowSize = event.target.scrollingElement.clientHeight,
                scrollTo = (this.currentView * windowSize) - windowSize;
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
        const windowSize = event.target.scrollingElement.clientHeight;
        // console.info(`Window Height Ele: ${windowSize} === ${event.target.scrollingElement.clientHeight}`)
        this.timer$.next(scrollPosition);
        if (!this.canNavigate) { return; }
        if ((this.previousScroll - scrollPosition) > 20) {
            // Go to previous page ...
            if (this.currentView !== 1) {
                const newView = PAGES.find((page) => {
                    return page.order === (this.currentView - 1);
                });
                this.state = 'next';
                this.navigate(newView, scrollPosition, event);
            }
        } else if ((this.previousScroll - scrollPosition) < -20) {
            // Go to next page ...
            if (this.currentView !== (PAGES.length + 1)) {
                const newView = PAGES.find((page) => {
                    return page.order === (this.currentView + 1);
                });
                this.state = 'previous';
                this.navigate(newView, scrollPosition, event);
            }
        }
    }

    private navigate(to, pos, event) {
        console.log(`Changing View fom: ${this.currentView} to: ${to.order}`);
        this.router.navigate([to.path]);
        this.currentView = to.order;
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
