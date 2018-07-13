import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'pmp-scale',
    templateUrl: './scale.component.html',
    styleUrls: ['./scale.component.css']
})
export class ScaleComponent implements OnInit {
    @Input('value') value = 10; // out of 10 - 10 Default ofc!;
    @Input('color') color = '#00A8C6'; // blue Default
    @Input('options') options = {
        vertical: false
    };

    widthAsPercentageString = (this.value * 10).toString() + '%';

    constructor() { }

    ngOnInit() {
    }

}
