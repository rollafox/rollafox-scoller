import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from '@pages/projects/tracker/tracker.component';
import { HugeTelecomComponent } from '@pages/projects/huge-telecom/huge-telecom.component';
import { FrigginCoffeeComponent } from '@pages/projects/friggin-coffee/friggin-coffee.component';
import { DvtInternalComponent } from '@pages/projects/dvt-internal/dvt-internal.component';
import { NotFoundComponent } from '@pages/not-found/not-found.component';
import { ProjectsComponent } from '@pages/projects/projects.component';

const routes: Routes = [
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      {
        path: '',
        loadChildren: './_projects-aux.module#ProjectsAuxModule'
      }
    ]
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
