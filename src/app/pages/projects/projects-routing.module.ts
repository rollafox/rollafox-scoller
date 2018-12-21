import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from '@pages/projects/projects.component';
import { TrackerComponent } from './tracker/tracker.component';
import { HugeTelecomComponent } from './huge-telecom/huge-telecom.component';
import { FrigginCoffeeComponent } from './friggin-coffee/friggin-coffee.component';
import { DvtInternalComponent } from './dvt-internal/dvt-internal.component';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      {
        path: 'tracker',
        component: TrackerComponent
      },
      {
        path: 'huge-telecom',
        component: HugeTelecomComponent
      },
      {
        path: 'friggin-coffee',
        component: FrigginCoffeeComponent
      },
      {
        path: 'dvt-internal',
        component: DvtInternalComponent
      },
      {
        path: '', redirectTo: 'projects', pathMatch: 'full'
      }
    ]/* [
      {
        path: '',
        loadChildren: './_projects-aux.module#ProjectsAuxModule'
      }
    ] */
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class ProjectsRoutingModule { }
