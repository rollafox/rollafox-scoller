import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routing } from './router';
import { PageTransitionsComponent } from './page-transitions/page-transitions.component'

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        routing
    ],
    declarations: [PageTransitionsComponent],
    exports:[
        RouterModule,
        PageTransitionsComponent
    ]
})
export class RoutingModule { }
