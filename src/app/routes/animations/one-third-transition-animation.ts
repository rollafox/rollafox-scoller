import { animate, state, style, transition, trigger } from '@angular/animations';
import { PositionType } from '../helpers/navigation.enums';

export const oneThirdHorizontalTransition = trigger('oneThirdHorizontalTransition', [
  state(`${PositionType.BASE}`, style({ left: '0' })),
  state(`${PositionType.RIGHT}`, style({ left: '+60%' })),
  state(`${PositionType.LEFT}`, style({ left: '-60%' })),
  state(`${PositionType.OFF_LEFT}`, style({ left: '-100%' })),
  state(`${PositionType.OFF_RIGHT}`, style({ left: '+100%' })),
  transition(`${PositionType.BASE}<=>${PositionType.RIGHT}`, animate('650ms cubic-bezier(.42,0,.58,1)')),
  transition(`${PositionType.BASE}<=>${PositionType.LEFT}`, animate('650ms cubic-bezier(.42,0,.58,1)')),
  transition(`${PositionType.RIGHT}<=>${PositionType.LEFT}`, animate('650ms cubic-bezier(.42,0,.58,1)')),
  transition(`${PositionType.LEFT}<=>${PositionType.OFF_LEFT}`, animate('550ms cubic-bezier(.42,0,.58,1)')),
  transition(`${PositionType.RIGHT}<=>${PositionType.OFF_RIGHT}`, animate('550ms cubic-bezier(.42,0,.58,1)'))
]);
