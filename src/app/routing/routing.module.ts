import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageTransitionsComponent } from './page-transitions/page-transitions.component';
import { routing } from './router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        routing
    ],
    declarations: [PageTransitionsComponent],
    exports: [
        RouterModule,
        PageTransitionsComponent
    ]
})
export class RoutingModule { }
