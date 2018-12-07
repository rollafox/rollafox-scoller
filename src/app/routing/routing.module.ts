import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VerticalPageTransitionsComponent } from './page-transitions/vertical-slide/page-transitions.component';
import { routes } from './router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes/* , { enableTracing: true } */)
  ],
  declarations: [],
  exports: [
    RouterModule,
  ]
})
export class RoutingModule { }
