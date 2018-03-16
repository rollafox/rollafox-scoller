import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";
import { query, style, group, animate, trigger, transition } from '@angular/animations';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, delay } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
    selector: 'pmp-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'start';

    ngOnInit(): void {

    }
}
