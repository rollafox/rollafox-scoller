<<<<<<< HEAD
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageTransitionsComponent } from './page-transitions/page-transitions.component';
import { routing } from './router';
=======
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './router';
import { PageTransitionsComponent } from './page-transitions/page-transitions.component'
>>>>>>> 8a335c3383af6305be8e58261a70822122a3a0ae

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        routing
    ],
    declarations: [PageTransitionsComponent],
<<<<<<< HEAD
    exports: [
=======
    exports:[
>>>>>>> 8a335c3383af6305be8e58261a70822122a3a0ae
        RouterModule,
        PageTransitionsComponent
    ]
})
export class RoutingModule { }
