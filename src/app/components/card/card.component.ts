import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from '@app/services/skills/skill.model';

class CardConfig {
    scaleColor: string;
}

@Component({
    selector: 'pmp-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    animations: [
        /* trigger('cardSize', [
            state('normal', style({
                backgroundColor: '#eee',
                transform: 'scale(1)'
            })),
            state('expand', style({
                backgroundColor: '#cfd8dc',
                transform: 'scale(1.1)'
            })),
            transition('normal => expand', animate('100ms ease-in')),
            transition('expand => normal', animate('100ms ease-out'))
        ]) */
    ]
})
export class CardComponent implements OnInit {
    @Input('item') item: Skill;
    @Input('expand') expand = false;
    @Input('config') config: CardConfig;
    @Output('card-clicked') clickEmitter = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    cardClick(event) {
        this.expand = ! this.expand;
        this.clickEmitter.emit(event);
    }

}
