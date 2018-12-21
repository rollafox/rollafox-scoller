import { animate, group, query, state, style, transition, trigger } from '@angular/animations';

export const oneThirdHorizontalTransition = trigger('oneThirdHorizontalTransition', [
  state('base', style({ left: '0' })),
  state('right', style({ left: '+60%' })),
  state('left', style({ left: '-60%' })),
  transition('*=>base', animate('550ms')),
  transition('base=>right', animate('550ms')),
  transition('base=>left', animate('550ms'))
]);
