import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from '@app/components/components.module';
import { SkillsService } from '@app/services/skills/skills.service';
import { DvtInternalComponent } from '@pages/projects/dvt-internal/dvt-internal.component';
import { FrigginCoffeeComponent } from '@pages/projects/friggin-coffee/friggin-coffee.component';
import { HugeTelecomComponent } from '@pages/projects/huge-telecom/huge-telecom.component';
import { ProjectsComponent } from '@pages/projects/projects.component';
import { TrackerComponent } from '@pages/projects/tracker/tracker.component';

// NOTE: this is used to lazy load projects (not currently working) issues with initial page animation on module load.
const routes: Routes = [
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
export class ProjectsAuxRoutingModule { }


@NgModule({
  declarations: [
    /* TrackerComponent,
    HugeTelecomComponent,
    FrigginCoffeeComponent,
    DvtInternalComponent, */
  ],
  imports: [
    ProjectsAuxRoutingModule
  ],
  providers: [
    SkillsService
  ],
  exports: []
})
export class ProjectsAuxModule { }
