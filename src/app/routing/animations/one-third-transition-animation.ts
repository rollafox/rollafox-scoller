import { animate, state, style, transition, trigger } from '@angular/animations';

export const oneThirdHorizontalTransition = trigger('oneThirdHorizontalTransition', [
  state('base', style({ left: '0' })),
  state('right', style({ left: '+60%' })),
  state('left', style({ left: '-60%' })),
  state('offLeft', style({ left: '-100%' })),
  state('offRight', style({ left: '+100%' })),
  transition('base<=>right', animate('650ms cubic-bezier(.42,0,.58,1)')),
  transition('base<=>left', animate('650ms cubic-bezier(.42,0,.58,1)')),
  transition('right<=>left', animate('650ms cubic-bezier(.42,0,.58,1)')),
  transition('left<=>offLeft', animate('550ms cubic-bezier(.42,0,.58,1)')),
  transition('right<=>offRight', animate('550ms cubic-bezier(.42,0,.58,1)'))
]);
