import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'pmp-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    menuIsActive = false;
    constructor() { }

    ngOnInit() {

    }

    toggleMenuState() {
        this.menuIsActive = !this.menuIsActive
    }

}
