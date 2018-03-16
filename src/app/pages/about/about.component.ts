import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { timeInterval } from 'rxjs/operators';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

@Component({
    selector: 'pmp-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    iLike = [
        "angular",
        "typescript",
        "vs code",
        "css",
        "html",
        "javascript",
        "es6",
        "webpack",
        "express.js",
        "rxjs",
        "node.js",
        "mongodb",
        "clouds",
        "coffee",
        "beer"
    ]
    currILike = "";
    constructor() { }

    ngOnInit() {
        this.currILike = this.iLike[Math.floor(Math.random() * this.iLike.length)];
        this.watchTimer().subscribe(()=>{
            this.currILike = this.iLike[Math.floor(Math.random() * this.iLike.length)];
        })
    }

    watchTimer(){
        return IntervalObservable.create(1400);
    }
}
