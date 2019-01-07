import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routerHorizontalTransition } from '@app/routing/animations/horizontal-route-animation';
import { NAVIGATION_TYPE } from '@app/routing/configuration/navigation.enums';
import { PositionedPanel } from '@app/routing/configuration/position-panel';
import { Observable, Subject, Subscription } from 'rxjs';
import { delay, distinctUntilChanged, filter, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'pmp-horizontal-page-transitions-router',
  animations: [
    routerHorizontalTransition
  ],
  templateUrl: './page-transitions.component.html',
  styleUrls: ['./page-transitions.component.css']
})
export class HorizontalPageTransitionsComponent implements OnInit, OnDestroy {
  public canNavigate = true;
  public state = '';
  public currentView: PositionedPanel;
  private holdNavigationForAnimation$: Subject<any> = new Subject();
  private navigationSubscription: Subscription;
  @Input() navigationTrigger: Observable<PositionedPanel>;
  @Input() reverseAnimation: Observable<boolean>;
  @Input() initialPanel: PositionedPanel;
  @Output() navigated: EventEmitter<PositionedPanel> = new EventEmitter();

  constructor(public el: ElementRef, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.currentView = this.initialPanel;
    this.router.navigate([`${this.currentView.page.path}`]);

    this.navigationSubscription = this.navigationTrigger.pipe(
      filter((data: PositionedPanel) => {
        return (data !== undefined && data !== null);
      }),
      distinctUntilChanged((previous: PositionedPanel, newValue: PositionedPanel) => {
        return newValue.page.path === `${this.currentView.page.path}`;
      }),
      withLatestFrom(this.reverseAnimation)
    ).subscribe(([data, reverseAnimation]: [PositionedPanel, boolean]) => {
      console.log('Trigger animation process', data);
      if (data.page.type === NAVIGATION_TYPE.SECONDARY && this.canNavigate) {
        this.pageTransitionHandle(data, reverseAnimation);
      }
    });

    /* updates scroll position to current view then enables navigation.
     * After 900 ms (the duration of the page transition animation is 800ms)
    */
    this.resetTimer().pipe(delay(450)).subscribe(() => {
      console.log('Resetting state');
      this.navigated.emit(this.currentView);
      this.state = '';
      this.canNavigate = true;
    });
  }

  getState(outlet) {
    return this.state;
  }

  private pageTransitionHandle(to, reverseAnimation) { // TODO: this can be worked on a bit.
    this.canNavigate = false;
    const direction = (to.page.order < this.currentView.page.order) ? 'backward' : 'forward';
    this.state = ((reverseAnimation && direction === 'forward') || (!reverseAnimation && direction === 'backward')) ? 'next' : 'previous';
    this.navigate(to);
  }

  private navigate(to) {
    this.router.navigate([`${to.page.path}`]);
    this.currentView = to;
    this.holdNavigationForAnimation$.next(to);
  }

  private resetTimer() {
    return this.holdNavigationForAnimation$.asObservable();
  }

  ngOnDestroy() {
    this.navigationSubscription.unsubscribe();
  }
}
